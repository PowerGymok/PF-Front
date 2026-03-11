"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  ReactNode,
} from "react";
import { io, Socket } from "socket.io-client";
import { useAuth } from "@/app/contexts/AuthContext";
import {
  getConversationsByRole,
  getMessagesByConversation,
} from "@/services/chat.services";
import { MessageSessionProps } from "@/interface/MessageSession";
import { ConversationSession } from "@/interface/ConversationSession";

interface ChatContextProps {
  conversations: ConversationSession[];
  activeConversation: ConversationSession | null;
  messages: MessageSessionProps[];
  isConnected: boolean;
  isLoadingConversations: boolean;
  isLoadingMessages: boolean;
  setActiveConversation: (conversation: ConversationSession) => void;
  sendMessage: (content: string) => void;
  socket: Socket | null;
}

const ChatContext = createContext<ChatContextProps | undefined>(undefined);

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const { dataUser, isLoading } = useAuth();

  const [conversations, setConversations] = useState<ConversationSession[]>([]);
  const [activeConversation, setActiveConversation] =
    useState<ConversationSession | null>(null);
  const [messages, setMessages] = useState<MessageSessionProps[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [isLoadingConversations, setIsLoadingConversations] = useState(false);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);

  const socketRef = useRef<Socket | null>(null);

  const token = dataUser?.token;
  const userId = dataUser?.user?.id;
  const role = dataUser?.user?.role as "user" | "Coach" | "Admin" | undefined;

  /**
   * SOCKET CONNECTION
   */
  useEffect(() => {
    if (isLoading) return;
    if (!token || !userId) return;

    if (socketRef.current) {
      socketRef.current.disconnect();
      socketRef.current = null;
    }

    const socket = io(`${process.env.NEXT_PUBLIC_API_URL}/chat`, {
      transports: ["websocket"],
      auth: { token },
      query: { userId },
    });

    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("Chat conectado");
      setIsConnected(true);
    });

    socket.on("disconnect", () => {
      console.log("Chat desconectado");
      setIsConnected(false);
    });

    socket.on("newMessage", (message: MessageSessionProps) => {
      setMessages((prev) => {
        const exists = prev.some((msg) => msg.id === message.id);
        if (exists) return prev;

        if (activeConversation?.id === message.conversationId) {
          return [...prev, message];
        }

        return prev;
      });
    });

    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, [isLoading, token, userId]);

  /**
   * LOAD CONVERSATIONS
   */
  useEffect(() => {
    if (isLoading) return;
    if (!token || !userId || !role) return;

    if (role === "Admin") {
      setConversations([]);
      setActiveConversation(null);
      return;
    }

    const loadConversations = async () => {
      try {
        setIsLoadingConversations(true);

        const data = await getConversationsByRole(role, token, userId);

        setConversations(data);

        setActiveConversation((prev) => {
          if (prev) {
            const stillExists = data.find((c) => c.id === prev.id);
            if (stillExists) return stillExists;
          }
          return data.length > 0 ? data[0] : null;
        });

      } catch (error) {
        console.error("Error cargando conversaciones:", error);
        setConversations([]);
        setActiveConversation(null);
      } finally {
        setIsLoadingConversations(false);
      }
    };

    loadConversations();
  }, [isLoading, token, userId, role]);

  /**
   * LOAD MESSAGES
   */
  useEffect(() => {
    if (isLoading) return;
    if (!token || !userId) return;
    if (!activeConversation?.id) {
      setMessages([]);
      return;
    }

    const loadMessages = async () => {
      try {
        setIsLoadingMessages(true);

        const data = await getMessagesByConversation(
          activeConversation.id,
          token,
          userId
        );

        setMessages(data);

        if (socketRef.current) {
          socketRef.current.emit("joinConversation", activeConversation.id);
        }

      } catch (error) {
        console.error("Error cargando mensajes:", error);
        setMessages([]);
      } finally {
        setIsLoadingMessages(false);
      }
    };

    loadMessages();

    return () => {
      if (socketRef.current && activeConversation?.id) {
        socketRef.current.emit("leaveConversation", activeConversation.id);
      }
    };

  }, [activeConversation, token, userId, isLoading]);

  /**
   * SEND MESSAGE
   */
  const sendMessage = (content: string) => {
    const clean = content.trim();

    if (!socketRef.current) return;
    if (!activeConversation?.id) return;
    if (!clean) return;

    socketRef.current.emit("sendMessage", {
      conversationId: activeConversation.id,
      content: clean,
    });
  };

  return (
    <ChatContext.Provider
      value={{
        conversations,
        activeConversation,
        messages,
        isConnected,
        isLoadingConversations,
        isLoadingMessages,
        setActiveConversation,
        sendMessage,
        socket: socketRef.current,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);

  if (!context) {
    throw new Error("useChat debe usarse dentro de ChatProvider");
  }

  return context;
};
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
  console.log("DATA USER:", dataUser);

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
  

  useEffect(() => {
    if (isLoading) return;
    if (!token || !userId) return;

    if (socketRef.current) {
      socketRef.current.disconnect();
      socketRef.current = null;
    }

    const socket = io(`${process.env.NEXT_PUBLIC_API_URL}/chat`, {
      transports: ["websocket"],
      auth: {
        token,
      },
      query: {
        userId,
      },
    });

    socketRef.current = socket;

    const handleConnect = () => {
      console.log("Chat conectado");
      setIsConnected(true);
    };

    const handleDisconnect = () => {
      console.log("Chat desconectado");
      setIsConnected(false);
    };

    const handleNewMessage = (message: MessageSessionProps) => {
      setMessages((prev) => {
        const alreadyExists = prev.some((msg) => msg.id === message.id);
        if (alreadyExists) return prev;

        if (
          activeConversation &&
          message.conversationId === activeConversation.id
        ) {
          return [...prev, message];
        }

        return prev;
      });

      setConversations((prev) => {
        const exists = prev.some((conv) => conv.id === message.conversationId);
        if (!exists) return prev;

        return [...prev];
      });
    };

    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);
    socket.on("newMessage", handleNewMessage);

    return () => {
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
      socket.off("newMessage", handleNewMessage);
      socket.disconnect();
      socketRef.current = null;
    };
  }, [isLoading, token, userId, activeConversation]);

  useEffect(() => {
    if (isLoading) return;
    if (!dataUser) return;
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
        console.log("CONVERSATIONS RESPONSE:", data);
      console.log("TOKEN:", token);
      console.log("USERID:", userId);
      console.log("ROLE:", role);
        setConversations(data);

        setActiveConversation((prev) => {
          if (prev) {
            const stillExists = data.find((conv) => conv.id === prev.id);
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
  }, [isLoading, token, userId, role, dataUser]);

  useEffect(() => {
    if(isLoading) return;
    if (!dataUser) return;
    if (!activeConversation || !token || !userId) {
      setMessages([]);
      return;
    }

    const loadMessages = async () => {
      try {
        setIsLoadingMessages(true);
        const data = await getMessagesByConversation(activeConversation.id, token, userId!);
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
  }, [activeConversation, token, userId, dataUser, isLoading]);

  const sendMessage = (content: string) => {
    const cleanContent = content.trim();

    if (!socketRef.current) return;
    if (!activeConversation) return;
    if (!cleanContent) return;

    socketRef.current.emit("sendMessage", {
      conversationId: activeConversation.id,
      content: cleanContent,
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
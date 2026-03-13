"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  ReactNode,
  useCallback,
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
  const [socket, setSocket] = useState<Socket | null>(null);

  const socketRef = useRef<Socket | null>(null);
  const activeConversationRef = useRef<ConversationSession | null>(null);
  const lastFetchIdRef = useRef(0);

  const token = dataUser?.token;
  const userId = dataUser?.user?.id;
  const role = dataUser?.user?.role as "user" | "Coach" | "Admin" | undefined;

  useEffect(() => {
    activeConversationRef.current = activeConversation;
  }, [activeConversation]);

  const fetchMessages = useCallback(async (conversationId: string) => {
    if (!token || !userId) return;

    const fetchId = ++lastFetchIdRef.current;

    try {
      const data = await getMessagesByConversation(conversationId, token, userId);

      // evita que una respuesta vieja pise una más nueva
      if (fetchId !== lastFetchIdRef.current) return;

      setMessages(data);
    } catch (error) {
      console.error("Error cargando mensajes:", error);
    }
  }, [token, userId]);

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

    const newSocket = io(`${process.env.NEXT_PUBLIC_API_URL}/chat`, {
      transports: ["websocket"],
      auth: { token },
      query: { userId },
    });

    socketRef.current = newSocket;
    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log("Chat conectado");
      setIsConnected(true);

      if (activeConversationRef.current?.id) {
        newSocket.emit("joinConversation", activeConversationRef.current.id);
      }
    });

    newSocket.on("disconnect", () => {
      console.log("Chat desconectado");
      setIsConnected(false);
    });

    newSocket.on("connect_error", (err) => {
      console.error("Socket error:", err.message);
    });

    newSocket.on("newMessage", (message: MessageSessionProps) => {
      console.log("Mensaje recibido:", message);

      const currentConversationId = activeConversationRef.current?.id;
      if (!currentConversationId) return;
      if (message.conversationId !== currentConversationId) return;

      setMessages((prev) => {
        const exists = prev.some((m) => m.id === message.id);
        if (exists) return prev;
        return [...prev, message];
      });
    });

    return () => {
      newSocket.off("connect");
      newSocket.off("disconnect");
      newSocket.off("connect_error");
      newSocket.off("newMessage");
      newSocket.disconnect();
      socketRef.current = null;
      setSocket(null);
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
            const stillExists = data.find((c: any) => c.id === prev.id);
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
   * LOAD MESSAGES WHEN ACTIVE CONVERSATION CHANGES
   */
  useEffect(() => {
    if (isLoading) return;
    if (!token || !userId) return;

    const conversationId = activeConversation?.id;

    if (!conversationId) {
      setMessages([]);
      return;
    }

    let mounted = true;
    const previousConversationId = conversationId;

    const loadMessages = async () => {
      try {
        setIsLoadingMessages(true);
        await fetchMessages(conversationId);

        if (mounted && socketRef.current?.connected) {
          console.log("Joining conversation:", conversationId);
          socketRef.current.emit("joinConversation", conversationId);
        }
      } finally {
        if (mounted) {
          setIsLoadingMessages(false);
        }
      }
    };

    loadMessages();

    return () => {
      mounted = false;

      if (socketRef.current?.connected) {
        socketRef.current.emit("leaveConversation", previousConversationId);
      }
    };
  }, [activeConversation?.id, token, userId, isLoading, fetchMessages]);

  /**
   * SINGLE POLLING FALLBACK
   */
  useEffect(() => {
    if (!activeConversation?.id || !token || !userId) return;

    const conversationId = activeConversation.id;

    const interval = setInterval(() => {
      fetchMessages(conversationId);
    }, 4000);

    return () => clearInterval(interval);
  }, [activeConversation?.id, token, userId, fetchMessages]);

  /**
   * SEND MESSAGE
   */
  const sendMessage = (content: string) => {
  const clean = content.trim();

  if (!socketRef.current?.connected) return;
  if (!activeConversationRef.current?.id) return;
  if (!clean) return;

  const senderId = dataUser?.user?.id;
  if (!senderId || !role) return;

  const optimisticMessage: MessageSessionProps = {
    id: `temp-${Date.now()}`,
    content: clean,
    senderId,
    conversationId: activeConversationRef.current.id,
    createdAt: new Date().toISOString(),
    type: role === "Coach" ? "coach" : "user",
    isRead: false,
    sender: {
      id: senderId,
      name: "You",
      email: "",
    },
  };

  setMessages((prev) => [...prev, optimisticMessage]);

  socketRef.current.emit("sendMessage", {
    conversationId: activeConversationRef.current.id,
    content: clean,
  });

  setTimeout(() => {
    if (activeConversationRef.current?.id) {
      fetchMessages(activeConversationRef.current.id);
    }
  }, 1000);
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
        socket,
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
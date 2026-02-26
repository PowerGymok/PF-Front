"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { io, Socket } from "socket.io-client";
import { useAuth } from "@/app/contexts/AuthContext";
import { getUserIdFromToken } from "@/utils/decodeToken";
import {
  getUserConversations,
  getMessagesByConversation,
} from "@/services/chat.services";
import { MessageSessionProps } from "@/interface/MessageSession";
import { ConversationSession } from "@/interface/ConversationSession";

interface ChatContextProps {
  conversations: ConversationSession[];
  activeConversation: ConversationSession | null;
  messages: MessageSessionProps[];
  isConnected: boolean;
  setActiveConversation: (conversation: ConversationSession) => void;
  sendMessage: (content: string) => void;
}

const ChatContext = createContext<ChatContextProps | undefined>(undefined);

export const ChatProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { dataUser } = useAuth();

  const [conversations, setConversations] = useState<
    ConversationSession[]
  >([]);
  const [activeConversation, setActiveConversation] =
    useState<ConversationSession | null>(null);
  const [messages, setMessages] = useState<MessageSessionProps[]>([]);
  const [isConnected, setIsConnected] = useState(false);

  const socketRef = useRef<Socket | null>(null);

 
  const userId = dataUser?.token
    ? getUserIdFromToken(dataUser.token)
    : null;

  useEffect(() => {
    if (!dataUser?.token || !userId) return;

    const socketInstance = io(
      `${process.env.NEXT_PUBLIC_API_URL}/chat`,
      {
        query: { userId },
      }
    );

    socketRef.current = socketInstance;

    socketInstance.on("connect", () => {
      console.log("Conectado al chat");
      setIsConnected(true);
    });

    socketInstance.on("disconnect", () => {
      console.log("Desconectado del chat");
      setIsConnected(false);
    });

    socketInstance.on(
      "newMessage",
      (message: MessageSessionProps) => {
        setMessages((prev) => [...prev, message]);
      }
    );

    socketInstance.on("connect_error", (err) => {
      console.error("Error socket:", err);
    });

    return () => {
      socketInstance.disconnect();
    };
  }, [dataUser?.token, userId]);

  useEffect(() => {
    if (!dataUser?.token || !userId) return;

    const loadConversations = async () => {
      try {
        const data = await getUserConversations(
          userId,
          dataUser.token
        );
        setConversations(data);
      } catch (error) {
        console.error("Error cargando conversaciones:", error);
      }
    };

    loadConversations();
  }, [dataUser?.token, userId]);

  useEffect(() => {
    if (!activeConversation || !dataUser?.token || !userId) return;

    const loadMessages = async () => {
      try {
        const data = await getMessagesByConversation(
          activeConversation.id,
          userId,
          dataUser.token
        );
        setMessages(data);
      } catch (error) {
        console.error("Error cargando mensajes:", error);
      }
    };

    loadMessages();
  }, [activeConversation, dataUser?.token, userId]);

  const sendMessage = (content: string) => {
    if (!socketRef.current || !activeConversation) return;

    socketRef.current.emit("sendMessage", {
      conversationId: activeConversation.id,
      content,
    });
  };

  return (
    <ChatContext.Provider
      value={{
        conversations,
        activeConversation,
        messages,
        isConnected,
        setActiveConversation,
        sendMessage,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context)
    throw new Error("useChat debe usarse dentro de ChatProvider");
  return context;
};
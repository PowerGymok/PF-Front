"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
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
  setActiveConversation: (conversation: ConversationSession) => void;
  sendMessage: (content: string) => void;
  socket?: Socket | null;
}

const ChatContext = createContext<ChatContextProps | undefined>(undefined);

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  const { dataUser, isLoading } = useAuth();

  const [conversations, setConversations] = useState<ConversationSession[]>([]);
  const [activeConversation, setActiveConversation] =
    useState<ConversationSession | null>(null);
  const [messages, setMessages] = useState<MessageSessionProps[]>([]);
  const [isConnected, setIsConnected] = useState(false);

  const socketRef = useRef<Socket | null>(null);

  const token = dataUser?.token;
  const role = dataUser?.user?.role;

  /*
  ─────────────────────────────────────────
  SOCKET
  ─────────────────────────────────────────
  */

  useEffect(() => {
    if (isLoading) return;
    if (!token) return;

    const socket = io(`${process.env.NEXT_PUBLIC_API_URL}/chat`, {
      auth: { token },
    });

    socketRef.current = socket;

    socket.on("connect", () => {
      setIsConnected(true);
      console.log("Chat conectado");
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    socket.on("newMessage", (message: MessageSessionProps) => {
      if (message.conversationId === activeConversation?.id) {
        setMessages((prev) => [...prev, message]);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [isLoading, token]);

  /*
  ─────────────────────────────────────────
  CARGAR CONVERSACIONES
  ─────────────────────────────────────────
  */

  useEffect(() => {
    if (isLoading) return;
    if (!token || !role) return;

    const load = async () => {
      try {
        const data = await getConversationsByRole(role, token);

        setConversations(data);
      } catch (error) {
        console.error("Error cargando conversaciones", error);
      }
    };

    load();
  }, [isLoading, token, role]);

  /*
  ─────────────────────────────────────────
  CARGAR MENSAJES
  ─────────────────────────────────────────
  */

  useEffect(() => {
    if (!activeConversation || !token) return;

    const load = async () => {
      const data = await getMessagesByConversation(
        activeConversation.id,
        token,
      );

      setMessages(data);
    };

    load();
  }, [activeConversation, token]);

  /*
  ─────────────────────────────────────────
  ENVIAR MENSAJE
  ─────────────────────────────────────────
  */

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

  if (!context) {
    throw new Error("useChat debe usarse dentro de ChatProvider");
  }

  return context;
};

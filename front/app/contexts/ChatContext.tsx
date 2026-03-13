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
  const [socket, setSocket] = useState<Socket | null>(null);
  const activeConversationRef = useRef<ConversationSession | null>(null);

  const token = dataUser?.token;
  const userId = dataUser?.user?.id;
  const role = dataUser?.user?.role as "user" | "Coach" | "Admin" | undefined;

  useEffect(() => {
    activeConversationRef.current = activeConversation;
  }, [activeConversation]);

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
    setSocket(socket);

    socket.on("connect", () => {
      console.log("Chat conectado");
      setIsConnected(true);

      if (activeConversationRef.current?.id) {
        socket.emit("joinConversation", activeConversationRef.current.id);
      }
    });

    socket.on("disconnect", () => {
      console.log("Chat desconectado");
      setIsConnected(false);
    });

    socket.on("connect_error", (err) => {
      console.error("Socket error:", err.message);
    });

    socket.on("newMessage", (message: MessageSessionProps) => {
  const currentUserId = dataUser?.user?.id;

  const normalizedMessage: MessageSessionProps = {
    ...message,
    senderId:
      message.senderId ??
      (message.type === "user" ? currentUserId : "coach"),
  };

  console.log("Mensaje recibido:", normalizedMessage);

  if (
    activeConversationRef.current?.id !==
    normalizedMessage.conversationId
  ) {
    return;
  }

  setMessages((prev) => {
    const exists = prev.find((m) => m.id === normalizedMessage.id);
    if (exists) return prev;

    return [...prev, normalizedMessage];
  });

  // 🔧 fallback para sincronizar mensajes (arregla el problema del user)
  setTimeout(async () => {
    try {
      if (!activeConversationRef.current?.id || !token || !userId) return;

      const data = await getMessagesByConversation(
        activeConversationRef.current.id,
        token,
        userId
      );

      setMessages(data);
    } catch (error) {
      console.error("Fallback chat sync error:", error);
    }
  }, 800);
});

    return () => {
      socket.disconnect();
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

        if (socketRef.current?.connected && activeConversation?.id) {

          console.log("Joining conversation:", activeConversation.id);

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
      if (
        socketRef.current?.connected &&
        activeConversationRef.current?.id
      ) {
        socketRef.current.emit(
          "leaveConversation",
          activeConversationRef.current.id
        );
      }
    };
  }, [activeConversation, token, userId, isLoading]);

//   useEffect(() => {
//   if (!activeConversation?.id) return;
//   if (!token || !userId) return;

//   const interval = setInterval(async () => {
//     try {
//       const data = await getMessagesByConversation(
//         activeConversation.id,
//         token,
//         userId
//       );

//       setMessages([...data]);
//     } catch (error) {
//       console.error("Chat polling error:", error);
//     }
//   }, 1500);

//   return () => clearInterval(interval);

// }, [activeConversation?.id, token, userId]);

//   useEffect(() => {
//   if (!activeConversation?.id) return;
//   if (!token || !userId) return;

//   const interval = setInterval(async () => {
//     try {

//       const data = await getMessagesByConversation(
//         activeConversation.id,
//         token,
//         userId
//       );

//       setMessages(data);

//     } catch (error) {
//       console.error("Polling chat error:", error);
//     }
//   }, 2000);

//   return () => clearInterval(interval);

// }, [activeConversation, token, userId]);

//   /**
//    * POLLING FALLBACK (IMPORTANTE PARA LA DEMO)
//    */
//   useEffect(() => {
//     if (!activeConversation?.id || !token || !userId) return;

//     const interval = setInterval(async () => {
//       try {
//         const data = await getMessagesByConversation(
//           activeConversation.id,
//           token,
//           userId
//         );

//         setMessages(data);
//       } catch (error) {
//         console.error("Polling mensajes error:", error);
//       }
//     }, 2500); // cada 2.5 segundos

//     return () => clearInterval(interval);
//   }, [activeConversation, token, userId]);


  // send message

  const sendMessage = (content: string) => {
  const clean = content.trim();

  if (!socketRef.current?.connected) return;
  if (!activeConversationRef.current?.id) return;
  if (!clean) return;

  const senderId = dataUser?.user?.id;
  if (!senderId) return;

  const optimisticMessage: MessageSessionProps = {
    id: `temp-${Date.now()}`,
    content: clean,
    senderId: senderId,
    conversationId: activeConversationRef.current.id,
    createdAt: new Date().toISOString(),
    type: "user",
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

  
  const refreshMessages = async () => {
    try {
      if (!activeConversationRef.current?.id || !token || !userId) return;

      const data = await getMessagesByConversation(
        activeConversationRef.current.id,
        token,
        userId
      );

      setMessages(data);
    } catch (error) {
      console.error("Chat refresh error:", error);
    }
  };

  setTimeout(refreshMessages, 600);
  setTimeout(refreshMessages, 1200);
  setTimeout(refreshMessages, 2000);
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
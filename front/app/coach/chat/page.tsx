"use client";

import { useEffect } from "react";
import { useAuth } from "@/app/contexts/AuthContext";
import { useChat } from "@/app/contexts/ChatContext";
import { getConversationsByRole } from "@/services/chat.services";
import ChatWindow from "@/features/chat/componentes/ChatWindow";

export default function CoachChatPage() {

  const { dataUser, isLoading } = useAuth();
  const { setActiveConversation } = useChat();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {

    const initCoachChat = async () => {

      if (isLoading) return;
      if (!dataUser?.token || !dataUser?.user?.id) return;

      try {

        const conversations = await getConversationsByRole(
          "Coach",
          dataUser.token,
          dataUser.user.id
        );

        if (conversations.length > 0) {
          setActiveConversation(conversations[0]);
        }

      } catch (error) {
        console.error("Error cargando chat coach:", error);
      }

    };

    initCoachChat();

  }, [dataUser, isLoading, setActiveConversation]);

  return (
    <div className="h-screen flex items-center justify-center bg-black">
      <ChatWindow />
    </div>
  );
}
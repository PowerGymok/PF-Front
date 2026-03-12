"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@/app/contexts/AuthContext";
import { useChat } from "@/app/contexts/ChatContext";
import {
  getConversationsByRole,
  createConversation,
} from "@/services/chat.services";
import ChatWindow from "@/features/chat/componentes/ChatWindow";

export default function UsersChatPage() {
  const searchParams = useSearchParams();
  const coachId = searchParams.get("coachId");

  const { setActiveConversation } = useChat();
  const { dataUser, isLoading} = useAuth();

  useEffect(() => {
    const initConversation = async () => {

      if (isLoading) return;
      if (!coachId) return;
      if (!dataUser?.token || !dataUser?.user?.id) return;

      try {
        const userId = dataUser.user.id;


        const conversations = await getConversationsByRole(
          "user",
          dataUser.token,
          userId,
        );

        let conversation = conversations.find(
          (c) => c.coach?.id === coachId
        );

        if (!conversation) {
          conversation = await createConversation(coachId, dataUser.token);
        }

  
        setActiveConversation(conversation);

      } catch (error) {
        console.error("Error iniciando conversación:", error);
      }
    };

    initConversation();

  }, [coachId, dataUser, setActiveConversation, isLoading]);

  return (
    <div className="h-screen flex bg-gray-100">
      <ChatWindow />
    </div>
  );
}
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

  const { activeConversation, setActiveConversation } = useChat();
  const { dataUser } = useAuth();

  useEffect(() => {
    const initConversation = async () => {
      if (!coachId || !dataUser?.token) return;

      const conversations = await getConversationsByRole(
        "user",
        dataUser.token,
      );

      let conversation = conversations.find((c) => c.coach?.id === coachId);

      if (!conversation) {
        conversation = await createConversation(coachId, dataUser.token);
      }

      setActiveConversation(conversation);
    };

    initConversation();
  }, [coachId, dataUser, setActiveConversation]);

  return (
    <div className="h-screen flex bg-gray-100">
      <ChatWindow conversationId={activeConversation?.id} />
    </div>
  );
}

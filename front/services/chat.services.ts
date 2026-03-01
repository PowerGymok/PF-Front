import { MessageSessionProps } from "@/interface/MessageSession";
import { ConversationSession } from "@/interface/ConversationSession";

export const getUserConversations = async (
  userId: string,
  token: string
): Promise<ConversationSession[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/conversations/user/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Error obteniendo conversaciones");
  }

  return res.json();
};

export const getMessagesByConversation = async (
  userId: string,
  conversationId: string,
  token: string
): Promise<MessageSessionProps[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chat/conversations/${conversationId}/messages?userId=${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Error obteniendo mensajes");
  }

  return res.json();
};

export const createConversation = async (
  coachId: string,
  token: string
): Promise<ConversationSession> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/conversations`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ coachId }),
  });

  if (!res.ok) {
    throw new Error("Error creando conversación");
  }

  return res.json();
};
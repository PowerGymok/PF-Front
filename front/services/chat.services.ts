import { MessageSessionProps } from "@/interface/MessageSession";
import { ConversationSession } from "@/interface/ConversationSession";

const API = process.env.NEXT_PUBLIC_API_URL;

export const getConversationsByRole = async (
  role: "user" | "Coach" | "Admin",
  token: string,
): Promise<ConversationSession[]> => {
  if (role === "Admin") return [];

  const endpoint =
    role === "Coach" ? "/chat/conversations/coach" : "/chat/conversations/user";

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, {
    method: "GET",
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
  conversationId: string,
  token: string,
): Promise<MessageSessionProps[]> => {
  const res = await fetch(
    `${API}/chat/conversations/${conversationId}/messages`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!res.ok) {
    throw new Error("Error obteniendo mensajes");
  }

  return res.json();
};

export const createConversation = async (
  coachId: string,
  token: string,
): Promise<ConversationSession> => {
  const res = await fetch(`${API}/chat/conversations`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ coachId }),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || "Error creando conversación");
  }

  return res.json();
};

export const closeChat = async (conversationId: string, token: string) => {
  const res = await fetch(`${API}/chat/conversations/${conversationId}/close`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Error cerrando conversación");
  }

  return res.json();
};

import { MessageSessionProps } from "@/interface/MessageSession";
import { ConversationSession } from "@/interface/ConversationSession";

//modicacion de service para acceder al endpoint segun el role para simiplicar codigo
export const getConversationsByRole = async (
  role: "user" | "Coach",
  id: string,
  token: string,
): Promise<ConversationSession[]> => {
  const endpoint =
    role === "Coach"
      ? `/chat/conversations/coach/${id}`
      : `/conversations/user/${id}`;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, {
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
  token: string,
): Promise<MessageSessionProps[]> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/chat/conversations/${conversationId}/messages?userId=${userId}`,
    {
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

export const getAccesChat = async (token: string, userId: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/chat/access/${userId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!res.ok) {
    throw new Error("Error obteniendo sesiones activas");
  }

  return res.json();
};

export const closeChat = async (conversationId: string, token: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/chat/conversations/${conversationId}/close`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Error cerrando la conversación");
    }
    return await res.json();
  } catch (error) {
    throw error;
  }
};

export const getCoachConversations = async (coachId: string, token: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/chat/conversations/coach/${coachId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(
      error.message || "Error obteniendo conversaciones del coach",
    );
  }

  return res.json();
};

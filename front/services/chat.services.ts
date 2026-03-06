import { MessageSessionProps } from "@/interface/MessageSession";
import { ConversationSession } from "@/interface/ConversationSession";

const API = process.env.NEXT_PUBLIC_API_URL;

export const getConversationsByRole = async (
  role: "user" | "Coach" | "Admin",
  token: string,
  userId: string
) => {

  const decoded = JSON.parse(atob(token.split(".")[1]));
const realUserId = decoded.sub;

const endpoint =
  role === "Coach"
    ? `/chat/conversations/coach/${realUserId}`
    : `/chat/conversations/user/${realUserId}`;

  console.log("FULL URL:", `${API}${endpoint}`);
  console.log("TOKEN ENVIADO:", token);

  const res = await fetch(`${API}${endpoint}`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    const error = await res.text();
    console.log("BACKEND ERROR:", error);
    throw new Error(`Error obteniendo conversaciones: ${res.status}`);
  }

  return res.json();
};

export const getMessagesByConversation = async (
  conversationId: string,
  token: string,
  userId: string
) => {
  const res = await fetch(
    `${API}/chat/conversations/${conversationId}/messages?userId=${userId}`,
    {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (!res.ok) {
    throw new Error("Error obteniendo mensajes");
  }

  return res.json();
};

export const createConversation = async (
  coachId: string,
  token: string
): Promise<ConversationSession> => {
  const res = await fetch(`${API}/chat/conversations`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
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
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || "Error cerrando conversación");
  }

  return res.json();
};
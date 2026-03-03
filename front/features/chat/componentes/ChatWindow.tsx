"use client";

import { useState, useRef, useEffect } from "react";
import BubbleMessage from "./BubbleMessages";
import { useAuth } from "@/app/contexts/AuthContext";
import {
  getConversationsByRole,
  getMessagesByConversation,
  getAccesChat,
} from "../../../services/chat.services";

interface Message {
  id: string;
  content: string;
  sender: "user" | "coach";
  createdAt: string;
}

export default function ChatWindow() {
  const { dataUser } = useAuth();

  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [selectedConversation, setSelectedConversation] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const bottomRef = useRef<HTMLDivElement>(null);

  const currentUserRole = dataUser?.user?.role === "Coach" ? "coach" : "user";

  useEffect(() => {
    if (!dataUser) return;

    const initChat = async () => {
      try {
        const role = dataUser.user.role as "user" | "Coach";
        const userId = dataUser.user.id;
        const token = dataUser.token;

        if (role === "user") {
          const access = await getAccesChat(token, userId);
          if (!access) {
            setLoading(false);
            return;
          }
        }

        const conversations = await getConversationsByRole(role, userId, token);

        if (conversations.length > 0) {
          const conversation = conversations[0];
          setSelectedConversation(conversation);

          const msgs = await getMessagesByConversation(
            userId,
            conversation.id,
            token,
          );

          const formattedMessages: Message[] = msgs.map((msg: any) => ({
            id: msg.id,
            content: msg.content,
            sender:
              msg.senderId === userId
                ? currentUserRole
                : currentUserRole === "user"
                  ? "coach"
                  : "user",
            createdAt: new Date(msg.createdAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          }));

          setMessages(formattedMessages);
        }
      } catch (error) {
        console.error("Error initializing chat:", error);
      } finally {
        setLoading(false);
      }
    };

    initChat();
  }, [dataUser]);

  const sendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return;

    const message: Message = {
      id: crypto.randomUUID(),
      content: newMessage,
      sender: currentUserRole,
      createdAt: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, message]);
    setNewMessage("");
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[600px]">
        Cargando chat
      </div>
    );
  }

  if (!dataUser || dataUser.user.role === "Admin") {
    return null;
  }

  return (
    <div className="flex flex-col h-[600px] max-w-2xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
      <div className="bg-gray-600 text-white p-4 font-semibold">
        Coach PowerGym
      </div>

      <div className="flex-1 overflow-y-auto p-4 bg-gray-100">
        {messages.map((msg) => (
          <BubbleMessage
            key={msg.id}
            message={msg}
            currentUserRole={currentUserRole}
          />
        ))}
        <div ref={bottomRef} />
      </div>

      <div className="p-4 border-t flex gap-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Escribe un mensaje..."
          className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="bg-gray-600 text-white px-5 rounded-full hover:bg-blue-700 transition"
        >
          Enviar
        </button>
      </div>
    </div>
  );
}

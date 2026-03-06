"use client";

import { useEffect, useState, useRef } from "react";
import { MessageSessionProps } from "@/interface/MessageSession";
import { getMessagesByConversation } from "@/services/chat.services";
import { useAuth } from "@/app/contexts/AuthContext";
import { useChat } from "@/app/contexts/ChatContext";

interface ChatWindowProps {
  conversationId: string | undefined;
}

const ChatWindow = ({ conversationId }: ChatWindowProps) => {
  const { dataUser } = useAuth();
  const { socket } = useChat();

  const token = dataUser?.token;

  const [messages, setMessages] = useState<MessageSessionProps[]>([]);
  const [newMessage, setNewMessage] = useState("");

  const messagesEndRef = useRef<HTMLDivElement>(null);

  /*
  ─────────────────────────────────────────
  CARGAR MENSAJES
  ─────────────────────────────────────────
  */

  useEffect(() => {
    const loadMessages = async () => {
      if (!conversationId || !token) return;

      try {
        const data = await getMessagesByConversation(conversationId, token);
        setMessages(data);
      } catch (error) {
        console.error("Error cargando mensajes:", error);
      }
    };

    loadMessages();
  }, [conversationId, token]);

  /*
  ─────────────────────────────────────────
  ESCUCHAR MENSAJES NUEVOS (SOCKET)
  ─────────────────────────────────────────
  */

  useEffect(() => {
    if (!socket) return;

    const handleMessage = (message: MessageSessionProps) => {
      if (message.conversationId === conversationId) {
        setMessages((prev) => [...prev, message]);
      }
    };

    socket.on("newMessage", handleMessage);

    return () => {
      socket.off("newMessage", handleMessage);
    };
  }, [socket, conversationId]);

  /*
  ─────────────────────────────────────────
  ENVIAR MENSAJE
  ─────────────────────────────────────────
  */

  const handleSendMessage = () => {
    if (!socket || !conversationId) return;
    if (!newMessage.trim()) return;

    socket.emit("sendMessage", {
      conversationId,
      content: newMessage,
    });

    setNewMessage("");
  };

  /*
  ─────────────────────────────────────────
  AUTO SCROLL
  ─────────────────────────────────────────
  */

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  /*
  ─────────────────────────────────────────
  UI
  ─────────────────────────────────────────
  */

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-md">
      {/* HEADER */}

      <div className="border-b p-4 font-semibold text-gray-700">
        Chat con tu coach
      </div>

      {/* MENSAJES */}

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg) => {
          const isMine = msg.senderId === dataUser?.user.id;

          return (
            <div
              key={msg.id}
              className={`flex ${isMine ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`
                max-w-xs px-4 py-2 rounded-lg text-sm
                ${
                  isMine
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-800"
                }
                `}
              >
                {msg.content}
              </div>
            </div>
          );
        })}

        <div ref={messagesEndRef} />
      </div>

      {/* INPUT */}

      <div className="border-t p-3 flex gap-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Escribe un mensaje..."
          className="border rounded-md flex-1 bg-gray-100 text-black px-3 py-2 text-sm outline-none"
        />

        <button
          onClick={handleSendMessage}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 text-sm"
        >
          Enviar
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;

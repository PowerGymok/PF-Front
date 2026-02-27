"use client";

import { useState, useRef, useEffect } from "react";
import BubbleMessage from "./BubbleMessages";

interface Message {
  id: string;
  content: string;
  sender: "user" | "coach";
  createdAt: string;
}

export default function ChatWindow() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hola En que podria ayudarte, soy la prueba de coach",
      sender: "coach",
      createdAt: "10:30",
    },
    {
      id: "2",
      content: "Me gustaria inscribirme",
      sender: "user",
      createdAt: "10:31",
    },
  ]);

  const [newMessage, setNewMessage] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  const currentUserRole: "user" = "user"; 

  const sendMessage = () => {
    if (!newMessage.trim()) return;

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
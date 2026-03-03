"use client";

import { useState } from "react";
import ChatWindow from "../../../features/chat/componentes/ChatWindow";

interface Conversation {
  id: string;
  userName: string;
  lastMessage: string;
  time: string;
}

export default function CoachChatPage() {
  const [selectedConversation, setSelectedConversation] =
    useState<Conversation | null>(null);

  const conversations: Conversation[] = [
    {
      id: "1",
      userName: "Juan Pérez",
      lastMessage: "Gracias coach!",
      time: "10:30",
    },
    {
      id: "2",
      userName: "María López",
      lastMessage: "¿Cuándo es la próxima clase?",
      time: "09:15",
    },
  ];

  return (
    <div className="h-screen flex bg-gray-100">
      <div className="w-1/3 max-w-sm bg-white border-r shadow-md flex flex-col">
        <div className="p-5 border-b bg-gray-700 text-white font-semibold text-lg">
          Conversaciones
        </div>

        <div className="flex-1 overflow-y-auto">
          {conversations.map((conv) => (
            <div
              key={conv.id}
              onClick={() => setSelectedConversation(conv)}
              className={`p-4 cursor-pointer border-b hover:bg-gray-100 transition ${
                selectedConversation?.id === conv.id ? "bg-gray-200" : ""
              }`}
            >
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-gray-800">{conv.userName}</h3>
                <span className="text-xs text-gray-500">{conv.time}</span>
              </div>
              <p className="text-sm text-gray-500 truncate">
                {conv.lastMessage}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        {selectedConversation ? (
          <ChatWindow />
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <h2 className="text-2xl font-semibold mb-2">
              Selecciona una conversación ahora
            </h2>
            <p>Elige un usuario para comenzar a responder mensajes.</p>
          </div>
        )}
      </div>
    </div>
  );
}

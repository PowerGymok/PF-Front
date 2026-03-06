"use client";

import { useEffect, useRef, useState } from "react";
import { useAuth } from "@/app/contexts/AuthContext";
import { useChat } from "@/app/contexts/ChatContext";

const ChatWindow = () => {
  const { dataUser } = useAuth();
  const {
    conversations,
    activeConversation,
    messages,
    isConnected,
    isLoadingConversations,
    isLoadingMessages,
    setActiveConversation,
    sendMessage,
  } = useChat();

  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const currentUserId = dataUser?.user?.id;

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    sendMessage(newMessage);
    setNewMessage("");
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="w-[380px] h-[560px] bg-white rounded-2xl shadow-2xl border border-gray-200 flex overflow-hidden">
      <div className="w-[130px] border-r border-gray-200 bg-gray-50 flex flex-col">
        <div className="p-3 border-b border-gray-200">
          <h3 className="text-sm font-semibold text-gray-700">Chats</h3>
          <p
            className={`text-xs mt-1 ${
              isConnected ? "text-green-600" : "text-red-500"
            }`}
          >
            {isConnected ? "Conectado" : "Desconectado"}
          </p>
        </div>

        <div className="flex-1 overflow-y-auto">
          {isLoadingConversations ? (
            <p className="text-xs text-gray-500 p-3">Cargando...</p>
          ) : conversations.length === 0 ? (
            <p className="text-xs text-gray-500 p-3">Sin conversaciones</p>
          ) : (
            conversations.map((conversation) => (
              <button
                key={conversation.id}
                onClick={() => setActiveConversation(conversation)}
                className={`w-full text-left px-3 py-3 border-b border-gray-100 text-xs cursor-pointer transition ${
                  activeConversation?.id === conversation.id
                    ? "bg-gray-200 font-semibold text-gray-900"
                    : "hover:bg-gray-100 text-gray-700"
                }`}
              >
                <p className="truncate">Conversación</p>
                <p className="text-[10px] text-gray-500 truncate">
                  {conversation.id.slice(0, 8)}...
                </p>
              </button>
            ))
          )}
        </div>
      </div>

      <div className="flex-1 flex flex-col bg-white">
        <div className="border-b border-gray-200 p-4">
          <h2 className="font-semibold text-gray-800">
            {activeConversation ? "Chat con tu coach" : "Selecciona un chat"}
          </h2>
        </div>

        <div className="flex-1 overflow-y-auto p-4 bg-gray-100 space-y-3">
          {!activeConversation ? (
            <div className="h-full flex items-center justify-center text-sm text-gray-500">
              No hay conversación activa
            </div>
          ) : isLoadingMessages ? (
            <div className="h-full flex items-center justify-center text-sm text-gray-500">
              Cargando mensajes...
            </div>
          ) : messages.length === 0 ? (
            <div className="h-full flex items-center justify-center text-sm text-gray-500">
              Aún no hay mensajes
            </div>
          ) : (
            messages.map((msg) => {
              const isMine = msg.senderId === currentUserId;

              return (
                <div
                  key={msg.id}
                  className={`flex ${isMine ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[75%] px-4 py-2 rounded-2xl text-sm shadow-sm ${
                      isMine
                        ? "bg-gray-700 text-white rounded-br-sm"
                        : "bg-white text-gray-800 rounded-bl-sm"
                    }`}
                  >
                    <p>{msg.content}</p>
                    {msg.createdAt && (
                      <p
                        className={`text-[10px] mt-1 ${
                          isMine ? "text-gray-200" : "text-gray-400"
                        }`}
                      >
                        {new Date(msg.createdAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    )}
                  </div>
                </div>
              );
            })
          )}

          <div ref={messagesEndRef} />
        </div>

        <div className="border-t border-gray-200 p-3 flex gap-2 bg-white">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSendMessage();
            }}
            disabled={!activeConversation}
            placeholder={
              activeConversation
                ? "Escribe un mensaje..."
                : "Selecciona una conversación"
            }
            className="flex-1 border border-gray-300 rounded-xl bg-gray-50 text-black px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-400 disabled:opacity-60"
          />

          <button
            onClick={handleSendMessage}
            disabled={!activeConversation || !newMessage.trim()}
            className="bg-gray-700 text-white px-4 py-2 rounded-xl hover:bg-gray-900 text-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
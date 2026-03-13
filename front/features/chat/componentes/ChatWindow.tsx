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

  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const [newMessage, setNewMessage] = useState("");

  const currentUserId = dataUser?.user?.id;
  const role = dataUser?.user?.role;

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    sendMessage(newMessage);
    setNewMessage("");
  };

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
  if (!activeConversation) return;

  const interval = setInterval(() => {
    setActiveConversation({ ...activeConversation });
  }, 4000);

  return () => clearInterval(interval);
}, [activeConversation]);

  useEffect(() => {
  setNewMessage((prev) => prev);
}, [messages]);

  if (!currentUserId) return null;

  return (
    <div className="w-full h-full bg-black flex overflow-hidden text-white">

      {/* SIDEBAR */}
      <div className="w-[160px] border-r border-neutral-800 bg-neutral-950 flex flex-col">

        <div className="p-4 border-b border-neutral-800">
          <h3 className="text-sm font-light tracking-wide">Chats</h3>

          <p
            className={`text-xs mt-2 ${
              isConnected ? "text-green-400" : "text-red-400"
            }`}
          >
            {isConnected ? "Conectado" : "Desconectado"}
          </p>
        </div>

        <div className="flex-1 overflow-y-auto">

          {isLoadingConversations ? (
            <p className="text-xs text-neutral-500 p-4">
              Cargando conversaciones...
            </p>

          ) : conversations.length === 0 ? (
            <p className="text-xs text-neutral-500 p-4">
              Sin conversaciones
            </p>

          ) : (
            conversations.map((conversation) => {

              const otherUser =
                role === "Coach"
                  ? conversation.user
                  : conversation.coach;

              const displayName =
                otherUser?.name ||
                otherUser?.email ||
                "Usuario";

              return (
                <button
                  key={conversation.id}
                  onClick={() => setActiveConversation(conversation)}
                  className={`w-full text-left px-4 py-3 border-b border-neutral-900 text-xs transition cursor-pointer ${
                    activeConversation?.id === conversation.id
                      ? "bg-neutral-800 text-white"
                      : "hover:bg-neutral-900 text-neutral-400"
                  }`}
                >
                  <p className="truncate font-light tracking-wide">
                    {displayName}
                  </p>

                  <p className="text-[10px] text-neutral-600 truncate">
                    {conversation.id.slice(0, 8)}...
                  </p>
                </button>
              );
            })
          )}

        </div>

      </div>

      {/* CHAT AREA */}
      <div className="flex-1 flex flex-col bg-black">

        {/* HEADER */}
        <div className="border-b border-neutral-800 p-4">
          <h2 className="text-sm font-light tracking-wide text-neutral-300">
            {activeConversation
              ? `Chat con ${
                  role === "Coach"
                    ? activeConversation.user?.name ||
                      activeConversation.user?.email ||
                      "Usuario"
                    : activeConversation.coach?.name ||
                      activeConversation.coach?.email ||
                      "Usuario"
                }`
              : "Selecciona un chat"}
          </h2>
        </div>

        {/* MENSAJES */}
        <div
          ref={messagesContainerRef}
          className="flex-1 min-h-0 overflow-y-auto p-5 bg-neutral-950 space-y-4 pb-4"
        >

          {!activeConversation ? (
            <div className="h-full flex items-center justify-center text-sm text-neutral-500">
              No hay conversación activa
            </div>

          ) : isLoadingMessages ? (
            <div className="h-full flex items-center justify-center text-sm text-neutral-500">
              Cargando mensajes...
            </div>

          ) : messages.length === 0 ? (
            <div className="h-full flex items-center justify-center text-sm text-neutral-500">
              Aún no hay mensajes
            </div>

          ) : (
            messages.map((msg) => {

              const senderId = msg.sender?.id ?? msg.senderId;

              const isMine = String(senderId) === String(currentUserId);
                // senderId === currentUserId ||
                // (msg.type === "user" && role !== "Coach") ||
                // (msg.type === "coach" && role === "Coach");

              return (
                <div
                  key={msg.id}
                  className={`flex ${
                    isMine ? "justify-end" : "justify-start"
                  }`}
                >

                  <div
                    className={`max-w-[75%] px-4 py-2 rounded-lg text-sm ${
                      isMine
                        ? "bg-white text-black"
                        : "bg-neutral-800 text-neutral-200"
                    }`}
                  >

                    <p className="font-light leading-relaxed">
                      {msg.content}
                    </p>

                    {msg.createdAt && (
                      <p
                        className={`text-[10px] mt-1 ${
                          isMine
                            ? "text-neutral-600"
                            : "text-neutral-400"
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

        </div>

        {/* INPUT */}
        <div className="border-t border-neutral-800 p-4 flex gap-2 bg-black flex-shrink-0">

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
            className="flex-1 bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-sm text-white placeholder-neutral-500 outline-none focus:border-neutral-600 disabled:opacity-40"
          />

          <button
            onClick={handleSendMessage}
            disabled={!activeConversation || !newMessage.trim()}
            className="bg-white text-black px-4 py-2 rounded-lg text-sm hover:bg-neutral-200 transition disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Enviar
          </button>

        </div>

      </div>
    </div>
  );
};

export default ChatWindow;
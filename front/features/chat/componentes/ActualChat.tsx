// "use client";

// import { useState, useEffect, useRef } from "react";
// import { useAuth } from "@/app/contexts/AuthContext";
// import { io, Socket } from "socket.io-client";
// import { getMessagesByConversation } from "@/services/chat.services";
// import BubbleMessage from "./BubbleMessages";
// import { MessageSessionProps } from "@/interface/MessageSession";

// interface ChatActualProps {
//   conversationId: string;
// }

// interface Message {
//   id: string;
//   content: string;
//   sender: "user" | "coach";
//   createdAt: string;
// }

// export default function ChatActual({ conversationId }: ChatActualProps) {
//   const { dataUser } = useAuth();
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [newMessage, setNewMessage] = useState("");
//   const bottomRef = useRef<HTMLDivElement>(null);
//   const socketRef = useRef<Socket | null>(null);

//   const currentUserRole = dataUser?.user.role === "Coach" ? "coach" : "user";

//   useEffect(() => {
//     if (!dataUser || !conversationId) return;

//     const loadMessages = async () => {
//       try {
//         const msgs = await getMessagesByConversation(
//           dataUser.user.id,
//           conversationId,
//           dataUser.token,
//         );

//         const formatted: Message[] = msgs.map((msg: MessageSessionProps) => ({
//           id: msg.id,
//           content: msg.content,
//           sender:
//             msg.senderId === dataUser.user.id
//               ? currentUserRole
//               : currentUserRole === "user"
//                 ? "coach"
//                 : "user",
//           createdAt: new Date(msg.createdAt).toLocaleTimeString([], {
//             hour: "2-digit",
//             minute: "2-digit",
//           }),
//         }));

//         setMessages(formatted);
//       } catch (error) {
//         console.error("Error cargando mensajes:", error);
//       }
//     };

//     loadMessages();
//   }, [conversationId, dataUser]);

//   useEffect(() => {
//     if (!dataUser) return;

//     socketRef.current = io(process.env.NEXT_PUBLIC_API_URL!, {
//       auth: {
//         token: dataUser.token,
//       },
//     });

//     socketRef.current.on("connect", () => {
//       console.log("Conectado");
//     });

//     socketRef.current.on("disconnect", (reason) => {
//       console.log("Desconectado:", reason);
//     });

//     socketRef.current.on("newMessage", (msg: any) => {
//       if (msg.conversationId !== conversationId) return;

//       const formatted: Message = {
//         id: msg.id,
//         content: msg.content,
//         sender:
//           msg.senderId === dataUser.user.id
//             ? currentUserRole
//             : currentUserRole === "user"
//               ? "coach"
//               : "user",
//         createdAt: new Date(msg.createdAt).toLocaleTimeString([], {
//           hour: "2-digit",
//           minute: "2-digit",
//         }),
//       };

//       setMessages((prev) => [...prev, formatted]);
//     });

//     return () => {
//       socketRef.current?.disconnect();
//     };
//   }, [dataUser]);

//   useEffect(() => {
//     bottomRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   const sendMessage = () => {
//     if (!newMessage.trim()) return;

//     socketRef.current?.emit("sendMessage", {
//       conversationId,
//       content: newMessage,
//     });

//     setNewMessage("");
//   };

//   useEffect(() => {
//     if (!socketRef.current || !conversationId) return;

//     socketRef.current.emit("joinConversation", conversationId);

//     return () => {
//       socketRef.current?.emit("leaveConversation", conversationId);
//     };
//   }, [conversationId]);

//   return (
//     <div className="flex flex-col h-full bg-white">
//       <div className="flex-1 overflow-y-auto p-4 bg-gray-100">
//         {messages.map((msg) => (
//           <BubbleMessage
//             key={msg.id}
//             message={msg}
//             currentUserRole={currentUserRole}
//           />
//         ))}
//         <div ref={bottomRef} />
//       </div>

//       <div className="p-4 border-t flex gap-2">
//         <input
//           type="text"
//           value={newMessage}
//           onChange={(e) => setNewMessage(e.target.value)}
//           placeholder="Escribe un mensaje..."
//           className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
//           onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//         />
//         <button
//           onClick={sendMessage}
//           className="bg-gray-700 text-white px-5 rounded-full hover:bg-gray-900 transition"
//         >
//           Enviar
//         </button>
//       </div>
//     </div>
//   );
// }

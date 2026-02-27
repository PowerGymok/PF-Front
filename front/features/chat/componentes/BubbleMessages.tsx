"use client";

interface Message {
  id: string;
  content: string;
  sender: "user" | "coach";
  createdAt: string;
}

interface Props {
  message: Message;
  currentUserRole: "user" | "coach";
}

export default function BubbleMessage({ message, currentUserRole }: Props) {
  const isMine = message.sender === currentUserRole;

  return (
    <div
      className={`flex w-full mb-3 ${
        isMine ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`
          max-w-xs md:max-w-md px-4 py-2 rounded-2xl shadow-md
          ${
            isMine
              ? "bg-gray-600 text-white rounded-br-sm"
              : "bg-gray-200 text-gray-800 rounded-bl-sm"
          }
        `}
      >
        <p className="text-sm">{message.content}</p>
        <p className="text-[10px] mt-1 opacity-70 text-right">
          {message.createdAt}
        </p>
      </div>
    </div>
  );
}
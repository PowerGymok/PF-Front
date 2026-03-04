"use client";

import { useState } from "react";
import ChatWindow from "./ChatWindow";

export default function ChatFloating() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="cursor-pointer fixed bottom-6 right-6 bg-gray-600 text-white w-14 h-14 rounded-full shadow-xl flex items-center justify-center hover:bg-gray-800 transition z-50"
      >
        💬
      </button>

    
      {open && (
        <div className="fixed bottom-24 right-6 z-50">
          <ChatWindow />
        </div>
      )}
    </div>
  );
}
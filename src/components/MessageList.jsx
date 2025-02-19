'use client'

import { MessageItem } from "./MessageItem";
import { Loader2 } from "lucide-react";
import { useAppContext } from "./context";
import { useEffect, useRef } from "react";
import { MessageItems } from "./messageItems";
// interface Message {
//   id: string;
//   text: string;
//   sender: "user" | "ai";
//   language?: string;
//   summary?: string;
//   translation?: string;
// }
// interface MessagesListProps {
//   messages: Message[];
//   onUpdateMessage: (messageId: string, updates: Partial<Message>) => void;
//   isProcessing: boolean;
// }
export const MessagesList = () => {
  const { messages, isProcessing, downloadProgress } = useAppContext();

  const chatRef = useRef(null)

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages])
  
  return (
    <div ref={chatRef} className="flex-1 overflow-y-auto p-4 space-y-4 chat_box">
      {messages.map((message, index) => (
        <MessageItems
          key={index}
          message={message}
          downloadProgress={downloadProgress}
        />
      ))}
      
    </div>
  );
};

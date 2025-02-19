"use client";

import React from "react";
import { Send, Languages } from "lucide-react";
import { useAppContext } from "./context";

export const InputArea = ({ onSend }) => {
  const {
    isProcessing,
    text,
    setText,
    handleSubmit,
    error,
  } = useAppContext();

  return (
    <div className="border-t bg-white/90 backdrop-blur-sm">
      {error !== "" && (
        <p className="text-red-600 mx-auto w-fit p-2">{error}</p>
      )}
      
      <form
        onSubmit={handleSubmit}
        className="p-4"
      >
        <div className="flex gap-3">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={
              isProcessing ? "Please wait..." : "Type your message..."
            }
            className="flex-1 resize-none rounded-xl border-0 bg-gray-50 p-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-200 focus:ring-2 focus:ring-purple-500 transition-shadow disabled:opacity-50"
            rows={3}
            disabled={isProcessing}
          />
          <button
            type="submit"
            className="self-end p-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:opacity-90 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Send message"
            disabled={isProcessing}
          >
            <Send size={20} />
          </button>
        </div>
      </form>
    </div>
  );
};

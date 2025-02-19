import {
  FileText,
  AlertTriangle,
} from "lucide-react";
import DownloadButton from "./DownloadButton";

export const MessageItem = ({ message, downloadProgress }) => {
  const showSummarizeButton =
    message.text.length > 150 && message.language === "en";

  const isUser = message.sender === "user";

  return (
    <div
      className={`flex flex-col ${
        isUser ? "items-end" : "items-start"
      } space-y-2`}
    >
      {message.error ? (
        <div className="max-w-[80%] rounded-2xl p-4 bg-amber-50 border border-amber-200">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-amber-100 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
            </div>
            <div className="flex-1">
              <p className="text-amber-800 font-medium mb-3">
                {message.error.message}
              </p>
              {message.error.action && <DownloadButton message={message} />}
              {downloadProgress && <p>{downloadProgress}% Completed.</p>}
            </div>
          </div>
        </div>
      ) : (
        <div
          className={`max-w-[80%] rounded-2xl p-4 pb-2 ${
            isUser
              ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          <p className="leading-relaxed">{message.text}</p>
          <p
            className={`text-[12px] text-right text-gray-200 ${
              isUser ? "block" : "hidden"
            }`}
          >
            Lang: <span className="uppercase">{message.language}</span>
          </p>
        </div>
      )}
      {!isUser && !message.error && (
        <div className="space-y-3 w-full">
          {showSummarizeButton && (
            <button className="inline-flex items-center gap-2 px-4 py-2 text-sm bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors" >
              <FileText className="w-4 h-4" />
              Summarize
            </button>
          )}
          {message.summary && (
            <div className="p-4 bg-purple-50 rounded-lg border border-purple-100">
              <div className="text-sm font-medium text-purple-700 mb-2">
                Summary
              </div>
              <p className="text-gray-800">{message.summary}</p>
            </div>
          )}
          {/* {message.translation && (
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
              <div className="text-sm font-medium text-blue-700 mb-2">
                Translation
              </div>
              <p className="text-gray-800">{message.translation}</p>
            </div>
          )} */}
        </div>
      )}
    </div>
  );
};

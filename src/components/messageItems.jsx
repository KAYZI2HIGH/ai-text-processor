"use client";

import React, { useState } from "react";
import { useAppContext } from "./context";
import { AlertTriangle, Loader2 } from "lucide-react";
import DownloadButton from "./DownloadButton";
import { v4 as uuid } from "uuid";

export const MessageItems = ({ message }) => {
  const { languages, setMessages, downloadProgress, setDownloadProgress } =
    useAppContext();
  const [selectedFeature, setSelectedFeature] = useState("");

  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState();
  const [isDownloading, setIsDownloading] = useState(false);

  const showSummarizeButton =
    message.text.length > 150 && message.language === "en";

  const handleTranslate = async () => {
    setSelectedFeature("translate");

    if (message.language !== selectedLanguage) {
      if ("ai" in self && "translator" in self.ai) {
        try {
          const translatorCapabilities =
            await self.ai.translator.capabilities();
          let avalable = translatorCapabilities.languagePairAvailable(
            message.language,
            selectedLanguage
          );

          if (avalable === "after-download") {
            setIsDownloading(true);
            const translate = await self.ai.translator.create({
              sourceLanguage: message.language,
              targetLanguage: selectedLanguage,
              monitor(m) {
                m.addEventListener("downloadprogress", (e) => {
                  console.log(`Downloaded ${e.loaded} of ${e.total} bytes.`);
                  setDownloadProgress((e.loaded / e.total) * 100);
                });
              },
            });

            avalable = translatorCapabilities.languagePairAvailable(
              message.language,
              selectedLanguage
            );
            console.log(avalable);
            setIsDownloading(false);
          }

          if (avalable === "readily") {
            setIsProcessing(true);
            try {
              const translator = await self.ai.translator.create({
                sourceLanguage: message.language,
                targetLanguage: selectedLanguage,
              });
              const result = await translator.translate(message.text);

              setMessages((prev) =>
                prev.map((msg) =>
                  msg.id === message.id
                    ? {
                        ...msg,
                        translation: result,
                      }
                    : msg
                )
              );
            } catch (error) {
              console.error("Failed to get AI response:", error);
              setError("Failed to get AI response");
              setTimeout(() => {
                setError("");
              }, 2000);
            } finally {
              setIsProcessing(false);
            }
          }
        } catch (error) {
          setError(error);
        }
      } else {
        setError("The Translator API is not supported.");
        console.log("The Translator API is not supported.");
      }
    } else {
      setError("Please select a different language.");
      setTimeout(() => {
        setError("");
      }, 2000);
    }
  };

  const handleSummarize = async () => {
    setSelectedFeature("summarize");
    if (message.language === "en") {
      if ("ai" in self && "summarizer" in self.ai) {
        console.log("The summarization api is supported");
        const capability = await ai.summarizer.capabilities();
        const available = capability.available;
        console.log(available);
        let summarizer;

        if (available === "no") {
          setError("The summarization API can't be used at the moment.");
          setTimeout(() => {
            setError("");
          }, 2000);
        } else if (available === "readily") {
          setIsProcessing(true);
          summarizer = await self.ai.summarizer.create();
          const summary = await summarizer.summarize(message.text);

          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === message.id
                ? {
                    ...msg,
                    summary,
                  }
                : msg
            )
          );
          setIsProcessing(false);
        } else {
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === message.id
                ? {
                    ...msg,
                    error: {
                      message:
                        "Additional resources need to be downloaded for processing this text.",
                      action: {
                        type: "summarizer",
                        label: "Download Summarizer Pack",
                      },
                    },
                  }
                : msg
            )
          );
        }
      } else {
        console.log("The summarization api isn't supported");
        setError("The summarization api isn't supported");
      }
    } else {
      setError('Only text in English can be Translated.')
    }
  };

  return (
    <div className="bg-gray-50 rounded-lg p-4 space-y-3">
      <p className="text-gray-800">{message.text}</p>
      <div className="text-sm text-gray-500">Language: {message.language}</div>
      <div className="flex flex-wrap gap-3">
        {showSummarizeButton && (
          <button
            className="px-4 py-2 text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            onClick={handleSummarize}
          >
            Summarize
          </button>
        )}
        <div className="flex gap-2">
          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="px-3 py-2 text-sm bg-white border border-gray-300 rounded-md"
            disabled={isProcessing}
          >
            {languages.map((lang) => (
              <option
                key={lang.code}
                value={lang.code}
              >
                {lang.name}
              </option>
            ))}
          </select>
          <button
            onClick={handleTranslate}
            disabled={isProcessing || message.error}
            className={`px-4 py-2 text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {isProcessing ? "Translating..." : "Translate"}
          </button>
        </div>
      </div>
      {error && <div className="text-sm text-red-500 mt-2">{error}</div>}
      {message.error && (
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
      )}
      {isDownloading && (
        <div className="flex items-center gap-2 text-gray-500">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span className="text-sm">Resource download in Progress...</span>
        </div>
      )}
      {isProcessing && (
        <div className="flex items-center gap-2 text-gray-500">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span className="text-sm">AI is processing...</span>
        </div>
      )}
      {message.summary &&
      !isDownloading &&
      !isProcessing &&
      selectedFeature === "summarize" ? (
        <div className="mt-2 p-3 bg-white rounded border border-gray-200">
          <div className="text-sm font-medium text-gray-500">Summary:</div>
          <p className="text-gray-800">{message.summary}</p>
        </div>
      ) : (
        ""
      )}
      {message.translation &&
      !isDownloading &&
      !isProcessing &&
      selectedFeature === "translate" ? (
        <div className="mt-2 p-3 bg-white rounded border border-gray-200">
          <div className="text-sm font-medium text-gray-500">Translation:</div>
          <p className="text-gray-800">{message.translation}</p>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

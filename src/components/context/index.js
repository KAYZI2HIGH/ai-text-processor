"use client";

import { createContext, useContext, useState } from "react";
import { v4 as uuid } from "uuid";

const AppContext = createContext();

export function AppWrapper({ children }) {
  const [messages, setMessages] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [isProcessing, setIsProcessing] = useState(false);
  const [text, setText] = useState("");
  const [downloadProgress, setDownloadProgress] = useState();
  const [error, setError] = useState('');
  const [detectedLanguage, setDetectedLanguage] = useState()

  const languages = [
    {
      code: "en",
      name: "English",
    },
    {
      code: "pt",
      name: "Portuguese",
    },
    {
      code: "es",
      name: "Spanish",
    },
    {
      code: "ru",
      name: "Russian",
    },
    {
      code: "tr",
      name: "Turkish",
    },
    {
      code: "fr",
      name: "French",
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (text.trim()) {


      if ("ai" in self && "languageDetector" in self.ai) {
        console.log('it works')
        const languageDetectorCapabilities =
          await self.ai.languageDetector.capabilities();
        const canDetect = languageDetectorCapabilities.available;
        let detector;
        if (canDetect === "no") {
          setError(
            "The language detector isn't usable, Please Free up some space."
          );
          setTimeout(() => {
            setError("");
          }, 2000);
        }
        if (canDetect === "readily") {
          // The language detector can immediately be used.
          detector = await self.ai.languageDetector.create();

          const results = await detector.detect(text);

           const userMessageId = uuid()
           const userMessage = {
             id: userMessageId,
             text,
             sender: "user",
             language: results[0].detectedLanguage,
           };
          setMessages((prev) => [...prev, userMessage]);
          setDetectedLanguage(results[0].detectedLanguage);

          

        } else {
          // The language detector can be used after model download.
          const aiErrorMessageId = uuid();

          const aiErrorMessage = {
            id: aiErrorMessageId,
            text: "",
            sender: "ai",
            error: {
              message:
                "Additional resources need to be downloaded for processing this text.",
              action: {
                type: "language-detector",
                label: "Download Detector Pack",
              },
            },
          };
          setMessages((prev) => [...prev, aiErrorMessage]);
        }
      } else {
          setError("The language detector API is not supported.");
          console.log("The Language Detector API is not supported.");
      }


      setText("");
    }
  };

 

  const startDownload = async (label) => {
    if (label === "language-detector") {
      const detector = await self.ai.languageDetector.create({
        monitor(m) {
          m.addEventListener("downloadprogress", (e) => {
            console.log(`Downloaded ${e.loaded} of ${e.total} bytes.`);
            setDownloadProgress((e.loaded / e.total) * 100);
          });
        },
      });
      await detector.ready;
    }
    if (label === 'summarizer') {
      const summarizer = await self.ai.summarizer.create();
      summarizer.addEventListener("downloadprogress", (e) => {
        console.log(e.loaded, e.total);
        setDownloadProgress((e.loaded / e.total) * 100);
      });
      await summarizer.ready;
    }
  };

  return (
    <AppContext.Provider
      value={{
        messages,
        setMessages,
        selectedLanguage,
        setSelectedLanguage,
        isProcessing,
        setIsProcessing,
        text,
        setText,
        languages,
        handleSubmit,
        startDownload,
        downloadProgress,
        setDownloadProgress,
        error,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}

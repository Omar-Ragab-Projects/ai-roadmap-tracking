import { Roadmap } from "@/types/roadmap";
import { GoogleGenAI } from "@google/genai";
import React, { useRef, useState } from "react";

export default function useAI(sessionId: string) {
  const chatSessionRef = useRef<any>(null);
  const ai = new GoogleGenAI({
    apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY || "",
  });

  const [lastAiMessageStream, setLastAiMessageStream] = useState<string>("");
  const [history, setHistory] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const initializeChatSession = () => {
    setLastAiMessageStream("");

    // Get stored history from localStorage
    let storedHistory = localStorage.getItem(`chatHistory-${sessionId}`);
    let parsedHistory: {
      role: string;
      parts: { text: string }[];
    }[] = storedHistory ? JSON.parse(storedHistory) : [];

    if (storedHistory) {
      setHistory((pre) => [...pre, ...parsedHistory]);
    }

    // Initialize chat session
    chatSessionRef.current = ai.chats.create({
      model: process.env.NEXT_PUBLIC_MODEL_VERSION || "gemini-2.5-flash",
      history: parsedHistory,
    });
  };

  async function getAiResponse(
    content: string,
    selectedRoadmap?: Roadmap | null
  ) {
    setIsLoading(true);
    let contentToSend = content;
    let text = "";
    let scrollTimes = 0;
    const maxScrollTimes = 3;
    const lastAiContentElement: HTMLElement | null =
      document.querySelector(".last-ai-content");

    if (selectedRoadmap) {
      contentToSend += `\n\n
      You are an AI learning assistant helping a user based on their selected learning roadmap.
      Provide clear and concise answers to help the user learn effectively.
      with this data: ${JSON.stringify(selectedRoadmap)}.
      `;
    }

    // Add user message to history
    setHistory((pre) => [
      ...pre,
      {
        role: "user",
        parts: [{ text: content }],
      },
    ]);

    // Get AI response as stream
    const response = await chatSessionRef.current.sendMessageStream({
      message: contentToSend,
    });

    for await (const chunk of response) {
      text += chunk.text;

      if (scrollTimes <= maxScrollTimes) {
        lastAiContentElement?.scrollIntoView({
          behavior: "smooth",
        });
      }

      scrollTimes++;

      if (lastAiContentElement) {
        setLastAiMessageStream((pre) => pre + (chunk.text || ""));
      }
    }

    if (lastAiContentElement) {
      setLastAiMessageStream("");
    }

    // Update history with AI response
    const updatedHistory = [
      ...history,
      { role: "user", parts: [{ text: content }] },
      { role: "model", parts: [{ text }] },
    ];

    localStorage.setItem(
      `chatHistory-${sessionId}`,
      JSON.stringify(updatedHistory)
    );
    setHistory(updatedHistory);
    setIsLoading(false);
  }

  return {
    history,
    setHistory,
    isLoading,
    lastAiMessageStream,
    initializeChatSession,
    getAiResponse,
    chatSessionRef,
  };
}

import { Roadmap } from "@/types/roadmap";
import OpenAI from "openai";
import React, { useRef, useState } from "react";

export default function useAI(sessionId: string) {
  const chatSessionRef = useRef<any>(null);
  const ai = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_GROQ_API_KEY || "",
    baseURL: "https://api.groq.com/openai/v1",
    dangerouslyAllowBrowser: true,
  });

  const [lastAiMessageStream, setLastAiMessageStream] = useState<string>("");
  const [history, setHistory] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

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

    // Store history for OpenAI format (no need to create chat session)
    chatSessionRef.current = {
      model: "llama-3.3-70b-versatile",
      history: parsedHistory,
    };
  };

  async function getAiResponse(
    content: string,
    selectedRoadmap?: Roadmap | null
  ) {
    setIsLoading(true);
    setError(null);
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

    try {
      // Convert history to OpenAI format
      const messages: OpenAI.Chat.ChatCompletionMessageParam[] =
        chatSessionRef.current.history.map((msg: any) => ({
          role: msg.role === "model" ? "assistant" : msg.role,
          content: msg.parts[0].text,
        }));

      // Add current user message
      messages.push({
        role: "user",
        content: contentToSend,
      });

      // Get AI response as stream
      const stream = await ai.chat.completions.create({
        model: chatSessionRef.current.model,
        messages,
        stream: true,
      });

      for await (const chunk of stream) {
        const chunkText = chunk.choices[0]?.delta?.content || "";
        text += chunkText;

        if (scrollTimes <= maxScrollTimes) {
          lastAiContentElement?.scrollIntoView({
            behavior: "smooth",
          });
        }

        scrollTimes++;

        if (lastAiContentElement && chunkText) {
          setLastAiMessageStream((pre) => pre + chunkText);
        }
      }
    } catch (error) {
      console.log("Error in AI response:", error);
      setError(error instanceof Error ? error.message : "Unknown error");
      setIsLoading(false);
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

  const clearChatHistory = () => {
    localStorage.removeItem(`chatHistory-${sessionId}`);
    setHistory([]);
    chatSessionRef.current = null;
    initializeChatSession();
  };

  return {
    history,
    setHistory,
    isLoading,
    lastAiMessageStream,
    initializeChatSession,
    getAiResponse,
    chatSessionRef,
    clearChatHistory,
    error,
  };
}

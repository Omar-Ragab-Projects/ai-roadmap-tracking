"use client";
import { GoogleGenAI } from "@google/genai";
import React, { useEffect, useRef, useState } from "react";
import Conversation from "./Conversation";
import ChatForm from "./ChatForm";
const suggestions = [
  "Explain React hooks in simple terms",
  "How do I optimize performance?",
  "What's the best way to manage state?",
];

// interface ChatData {
//   id: number;
//   userContent: string;
//   aiContent: string;
//   aiPendingResponse: boolean;
// }

// const chatDataInitial = [
//   {
//     id: 1,
//     userContent: "",
//     aiContent:
//       "Hello! I'm your AI learning assistant. I can help you understand complex concepts, answer questions about your learning goals, and provide personalized learning recommendations based on your current roadmaps. What would you like to learn about today?",
//     aiPendingResponse: false,
//   },
// ];

export default function ChatArea({
  onClearChat,
}: {
  onClearChat?: (clearFn: () => void) => void;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const chatWrapperRef = useRef<HTMLDivElement>(null);
  const chatSessionRef = useRef<any>(null);

  const ai = new GoogleGenAI({
    apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY || "",
  });

  // const [chatData, setChatData] = useState<ChatData[]>(chatDataInitial);
  const [lastAiContent, setLastAiContent] = useState<string>("");
  const [history, setHistory] = useState<any[]>([]);
  // const historyRef = useRef<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // const isLoading = chatData.some((chat) => chat.aiPendingResponse);

  useEffect(() => {
    if (!chatSessionRef.current) {
      initializeChatSession();
    }

    if (onClearChat) {
      onClearChat(clearChat);
    }
  }, []);

  const initializeChatSession = () => {
    let storedHistory = localStorage.getItem("chatHistory");
    let parsedHistory: {
      role: string;
      parts: { text: string }[];
    }[] = storedHistory ? JSON.parse(storedHistory) : [];

    if (storedHistory) {
      // historyRef.current = parsedHistory;
      setHistory((pre) => [...pre, ...parsedHistory]);
    }

    // scrollToLastMessage();

    chatSessionRef.current = ai.chats.create({
      model: process.env.NEXT_PUBLIC_MODEL_VERSION || "gemini-2.5-flash",
      history: parsedHistory,
    });
  };

  const clearChat = () => {
    // setChatData(chatDataInitial);
    setHistory([]);
    // historyRef.current = [];
    localStorage.removeItem("chatHistory");
    setLastAiContent("");
    initializeChatSession();
  };

  const hitEnterHandler = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (!(e.key === "Enter" && e.shiftKey) && e.key === "Enter") {
      e.preventDefault();
      formRef.current?.requestSubmit();
    }
  };

  const sendAction = async (
    previousState: any,
    formData: FormData
  ): Promise<{ status: "success" | "error"; message: string }> => {
    if (isLoading) {
      return {
        status: "error",
        message: "Please wait for the current response to finish.",
      };
    }

    try {
      setIsLoading(true);
      const userContent = formData.get("userContent") as string;
      if (!userContent) throw new Error("User content cannot be empty.");

      // historyRef.current.push({
      //   role: "user",
      //   parts: [{ text: userContent }],
      // });

      setHistory((pre) => [
        ...pre,
        {
          role: "user",
          parts: [{ text: userContent }],
        },
      ]);

      document
        .querySelector(".user-message:last-child")
        ?.scrollIntoView({ behavior: "smooth" });

      // console.log(document.querySelectorAll(".user-message"));
      // (async () => getAiResponse(userContent))();

      // setChatData((prev) => [
      //   ...prev,
      //   {
      //     id: prev.length + 1,
      //     userContent,
      //     aiContent: "",
      //     aiPendingResponse: true,
      //   },
      // ]);

      return {
        status: "success",
        message: "This is a test response from the AI assistant.",
      };
    } catch (error) {
      setIsLoading(false);
      return {
        status: "error",
        message: "This is a test response from the AI assistant.",
      };
    }
  };

  useEffect(() => {
    scrollToLastMessage();

    if (history.length === 0) return;

    const isLastChatAi = history[history.length - 1].role === "model";
    if (isLastChatAi) return;

    const lastUserChat = history[history.length - 1];
    (async () => getAiResponse(lastUserChat.parts[0].text))();
  }, [history]);

  async function getAiResponse(content: string) {
    const response = await chatSessionRef.current.sendMessageStream({
      message: content,
    });

    let text = "";
    let scrollTimes = 0;
    const maxScrollTimes = 3;

    const lastAiContentElement: HTMLElement | null =
      document.querySelector(".last-ai-content");

    for await (const chunk of response) {
      text += chunk.text;

      if (scrollTimes <= maxScrollTimes) {
        lastAiContentElement?.scrollIntoView({
          behavior: "smooth",
        });
      }
      scrollTimes++;

      if (lastAiContentElement) {
        setLastAiContent((pre) => pre + (chunk.text || ""));
      }
    }

    if (lastAiContentElement) {
      setLastAiContent("");
    }

    // historyRef.current.push({
    //   role: "model",
    //   parts: [{ text }],
    // });

    // const dataToStore = historyRef.current.map((item) => ({
    //   role: item.role,
    //   parts: [{ text: item.parts.join(" ") }],
    // }));
    const updatedHistory = [
      ...history,
      // { role: "user", parts: [{ text: content }] },
      { role: "model", parts: [{ text }] },
    ];
    // historyRef.current = updatedHistory;
    localStorage.setItem("chatHistory", JSON.stringify(updatedHistory));
    setHistory(updatedHistory);
    setIsLoading(false);

    // Update the last chat with the AI response
    // setChatData((prev) =>
    //   prev.map((chat, index) =>
    //     index === prev.length - 1
    //       ? { ...chat, aiContent: text, aiPendingResponse: false }
    //       : chat
    //   )
    // );
  }

  const scrollToLastMessage = () => {
    if (history.length == 0) return;
    const lastChat =
      history[history.findLastIndex((chat) => chat.role === "user")];

    if (lastChat?.role === "user") {
      const messagesElements = document.querySelectorAll(".user-message");
      messagesElements[messagesElements.length - 1]?.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  // console.log("CHAT DATA:", chatData);

  return (
    <section className="mt-10 border border-border rounded-lg shadow-sm">
      <div
        ref={chatWrapperRef}
        className="chat-wrapper flex flex-col gap-10 h-[60vh] overflow-y-auto scroll-bar-styles px-6"
      >
        <Conversation
          chatData={history}
          lastAiContent={lastAiContent}
          loadingAiResponse={isLoading}
        />
      </div>
      <ChatForm
        formRef={formRef}
        hitEnterHandler={hitEnterHandler}
        sendAction={sendAction}
        isLoading={isLoading}
      />
    </section>
  );
}

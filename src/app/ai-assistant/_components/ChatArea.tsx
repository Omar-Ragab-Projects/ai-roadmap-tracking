"use client";
import React, { useEffect, useRef, useState } from "react";
import Conversation from "./Conversation";
import ChatForm from "./ChatForm";
import useAI from "@/hooks/useAI";
// const suggestions = [
//   "Explain React hooks in simple terms",
//   "How do I optimize performance?",
//   "What's the best way to manage state?",
// ];

export default function ChatArea({
  onClearChat,
}: {
  onClearChat?: (clearFn: () => void) => void;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const chatWrapperRef = useRef<HTMLDivElement>(null);

  const {
    history,
    setHistory,
    isLoading,
    lastAiMessageStream,
    initializeChatSession,
    getAiResponse,
    chatSessionRef,
  } = useAI("ai-learning-assistant");

  useEffect(() => {
    if (!chatSessionRef.current) {
      initializeChatSession();
    }

    if (onClearChat) {
      onClearChat(clearChat);
    }
  }, []);

  const clearChat = () => {
    setHistory([]);
    localStorage.removeItem(`chatHistory-${"ai-learning-assistant"}`);
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
    if (isLoading)
      throw new Error("Please wait for the current response to finish.");

    try {
      const userContent = formData.get("userContent") as string;
      if (!userContent) throw new Error("Please enter your message.");

      (async () => getAiResponse(userContent))();

      document
        .querySelector(".user-message:last-child")
        ?.scrollIntoView({ behavior: "smooth" });
      return { status: "success", message: "" };
    } catch (error) {
      return {
        status: "error",
        message:
          error instanceof Error ? error.message : "Something went wrong",
      };
    }
  };

  useEffect(() => {
    scrollToLastMessage();
    if (history.length === 0) return;
  }, [history]);

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

  return (
    <section className="mt-10 border border-border rounded-lg shadow-sm">
      <div
        ref={chatWrapperRef}
        className="chat-wrapper flex flex-col gap-10 h-[60vh] overflow-y-auto scroll-bar-styles px-6"
      >
        <Conversation
          chatData={history}
          lastAiMessageStream={lastAiMessageStream}
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

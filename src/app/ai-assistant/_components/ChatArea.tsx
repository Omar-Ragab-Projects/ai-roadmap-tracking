"use client";
import React, { useEffect, useRef, useState } from "react";
import Conversation from "./Conversation";
import ChatForm from "./ChatForm";
import useAI from "@/hooks/useAI";
import { fetchRoadmapsClient } from "@/utils/entities/roadmaps/client";
import { useQuery } from "@tanstack/react-query";
import { Roadmap } from "@/types/roadmap";
import { actionPromiseResponse } from "@/types/globalTypes";

export default function ChatArea({
  onClearChat,
}: {
  onClearChat?: (clearFn: () => void) => void;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const chatWrapperRef = useRef<HTMLDivElement>(null);

  const { data: roadmaps } = useQuery({
    queryKey: ["roadmaps"],
    queryFn: fetchRoadmapsClient,
  });

  const [selectedRoadmap, setSelectedRoadmap] = useState<Roadmap | null>(null);

  const selectRoadmap = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedRoadmapId = e.target.value;
    const selectedRoadmap =
      roadmaps?.find((roadmap) => roadmap.id == Number(selectedRoadmapId)) ||
      null;

    setSelectedRoadmap(selectedRoadmap);
  };

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
  ): Promise<actionPromiseResponse> => {
    if (isLoading)
      throw new Error("Please wait for the current response to finish.");

    try {
      const userContent = formData.get("userContent") as string;
      if (!userContent) throw new Error("Please enter your message.");

      (async () => getAiResponse(userContent, selectedRoadmap))();

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
        className="chat-wrapper rounded-t-xl flex flex-col gap-10 h-[35vh] lg:h-[60vh] overflow-y-auto scroll-bar-styles px-4 lg:px-6 bg-primary/15"
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
        roadmaps={roadmaps}
        selectRoadmap={selectRoadmap}
      />
    </section>
  );
}

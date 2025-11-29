"use client";

import PageTitle from "@/components/ui/PageTitle";
import ClearChatButton from "./_components/ClearChatButton";
import ChatArea from "./_components/ChatArea";
import { useRef } from "react";

export default function AiAssistantPage() {
  const clearChatFnRef = useRef<(() => void) | null>(null);

  const handleClearChat = (clearFn: () => void) => {
    clearChatFnRef.current = clearFn;
  };

  return (
    <>
      <header className="flex-between">
        <PageTitle
          title="AI Learning Assistant"
          description="Ask questions and get personalized learning guidance"
        />
        <ClearChatButton onClear={() => clearChatFnRef.current?.()} />
      </header>

      <ChatArea onClearChat={handleClearChat} />
    </>
  );
}

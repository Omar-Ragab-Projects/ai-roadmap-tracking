import ReactMarkdown from "react-markdown";
import { ChatDataTypes } from "@/lib/types";

export default function Conversation({
  chatData,
  lastAiContent,
}: {
  chatData: ChatDataTypes[];
  lastAiContent: string;
}) {
  return (
    <div>
      {chatData.map((chat, index) => {
        const isLastChat = index === chatData.length - 1;
        return (
          <div key={chat.id}>
            {chat.userContent && (
              <div className="mt-8 px-6 py-2 w-fit max-w-[90%] whitespace-break-spaces rounded-lg border-border border bg-muted shadow-sm">
                {chat.userContent}
              </div>
            )}

            <div
              className={`${
                isLastChat && chat.aiPendingResponse ? "last-ai-content" : ""
              } p-4 rounded-lg lg:max-w-[900px] mt-2 whitespace-break-spaces`}
            >
              <ReactMarkdown
                components={{
                  p: "span",
                }}
              >
                {isLastChat && chat.aiPendingResponse
                  ? lastAiContent || chat.aiContent
                  : chat.aiContent}
              </ReactMarkdown>
            </div>

            {chat.aiPendingResponse && (
              <div className="ms-4 mb-4 h-4 w-4 border-2 border-dashed border-primary rounded-full animate-spin" />
            )}
          </div>
        );
      })}
    </div>
  );
}

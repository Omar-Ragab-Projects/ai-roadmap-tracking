import ReactMarkdown from "react-markdown";
import { ChatDataTypes, chatTypes } from "@/lib/types";
import { get } from "http";

export default function Conversation({
  chatData,
  lastAiContent,
  loadingAiResponse,
}: {
  chatData: chatTypes[];
  lastAiContent: string;
  loadingAiResponse?: boolean;
}) {
  const getTextFromParts = (parts: chatTypes["parts"]) => {
    return parts.map((part) => part.text).join(" ");
  };
  return (
    <div className="mt-8">
      {chatData.map((chat, index) => {
        const isUserMessage = chat.role === "user";
        const isAiMessage = chat.role === "model";

        if (isUserMessage)
          return (
            <div key={index} className="user-message">
              {isUserMessage && getTextFromParts(chat.parts) && (
                <div className="mt-6 px-6 py-2 w-fit max-w-[90%] whitespace-break-spaces rounded-lg border-border border bg-muted shadow-sm">
                  {getTextFromParts(chat.parts)}
                </div>
              )}
            </div>
          );

        if (isAiMessage)
          return (
            <div key={index}>
              <div
                className={` p-4 rounded-lg lg:max-w-[900px] mt-2 whitespace-break-spaces`}
              >
                <ReactMarkdown
                  components={{
                    p: "span",
                  }}
                >
                  {getTextFromParts(chat.parts)}
                </ReactMarkdown>
              </div>
            </div>
          );
      })}

      {loadingAiResponse && (
        <div>
          <div
            className={`${
              loadingAiResponse ? "" : ""
            } p-4 rounded-lg lg:max-w-[900px] mt-2 whitespace-break-spaces last-ai-content`}
          >
            <ReactMarkdown
              components={{
                p: "span",
              }}
            >
              {lastAiContent}
            </ReactMarkdown>
          </div>
        </div>
      )}

      <>
        {loadingAiResponse && (
          <div className="ms-4 mb-6 mt-4 h-4 w-4 border-2 border-dashed border-primary rounded-full animate-spin" />
        )}
      </>
    </div>
  );
}

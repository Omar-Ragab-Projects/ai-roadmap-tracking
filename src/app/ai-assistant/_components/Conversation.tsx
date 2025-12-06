import ReactMarkdown from "react-markdown";
import { chatTypes } from "@/lib/types";
import ResponseMarkdown from "@/components/global/ai/ResponseMarkdown";

export default function Conversation({
  chatData,
  lastAiMessageStream,
  loadingAiResponse,
}: {
  chatData: chatTypes[];
  lastAiMessageStream: string;
  loadingAiResponse?: boolean;
}) {
  const getTextFromParts = (parts: chatTypes["parts"]) => {
    return parts.map((part) => part.text).join(" ");
  };
  return (
    <div className="mt-8">
      {!chatData.length && (
        <p className="text-center text-muted-foreground/40 text-sm">
          Start the conversation by typing your message below.
        </p>
      )}
      {chatData.map((chat, index) => {
        const isUserMessage = chat.role === "user";
        const isAiMessage = chat.role === "model";

        if (isUserMessage)
          return (
            <div key={index} className="user-message">
              {isUserMessage && getTextFromParts(chat.parts) && (
                <div className="mt-6 px-6 py-2 w-fit max-w-[90%] whitespace-pre-wrap rounded-lg border-border border bg-muted shadow-sm">
                  {getTextFromParts(chat.parts)}
                </div>
              )}
            </div>
          );

        if (isAiMessage)
          return (
            <div key={index}>
              <ResponseMarkdown className="mt-2 p-4 lg:max-w-[90%]  ">
                {getTextFromParts(chat.parts)}
              </ResponseMarkdown>
            </div>
          );
      })}

      {loadingAiResponse && (
        <div>
          <div
            className={`${
              loadingAiResponse ? "" : ""
            } p-4 rounded-lg lg:max-w-[90%] mt-2 whitespace-break-spaces last-ai-content`}
          >
            <ReactMarkdown
              components={{
                p: "span",
              }}
            >
              {lastAiMessageStream}
            </ReactMarkdown>
          </div>
        </div>
      )}

      <>{loadingAiResponse && <div className="ai-loading" />}</>
    </div>
  );
}

import FormProvider from "@/components/global/form/FormProvider";
import Button from "@/components/ui/Button";
import { Send } from "lucide-react";
import { Ref, RefObject } from "react";

export default function ChatForm({
  formRef,
  hitEnterHandler,
  sendAction,
  isLoading,
}: {
  formRef: Ref<HTMLFormElement> | undefined;
  hitEnterHandler: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  sendAction: (
    previousState: any,
    formData: FormData
  ) => Promise<{ status: "success" | "error"; message: string }>;
  isLoading: boolean;
}) {
  return (
    <FormProvider
      ref={formRef}
      action={sendAction}
      className="border border-border rounded-xl"
    >
      <textarea
        className="ai-chat-textarea"
        placeholder="Ask a question..."
        onKeyDown={hitEnterHandler}
        name="userContent"
      />
      <div className="px-4 pb-4 flex-between">
        <div className="flex items-baseline gap-4">
          <Button
            type="submit"
            className="relative group"
            Icon={isLoading ? undefined : Send}
          >
            {isLoading ? (
              <>
                <span className="text-xs opacity-50 animate-pulse">
                  Thinking...
                </span>
              </>
            ) : (
              <>
                Send <span className="text-xs opacity-70 ">(Enter)</span>{" "}
              </>
            )}
          </Button>
          <span className="text-[10px] text-text opacity-70">
            {process.env.NEXT_PUBLIC_MODEL_VERSION}
          </span>
        </div>

        <div>
          <select name="roadmap" id="">
            <option value="">Default (Not specific roadmap)</option>
            <option value="option2">Learning Roadmap 2</option>
            <option value="option3">Learning Roadmap 3</option>
          </select>
        </div>
      </div>
    </FormProvider>
  );
}

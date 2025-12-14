import FormProvider from "@/components/global/form/FormProvider";
import Button from "@/components/ui/Button";
import { actionPromiseResponse } from "@/types/globalTypes";
import { Roadmap } from "@/types/roadmap";
import { Send } from "lucide-react";
import { Ref } from "react";

export default function ChatForm({
  formRef,
  hitEnterHandler,
  sendAction,
  isLoading,
  roadmaps,
  selectRoadmap,
}: {
  formRef: Ref<HTMLFormElement> | undefined;
  hitEnterHandler: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  sendAction: (
    previousState: any,
    formData: FormData
  ) => Promise<actionPromiseResponse>;
  isLoading: boolean;
  roadmaps: Roadmap[] | undefined;
  selectRoadmap: (e: React.ChangeEvent<HTMLSelectElement>) => void;
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
          <select form="" name="roadmap" id="" onChange={selectRoadmap}>
            <option value="">Default (Not specific roadmap)</option>
            {roadmaps?.map((roadmap) => (
              <option key={roadmap.id} value={roadmap.id}>
                {roadmap.title}
              </option>
            ))}
          </select>
        </div>
      </div>
    </FormProvider>
  );
}

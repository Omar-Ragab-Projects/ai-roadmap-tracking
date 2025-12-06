"use client";
import ResponseMarkdown from "@/components/global/ai/ResponseMarkdown";
import FormProvider from "@/components/global/form/FormProvider";
import GoalPriority from "@/components/global/goal/GoalPriority";
import Button from "@/components/ui/Button";
import ConfirmButton from "@/components/ui/ConfirmButton";
import useAI from "@/hooks/useAI";
import useRender from "@/hooks/useRender";
import { Roadmap } from "@/types/roadmap";
import { RotateCcw, SaveAll, Sparkles, X } from "lucide-react";
import React, {
  startTransition,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import ReactMarkdown from "react-markdown";

export default function RoadmapGenerator() {
  const formRef = useRef<HTMLFormElement>(null);
  const roadmapDataRef = useRef<HTMLDivElement>(null);
  const render = useRender();
  const [generatedRoadmapData, setGeneratedRoadmapData] =
    useState<Roadmap | null>(null);

  const {
    history,
    isLoading,
    initializeChatSession,
    getAiResponse,
    chatSessionRef,
    clearChatHistory,
  } = useAI("ai-roadmap-generator");

  useEffect(() => {
    if (!chatSessionRef.current) initializeChatSession();
  }, []);

  const hitEnterHandler = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (!(e.key === "Enter" && e.shiftKey) && e.key === "Enter") {
      e.preventDefault();
      formRef.current?.requestSubmit();
    }
  };

  const generateAction = async (
    previousState: any,
    formData: FormData
  ): Promise<{ status: "success" | "error"; message: string }> => {
    if (isLoading)
      throw new Error("Please wait for the current response to finish.");

    try {
      clearChatHistory();
      let userContent = formData.get("userContent") as string;
      if (!userContent) throw new Error("Please enter your message.");

      userContent += `\n\n
      You are an AI who will generate a structured learning roadmap based on the user's input
      and into each goal description if you could send references like courses URLs.
      If the user content is vague, send response asking for clarification in normal string type. else,
      I want you to give me the data in JSON format only, with the following structure:
      {
        title: string;
        description: string;
        goals: {
          name: string;
          description: string;
          priority: "high" | "medium" | "low";
          status: "todo";
        }[];
      }.
      `;

      (async () => getAiResponse(userContent))();

      return { status: "success", message: "" };
    } catch (error) {
      return {
        status: "error",
        message:
          error instanceof Error ? error.message : "Something went wrong",
      };
    }
  };

  // This function extracts the generated roadmap from the AI response
  // and returns it in a structured format.
  // If the response is not in the expected format, it returns an error message.
  const generatedRoadmap = useMemo(() => {
    if (history.length === 0 || isLoading) return null;
    const aiResponse = history[history.length - 1]?.parts[0]?.text || "";
    const generatedJSON = aiResponse.match(/`{3}json([\s\S]*?)`{3}/)?.[1];

    if (generatedJSON) {
      return { tryAgain: false, data: JSON.parse(generatedJSON) };
    } else {
      return { tryAgain: true, message: aiResponse };
    }
  }, [history, isLoading]);

  // When the generatedRoadmap changes, update the generatedRoadmapData state
  useEffect(() => {
    if (generatedRoadmap?.data) {
      setGeneratedRoadmapData(generatedRoadmap.data);
      setTimeout(() => {
        roadmapDataRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 300);
    }
  }, [generatedRoadmap]);

  // Function to delete a goal from the generated roadmap
  const deleteGoal = (index: number) => {
    if (!generatedRoadmapData) return;

    const updatedGoals = generatedRoadmapData.goals?.filter(
      (_, i) => i !== index
    );

    const updatedRoadmapData = {
      ...generatedRoadmapData,
      goals: updatedGoals,
    };

    setGeneratedRoadmapData(updatedRoadmapData);
    return { status: "success", message: "Goal deleted successfully." };
  };

  return (
    <section>
      <div className="card mt-10">
        {/* Header */}
        <div>
          <h2 className="font-semibold text-lg">What do you want to learn?</h2>
          <p>
            Describe your learning goal and AI will create a structured roadmap
          </p>
        </div>
        {/* Input & Button */}
        <FormProvider ref={formRef} action={generateAction} className="mt-6">
          <textarea
            className="bg-primary/5 p-3 placeholder:text-sm"
            placeholder="e.g., React for building interactive web apps, or Full-stack development with Next.js..."
            onKeyDown={hitEnterHandler}
            name="userContent"
          />
          <Button
            type="submit"
            Icon={Sparkles}
            className="mt-3 text-sm"
            disabled={isLoading}
          >
            {isLoading ? "Generating Roadmap..." : "Generate Roadmap"}
          </Button>
        </FormProvider>
      </div>

      <div className="card mt-6 " ref={roadmapDataRef}>
        {!generatedRoadmapData && (
          <h3 className="font-semibold text-lg mb-2">Generated Roadmap</h3>
        )}
        {!render && <div className="ai-loading" />}

        {!generatedRoadmap && render && !generatedRoadmapData && (
          <p className="text-text">Your generated roadmap will appear here.</p>
        )}

        {generatedRoadmap?.tryAgain ? (
          <div className="text-text whitespace-pre-wrap">
            <ReactMarkdown
              components={{
                p: "span",
              }}
            >
              {generatedRoadmap?.message}
            </ReactMarkdown>
          </div>
        ) : (
          generatedRoadmapData && (
            <div>
              <div className="flex-between">
                {/* Title & Description */}
                <div className="max-w-[80%]">
                  <h4 className="font-semibold text-lg">
                    {generatedRoadmapData.title}
                  </h4>
                  <p>{generatedRoadmapData.description}</p>
                </div>
                {/* Save & Reset */}
                <div className="flex gap-2">
                  <Button
                    onClick={() => {
                      clearChatHistory();
                      setGeneratedRoadmapData(null);
                    }}
                    Icon={RotateCcw}
                    variant="ghost"
                  >
                    Reset
                  </Button>
                  <Button Icon={SaveAll}>Save</Button>
                </div>
              </div>
              {/* Goals */}
              <ul className="generated-goals-wrapper mt-6 flex flex-col gap-1">
                {generatedRoadmapData.goals?.map((goal, index) => (
                  <li
                    data-delay={index * 200}
                    key={index}
                    className="mb-2 relative whitespace-pre-line text-wrap flex-between bg-primary/6 border border-border p-3 rounded-lg shadow-sm "
                  >
                    <ConfirmButton
                      className="absolute top-2 right-2 hover:text-red-500 transition-all cursor-pointer"
                      message="Remove this goal?"
                      onConfirm={() => deleteGoal(index)}
                    >
                      <X className="" />
                    </ConfirmButton>
                    <div className="max-w-[70%]">
                      <h5 className="font-semibold">{goal.name}</h5>
                      <ResponseMarkdown className="mt-2 text-text text-sm">
                        {goal.description || ""}
                      </ResponseMarkdown>
                    </div>
                    <GoalPriority priority={goal.priority} className="" />
                  </li>
                ))}
              </ul>
            </div>
          )
        )}
      </div>
    </section>
  );
}

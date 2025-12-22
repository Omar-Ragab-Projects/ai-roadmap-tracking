"use client";
import FormProvider from "@/components/global/form/FormProvider";
import XOGame from "@/components/global/XO/XOGame";
import Button from "@/components/ui/Button";
import Dialog from "@/components/ui/Dialog";
import useAI from "@/hooks/useAI";
import useRender from "@/hooks/useRender";
import { actionPromiseResponse } from "@/types/globalTypes";
import { Roadmap } from "@/types/roadmap";
import { Check, LoaderCircle, Sparkles, X } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import GeneratedRoadmap from "./GeneratedRoadmap";

const SAMPLE_SUGGESTIONS = [
  "React Development",
  "Next.js Full Stack",
  "TypeScript",
  "Web Design",
  "Node.js Backend",
  "Database Design",
];

export default function RoadmapGenerator() {
  const formRef = useRef<HTMLFormElement>(null);
  const roadmapDataRef = useRef<HTMLDivElement>(null);
  const render = useRender();
  const [generatedRoadmapData, setGeneratedRoadmapData] =
    useState<Roadmap | null>(null);
  const [startGeneration, setStartGeneration] = useState(false);

  const {
    history,
    isLoading,
    initializeChatSession,
    getAiResponse,
    chatSessionRef,
    clearChatHistory,
    error,
  } = useAI("ai-roadmap-generator");

  useEffect(() => {
    if (isLoading) setStartGeneration(true);
  }, [isLoading]);

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
  ): Promise<actionPromiseResponse> => {
    if (isLoading)
      throw new Error("Please wait for the current response to finish.");

    try {
      clearChatHistory();
      let userContent = formData.get("userContent") as string;

      userContent += `\n\n
      You are an AI who will generate a structured learning roadmap based on the user's input
      and into each goal description if you could send references like courses URLs and make it accessable in markdown.
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
      // if (!userContent) throw new Error("Please enter your message.");

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

  const resetRoadmapData = () => {
    setGeneratedRoadmapData(null);
    clearChatHistory();
  };

  const closeXOGame = () => {
    setStartGeneration(false);
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
            required
          />
          <Button
            type="submit"
            Icon={Sparkles}
            className="mt-3 text-sm"
            loading={isLoading}
          >
            {isLoading ? "Generating Roadmap..." : "Generate Roadmap"}
          </Button>
        </FormProvider>

        <Dialog
          open={startGeneration && !generatedRoadmap?.tryAgain}
          onClose={closeXOGame}
        >
          <div
            className={`flex items-center gap-2  p-4 rounded-md ${
              isLoading ? "bg-primary/10" : "bg-secondary/25"
            }`}
          >
            <div>
              {isLoading ? (
                <LoaderCircle className="animate-spin" size={14} />
              ) : (
                <Check className="mr-2 text-secondary/75" />
              )}
            </div>
            <span className="text-sm text-black/70">
              {isLoading ? "Generating Roadmap..." : "Roadmap is ready."}
            </span>
          </div>

          <h3 className="mt-12 text-center">Have a break and play X|O</h3>
          <XOGame onFinish={closeXOGame} />
        </Dialog>

        <div className="mt-4">
          <span className="text-text text-sm">
            Or try one of these suggestions:
          </span>
          <ul className="mt-1">
            {SAMPLE_SUGGESTIONS.map((suggestion, index) => (
              <li
                key={index}
                className="cursor-pointer text-black text-xs bg-primary/10 inline-block mr-2 mt-2 px-3 py-2 rounded-full hover:bg-primary/20 transition"
                onClick={() => {
                  if (formRef.current) {
                    formRef.current.userContent.value = suggestion;
                  }
                }}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="card mt-6 " ref={roadmapDataRef}>
        {!generatedRoadmapData && (
          <h3 className="font-semibold text-lg mb-2">Generated Roadmap</h3>
        )}
        {!render && <div className="ai-loading" />}

        {!generatedRoadmap?.message && render && !generatedRoadmapData && (
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
            <GeneratedRoadmap
              generatedRoadmapData={generatedRoadmapData}
              resetRoadmapData={resetRoadmapData}
              deleteGoal={deleteGoal}
            />
          )
        )}
        {error && <div className="text-text text-sm mt-4">Error: {error}</div>}
      </div>
    </section>
  );
}

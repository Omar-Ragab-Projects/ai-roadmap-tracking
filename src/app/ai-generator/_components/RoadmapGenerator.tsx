"use client";
import FormProvider from "@/components/global/form/FormProvider";
import Button from "@/components/ui/Button";
import Loader from "@/components/ui/Loader";
import useAI from "@/hooks/useAI";
import useRender from "@/hooks/useRender";
import { Sparkles } from "lucide-react";
import React, { useEffect, useRef } from "react";

export default function RoadmapGenerator() {
  const formRef = useRef<HTMLFormElement>(null);
  const render = useRender();

  const {
    history,
    setHistory,
    isLoading,
    lastAiMessageStream,
    initializeChatSession,
    getAiResponse,
    chatSessionRef,
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
      setHistory([]);
      let userContent = formData.get("userContent") as string;
      if (!userContent) throw new Error("Please enter your message.");

      userContent += `\n\n
      You are an AI who will generate a structured learning roadmap based on the user's input.
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

      // document
      //   .querySelector(".user-message:last-child")
      //   ?.scrollIntoView({ behavior: "smooth" });

      return { status: "success", message: "" };
    } catch (error) {
      return {
        status: "error",
        message:
          error instanceof Error ? error.message : "Something went wrong",
      };
    }
  };

  const generatedRoadmap = () => {
    if (history.length === 0 || isLoading) return null;
    const aiResponse = history[history.length - 1]?.parts[0]?.text || "";
    const generatedJSON = aiResponse.match(/`{3}json([\s\S]*?)`{3}/)?.[1];

    if (generatedJSON) {
      return { tryAgain: false, data: JSON.parse(generatedJSON) };
    } else {
      return { tryAgain: true, message: aiResponse };
    }
  };

  console.log(generatedRoadmap());
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

      {/* {generatedRoadmap() && ( */}
      <div className="card mt-6 ">
        <h3 className="font-semibold text-lg mb-2">Generated Roadmap</h3>
        {!render && <div className="ai-loading" />}

        {!generatedRoadmap() && render && (
          <p className="text-text">Your generated roadmap will appear here.</p>
        )}

        {generatedRoadmap()?.tryAgain ? (
          <p className="text-text">{generatedRoadmap()?.message}</p>
        ) : (
          <pre>{JSON.stringify(generatedRoadmap()?.data, null, 2)}</pre>
        )}
      </div>
      {/* )} */}
    </section>
  );
}

import ResponseMarkdown from "@/components/global/ai/ResponseMarkdown";
import FormProvider from "@/components/global/form/FormProvider";
import SubmitButton from "@/components/global/form/SubmitButton";
import GoalPriority from "@/components/global/goal/GoalPriority";
import Button from "@/components/ui/Button";
import ConfirmButton from "@/components/ui/ConfirmButton";
import { Roadmap } from "@/types/roadmap";
import { saveRoadmapAction } from "@/utils/entities/roadmaps/server";
import { RotateCcw, SaveAll, X } from "lucide-react";
import { useRouter } from "next/navigation";

export default function GeneratedRoadmap({
  generatedRoadmapData,
  resetRoadmapData,
  deleteGoal,
}: {
  generatedRoadmapData: Roadmap;
  resetRoadmapData: () => void;
  deleteGoal: (
    index: number
  ) => { status: string; message: string } | undefined;
}) {
  const router = useRouter();
  return (
    <div>
      <div className="flex-between max-lg:flex-wrap gap-4">
        {/* Title & Description */}
        <div className="lg:max-w-[80%]">
          <h4 className="font-semibold text-lg">
            {generatedRoadmapData.title}
          </h4>
          <p>{generatedRoadmapData.description}</p>
        </div>
        {/* Save & Reset */}
        <div className="flex max-lg:flex-1 justify-stretch gap-2">
          <Button onClick={resetRoadmapData} Icon={RotateCcw} variant="ghost">
            Reset
          </Button>
          <FormProvider
            className="flex-1"
            action={saveRoadmapAction}
            onSuccess={(payload) => {
              resetRoadmapData();
              router.push(`/roadmaps/${payload.id}`);
            }}
            hiddenFields={[
              {
                name: "roadmapData",
                value: JSON.stringify(generatedRoadmapData),
              },
            ]}
          >
            <SubmitButton className="w-full" Icon={SaveAll}>
              Save
            </SubmitButton>
          </FormProvider>
        </div>
      </div>
      {/* Goals */}
      <ul className="generated-goals-wrapper mt-6 flex flex-col gap-1">
        {generatedRoadmapData.goals?.map((goal, index) => (
          <li
            data-delay={index * 200}
            key={index}
            className="mb-2 relative whitespace-pre-line text-wrap flex-between max-lg:flex-wrap bg-primary/6 border border-border p-3 rounded-lg shadow-sm "
          >
            <ConfirmButton
              className="absolute top-2 right-2 hover:text-red-500 transition-all cursor-pointer"
              message="Remove this goal?"
              onConfirm={() => deleteGoal(index)}
            >
              <X className="" />
            </ConfirmButton>
            <div className="lg:max-w-[70%]">
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
  );
}

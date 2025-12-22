import BackTo from "@/components/ui/BackTo";
import { fetchRoadmapCache } from "@/utils/entities/roadmaps/server";
import AddGoalButton from "./_components/add-goal/AddGoalButton";
import GoalsList from "./_components/GoalsList";
import { redirect } from "next/navigation";
import { Roadmap } from "@/types/roadmap";
import GoalsProgressBar from "../_components/GoalsProgressBar";
import GoalsContextProvider from "./context/GoalsContextProvider";
import UpdatingGoalsIndicator from "./_components/UpdatingGoalsIndicator";
import MobileGoalsList from "./_components/MobileGoalsList";

export default async function RoadmapPage({
  params,
}: {
  params: Promise<{ roadmapId: string }>;
}) {
  const roadmapId = (await params).roadmapId;
  const roadmap: Roadmap = await fetchRoadmapCache(roadmapId);
  if (!roadmap?.id) redirect("/roadmaps");

  return (
    <div>
      <GoalsContextProvider>
        {/* Header */}
        <span className="mb-8 block note xl:hidden">
          You can try drag and drop to reorder goals on desktop.
        </span>
        <div className="flex-between flex-col xl:flex-row gap-8 lg:gap-12">
          <div className="flex-1 flex-center flex-col lg:flex-row items-start lg:items-center w-full justify-start gap-6">
            <BackTo href="/roadmaps" />
            <div className="max-w-[600px] text-center md:text-left w-full md:w-auto">
              <h1 className="text-3xl text-foreground font-bold">
                {roadmap.title}
              </h1>
              <p className="text-text mt-2">{roadmap.description || "-"}</p>
            </div>
          </div>
          <div className="flex-1 flex max-lg:flex-wrap items-center lg:items-end gap-8 lg:gap-6 p-4 lg:p-0 border-t border-b lg:border-b-0 lg:border-t-0 border-black/10 w-full lg:w-auto lg:justify-end">
            <UpdatingGoalsIndicator roadmap={roadmap} />
            <GoalsProgressBar roadmap={roadmap} />
            <AddGoalButton roadmapId={roadmap.id} />
          </div>
        </div>
        {/* Website Goals List */}
        <GoalsList roadmap={roadmap} />
        {/* Mobile Goals List */}
        <MobileGoalsList roadmap={roadmap} />
      </GoalsContextProvider>
    </div>
  );
}

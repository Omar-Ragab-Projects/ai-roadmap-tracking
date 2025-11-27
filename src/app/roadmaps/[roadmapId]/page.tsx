import BackTo from "@/components/ui/BackTo";
import { fetchRoadmapCache } from "@/utils/entities/roadmaps/server";
import AddGoalButton from "./_components/add-goal/AddGoalButton";
import GoalsList from "./_components/GoalsList";
import { redirect } from "next/navigation";
import { Roadmap } from "@/types/roadmap";
import GoalsProgressBar from "../_components/GoalsProgressBar";
import GoalsContextProvider from "./context/GoalsContextProvider";
import UpdatingGoalsIndicator from "./_components/UpdatingGoalsIndicator";

export default async function RoadmapPage({
  params,
}: {
  params: Promise<{ roadmapId: string }>;
}) {
  const roadmapId = (await params).roadmapId;
  const roadmap: Roadmap = await fetchRoadmapCache(roadmapId);
  if (!roadmap) redirect("/roadmaps");

  return (
    <div>
      <GoalsContextProvider>
        {/* Header */}
        <div className="flex-between">
          <div className="flex-center gap-6">
            <BackTo href="/roadmaps" />
            <div>
              <h1 className="text-3xl text-foreground font-bold">
                {roadmap.title}
              </h1>
              <p className="text-text">{roadmap.description || "-"}</p>
            </div>
          </div>
          <div className="flex items-end gap-6">
            <UpdatingGoalsIndicator roadmap={roadmap} />
            <GoalsProgressBar roadmap={roadmap} />
            <AddGoalButton roadmapId={roadmap.id} />
          </div>
        </div>
        {/* Goals */}
        <GoalsList roadmap={roadmap} />
      </GoalsContextProvider>
    </div>
  );
}

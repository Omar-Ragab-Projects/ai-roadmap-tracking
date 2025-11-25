import BackTo from "@/components/ui/BackTo";
import Button from "@/components/ui/Button";
import { fetchRoadmap } from "@/utils/entities/roadmaps/server";
import { ArrowLeft, Plus } from "lucide-react";
import React from "react";
import AddGoalButton from "./_components/AddGoalButton";

export default async function RoadmapPage({
  params,
}: {
  params: Promise<{ roadmapId: string }>;
}) {
  const roadmapId = (await params).roadmapId;
  const roadmap = await fetchRoadmap(roadmapId);

  console.log(roadmap);
  return (
    <div>
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
        <AddGoalButton roadmapId={roadmap.id} />
      </div>
      {/* Goals */}
    </div>
  );
}

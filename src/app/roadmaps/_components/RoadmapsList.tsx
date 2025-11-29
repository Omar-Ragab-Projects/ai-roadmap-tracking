"use client";
import Button from "@/components/ui/Button";
import ConfirmButton from "@/components/ui/ConfirmButton";
import { Roadmap } from "@/types/roadmap";
import { fetchRoadmapsClient } from "@/utils/entities/roadmaps/client";
import { deleteRoadmapAction } from "@/utils/entities/roadmaps/server";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, ArrowRight, Loader2, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import EditRoadmapForm from "./EditRoadmapForm";
import GoalsProgressBar from "./GoalsProgressBar";
import Loader from "@/components/ui/Loader";

export default function RoadmapsList() {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["roadmaps"],
    queryFn: fetchRoadmapsClient,
  });
  const [editRoadmap, setEditRoadmap] = useState<number | null>(null);
  const showEditRoadmap = (roadmapId: number) => setEditRoadmap(roadmapId);
  const hideEditRoadmap = () => setEditRoadmap(null);

  if (error) return <div>Error loading roadmaps.</div>;

  const roadmaps: Roadmap[] = data || [];

  if (isLoading) return <Loader />;

  if (roadmaps.length === 0)
    return (
      <div className="w-full h-[300px] flex-center text-primary font-bold tracking-widest text-xs">
        No roadmaps found.
      </div>
    );

  return (
    <ul className="grid md:grid-cols-2 gap-8 mt-10">
      {roadmaps.map((roadmap, index) => (
        <li className="card group" key={roadmap.id}>
          {/* Roadmap Card Header */}
          <div className="flex-between">
            {/* Title & Description */}
            {editRoadmap === roadmap.id ? (
              <EditRoadmapForm
                roadmap={roadmap}
                onSuccess={() => {
                  hideEditRoadmap();
                  refetch();
                }}
              />
            ) : (
              <div>
                <h3>{roadmap.title}</h3>
                <p>{roadmap.description || "-"}</p>
              </div>
            )}
            {/* Controllers */}
            <div className="flex-center gap-2">
              {editRoadmap != roadmap.id && (
                <Pencil
                  onClick={() => showEditRoadmap(roadmap.id)}
                  size={14}
                  className="opacity-0 group-hover:opacity-100 cursor-pointer w-7 h-7 p-1 text-primary/75 hover:text-primary transition"
                />
              )}
              <ConfirmButton
                onConfirm={deleteRoadmapAction}
                onSuccess={refetch}
                confirmTitle="Delete"
                values={{
                  roadmapId: roadmap.id,
                }}
              >
                <Trash2
                  size={14}
                  className="opacity-0 group-hover:opacity-100 cursor-pointer w-7 h-7 p-1 text-red-400 hover:text-red-500 transition"
                />
              </ConfirmButton>
            </div>
          </div>
          <GoalsProgressBar roadmap={roadmap} />
          {/* Goals Count */}
          <div className="flex gap-4 mt-3">
            <span className="text-sm text-text">
              Goals:{" "}
              <b className="text-primary">{roadmap.goals?.length || 0}</b>
            </span>
            <span className="text-sm text-text">
              Completed:{" "}
              <b className="text-secondary">
                {roadmap.goals?.filter((goal) => goal.status == "done")
                  .length || 0}
              </b>
            </span>
          </div>
          {/* View Goals */}
          <Button
            href={`/roadmaps/${roadmap.id}`}
            Icon={ArrowRight}
            title={"View Goals"}
            className="w-fit ms-auto mt-4 flex-row-reverse"
          />
        </li>
      ))}
    </ul>
  );
}

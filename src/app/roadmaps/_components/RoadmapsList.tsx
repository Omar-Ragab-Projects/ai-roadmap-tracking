"use client";

import FormProvider from "@/components/global/form/FormProvider";
import SubmitButton from "@/components/global/form/SubmitButton";
import Button from "@/components/ui/Button";
import ConfirmButton from "@/components/ui/ConfirmButton";
import { Roadmap } from "@/types/roadmap";
import { fetchRoadmaps } from "@/utils/entities/roadmaps/client";
import {
  deleteRoadmapAction,
  updateRoadmapAction,
} from "@/utils/entities/roadmaps/server";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Loader2, Pencil, Save, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import EditRoadmapForm from "./EditRoadmapForm";

export default function RoadmapsList() {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["roadmaps"],
    queryFn: fetchRoadmaps,
  });
  const [editRoadmap, setEditRoadmap] = useState<number | null>(null);
  const showEditRoadmap = (roadmapId: number) => setEditRoadmap(roadmapId);
  const hideEditRoadmap = () => setEditRoadmap(null);

  if (error) return <div>Error loading roadmaps.</div>;

  const roadmaps: Roadmap[] = data?.data || [];
  const completedPercent = 70;
  console.log(roadmaps);

  if (isLoading)
    return (
      <div className="w-full h-[300px] flex-center">
        <Loader2 size={26} className="animate-spin text-primary" />
      </div>
    );

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
          {/* Progress Bar */}
          <div className="mt-6">
            {/* Percentage Count */}
            <div className="flex-between">
              <span className="text-sm text-foreground">Progress</span>
              <span className="text-primary font-bold">
                {completedPercent}%
              </span>
            </div>
            {/* Percentage Bar */}
            <div className="relative h-4 rounded-full bg-muted mt-2">
              <span
                className={`absolute percentage-bar left-0 h-full transition-all rounded-full bg-linear-to-r from-primary to-secondary`}
                style={{
                  width: `${completedPercent}%`,
                }}
              />
            </div>
            {/* Goals Count */}
            <div className="flex gap-4 mt-3">
              <span className="text-sm text-text">
                Goals: <b className="text-primary">5</b>
              </span>
              <span className="text-sm text-text">
                Completed: <b className="text-secondary">1</b>
              </span>
            </div>
          </div>
          {/* View Goals */}
          <Link href={`/roadmaps/${roadmap.id}`}>
            <Button
              Icon={ArrowLeft}
              title={"View Goals"}
              className="w-[200px] ms-auto mt-4"
            />
          </Link>
        </li>
      ))}
    </ul>
  );
}

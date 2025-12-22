"use client";
import { Roadmap } from "@/types/roadmap";
import { isMobile } from "@/utils/common";
import { useRouter } from "next/navigation";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

export default function ChartSection({ roadmaps }: { roadmaps: Roadmap[] }) {
  const router = useRouter();

  const data = roadmaps.map((roadmap) => ({
    name: roadmap.title,
    total: roadmap.goals?.length || 0,
    completed:
      roadmap.goals?.filter((goal) => goal.status == "done").length || 0,
  }));

  const redirectToRoadmapByIndex = (index: number) => {
    if (index === undefined || index === null) return;
    const roadmap = roadmaps[index];
    if (roadmap) {
      router.push(`/roadmaps/${roadmap.id}`);
    }
  };

  return (
    <div className="card min-h-[380px]">
      <h3>Active Roadmaps</h3>
      <p>Goals by roadmap</p>
      <BarChart
        style={{
          marginLeft: "auto",
          marginRight: "auto",
          width: "100%",
          // maxWidth: data.length > 0 ? `${data.length * 300}px` : "100%",
          cursor: "pointer",
          height: "75%",
          // maxHeight: "50vh",
          aspectRatio: 1.618,
          marginTop: "1.5rem",
        }}
        responsive
        data={data}
        onClick={(e) => redirectToRoadmapByIndex(e.activeIndex as number)}
        margin={{
          top: 20,
          right: 0,
          left: 0,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        {!isMobile && <YAxis width="auto" />}

        <Tooltip />
        <Legend />
        <Bar dataKey="completed" stackId="a" fill="#5554b6" background />
        <Bar dataKey="total" stackId="b" fill="#a6a6d4" background />
      </BarChart>
    </div>
  );
}

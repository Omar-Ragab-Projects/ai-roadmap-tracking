"use client";
import { Roadmap } from "@/types/roadmap";
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

  console.log("Chart data:", data);

  const redirectToRoadmapByIndex = (index: number) => {
    if (!index) return;
    const roadmap = roadmaps[index];
    if (roadmap) {
      router.push(`/roadmaps/${roadmap.id}`);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md border border-border p-6 ">
      <h3>Active Roadmaps</h3>
      <p>Goals by roadmap</p>
      <BarChart
        style={{
          marginLeft: "auto",
          marginRight: "auto",
          width: "100%",
          // maxWidth: data.length > 0 ? `${data.length * 300}px` : "100%",
          cursor: "pointer",
          height: "80%",
          // maxHeight: "50vh",
          aspectRatio: 1.618,
          marginTop: "2rem",
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
        <YAxis width="auto" />
        <Tooltip />
        <Legend />
        <Bar dataKey="completed" stackId="a" fill="#008994" background />
        <Bar dataKey="total" stackId="b" fill="#9bcbcf" background />
      </BarChart>
    </div>
  );
}

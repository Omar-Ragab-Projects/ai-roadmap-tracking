import AnimateCount from "@/components/ui/AnimateCount";
import { Goal as GaolTypes, Roadmap } from "@/types/roadmap";
import { Award, Goal, Target, TrendingUp } from "lucide-react";

export default function StatsSection({
  roadmaps,
  totalGoals,
}: {
  roadmaps: Roadmap[];
  totalGoals: GaolTypes[];
}) {
  const totalRoadmaps = roadmaps.length;
  const totalCompletedRoadmaps = roadmaps.filter(
    (rm) =>
      rm.goals?.every((goal) => goal.status == "done") && rm.goals.length > 0
  ).length;
  const totalCompletedGoals = totalGoals.filter(
    (goal) => goal.status == "done"
  ).length;
  const totalGoalsCount = totalGoals.length;

  const cardsData = [
    {
      title: "Total",
      icon: Target,
      value: totalRoadmaps,
    },
    {
      title: "Completed",
      icon: Award,
      value: totalCompletedRoadmaps,
    },
    {
      title: "Total Goals",
      icon: Goal,
      value: totalGoalsCount,
    },
    {
      title: "Completion Rate",
      icon: TrendingUp,
      value:
        Math.min(
          100,
          totalGoalsCount === 0
            ? 0
            : Math.round((totalCompletedGoals / totalGoalsCount) * 100)
        ) + "%",
      isPercentage: true,
    },
  ];

  return (
    <section className="mt-8 lg:mt-10">
      <ul className="grid grid-cols-2 xl:grid-cols-4 gap-2 lg:gap-6">
        {cardsData.map((card, index) => (
          <li
            key={index}
            className="relative lg:min-h-40 bg-primary py-4 px-[8%] rounded-xl shadow-lg hover:-translate-y-1 transition flex-between text-white hover:bg-radial-[at_50%_75%] from-white/10 via-white/5 to-primary to-90%"
          >
            <div className="flex flex-col max-lg:items-center max-lg:text-center flex-1">
              <span className="title font-semibold text-sm opacity-90">
                {card.title}
              </span>
              <span className="text-4xl lg:text-5xl font-bold mt-2 flex items-center  ">
                <AnimateCount count={parseInt(card.value.toString())} />
                {card.isPercentage ? "%" : ""}
              </span>
            </div>
            <div className="flex-center rounded text-[#d4d4ed]">
              <card.icon
                size={60}
                className="max-lg:absolute max-lg:opacity-8"
              />
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

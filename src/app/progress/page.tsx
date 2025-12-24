import PageTitle from "@/components/ui/PageTitle";
import StatsSection from "./_components/StatsSection";
import { fetchRoadmapsServer } from "@/utils/entities/roadmaps/server";
import ChartSection from "./_components/ChartSection";
import RecentGoals from "./_components/RecentGoals";

export default async function ProgressPage() {
  const { roadmaps, totalGoals } = await fetchRoadmapsServer();

  return (
    <>
      <header>
        <PageTitle
          title="Progress Tracking"
          description="Track your learning progress and achieve your goals"
        />
      </header>

      <StatsSection roadmaps={roadmaps} totalGoals={totalGoals} />

      <section className="grid md:grid-cols-2 gap-6 mt-10">
        <ChartSection roadmaps={roadmaps} />
        <RecentGoals goals={totalGoals} />
      </section>
    </>
  );
}

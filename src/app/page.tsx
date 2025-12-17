import PageTitle from "@/components/ui/PageTitle";
import StatsSection from "./_components/StatsSection";
import { fetchRoadmapsServer } from "@/utils/entities/roadmaps/server";
import ChartSection from "./_components/ChartSection";
import RecentGoals from "./_components/RecentGoals";

export default async function HomePage() {
  const { roadmaps, totalGoals } = await fetchRoadmapsServer();
  console.log("Roadmaps on home page:", roadmaps, totalGoals);
  return (
    <>
      <header>
        <PageTitle
          title="Welcome back!"
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

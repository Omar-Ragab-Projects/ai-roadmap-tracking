import Button from "@/components/ui/Button";
import PageTitle from "@/components/ui/PageTitle";
import RoadmapsList from "./_components/RoadmapsList";

export default function RoadmapsPage() {
  return (
    <>
      <header className="lg:flex-between">
        <PageTitle
          title="Learning Roadmaps"
          description="Create and manage your learning paths"
        />
        <Button
          className="max-lg:mt-6"
          href="/roadmaps/new"
          title={"+ New Roadmap"}
        />
      </header>

      <RoadmapsList />
    </>
  );
}

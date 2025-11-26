import Button from "@/components/ui/Button";
import PageTitle from "@/components/ui/PageTitle";
import Link from "next/link";
import RoadmapsList from "./_components/RoadmapsList";

export default function RoadmapsPage() {
  return (
    <>
      <header className="flex-between">
        <PageTitle
          title="Learning Roadmaps"
          description="Create and manage your learning paths"
        />
        <Link href="/roadmaps/new">
          <Button title={"+ New Roadmap"} />
        </Link>
      </header>

      <section>
        <RoadmapsList />
      </section>
    </>
  );
}

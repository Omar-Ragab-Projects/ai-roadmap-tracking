import Button from "@/components/ui/Button";
import PageTitle from "@/components/ui/PageTitle";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function RoadmapsPage() {
  return (
    <>
      <header className="flex-between">
        <PageTitle
          title="Learning Roadmaps"
          description="Create and manage your learning paths"
        />
        <Link href="/roadmaps/new">
          <Button title={"New Roadmap"} Icon={Plus} />
        </Link>
      </header>

      <section></section>
    </>
  );
}

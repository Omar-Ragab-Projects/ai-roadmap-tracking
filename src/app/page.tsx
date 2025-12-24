import PageTitle from "@/components/ui/PageTitle";
import RoadmapGenerator from "./_components/ai-generator/RoadmapGenerator";
import TipsSection from "./_components/ai-generator/TipsSection";

export default function AiGeneratorPage() {
  return (
    <>
      <header>
        <PageTitle
          title="AI Roadmap Generator"
          description="Let AI create a personalized learning roadmap for you."
        />
      </header>

      <RoadmapGenerator />
      <TipsSection />
    </>
  );
}

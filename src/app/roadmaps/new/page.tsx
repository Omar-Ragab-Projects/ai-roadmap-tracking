import SubmitButton from "@/components/global/form/SubmitButton";
import Button from "@/components/ui/Button";
import FormGroup from "@/components/global/form/FormGroup";
import IconTitle from "@/components/ui/IconTitle";
import { ArrowLeft, Blocks } from "lucide-react";
import Link from "next/link";
import FormProvider from "@/components/global/form/FormProvider";
import { redirect } from "next/navigation";
import { addRoadmapAction } from "@/utils/entities/roadmaps/server";
import BackTo from "@/components/ui/BackTo";

export default async function CreateRoadmapPage() {
  const onSuccess = async () => {
    "use server";
    redirect("/roadmaps");
  };
  return (
    <div className="pt-18 w-1/2 mx-auto">
      <header>
        <BackTo href="/roadmaps" />
        <IconTitle
          className="mt-6 "
          Icon={Blocks}
          title={"Create New Roadmap"}
          description={
            "Define your learning journey with a clear title and description to get started."
          }
        />
      </header>

      <FormProvider
        action={addRoadmapAction}
        onSuccess={onSuccess}
        className="mt-8 p-8 bg-white shadow-lg border border-border rounded-2xl"
      >
        <FormGroup
          required
          label="Roadmap Title"
          name="title"
          placeholder="e.g., Master React and Next.js"
        />
        <FormGroup
          textarea
          label="Description"
          name="description"
          placeholder="Describe your learning goals and what you want to achieve..."
        />
        <div className="flex gap-3 mt-6 pt-6 border-t border-border">
          <Button
            href="/roadmaps"
            className="w-full p-3! flex-1"
            title={"Cancel"}
            variant={"ghost"}
            type="button"
          />

          <SubmitButton title="Create Roadmap" />
        </div>
      </FormProvider>

      <p className="mt-6 p-4 rounded-2xl bg-white border border-border text-text text-sm">
        💡 <b>Tip:</b> You can add goals and organize them after creating your
        roadmap.
      </p>
    </div>
  );
}

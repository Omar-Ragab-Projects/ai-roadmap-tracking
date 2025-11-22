import FormProvider from "@/components/global/form/FormProvider";
import SubmitButton from "@/components/global/form/SubmitButton";
import { Roadmap } from "@/types/roadmap";
import { updateRoadmapAction } from "@/utils/entities/roadmaps/server";
import { Save } from "lucide-react";

export default function EditRoadmapForm({
  roadmap,
  onSuccess,
}: {
  roadmap: Roadmap;
  onSuccess: () => void;
}) {
  return (
    <FormProvider
      className="flex-between gap-4 flex-1"
      action={updateRoadmapAction}
      onSuccess={onSuccess}
    >
      <div className="flex-1 flex flex-col">
        <input type="text" name="roadmapId" defaultValue={roadmap.id} hidden />
        <input className="p-2" name="title" defaultValue={roadmap.title} />
        <textarea
          className="p-2 mt-2"
          name="description"
          defaultValue={roadmap.description || "-"}
        />
      </div>
      <SubmitButton
        className="max-w-fit flex-center text-primary"
        Icon={Save}
      />
    </FormProvider>
  );
}

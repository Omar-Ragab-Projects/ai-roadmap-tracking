import FormProvider from "@/components/global/form/FormProvider";
import SubmitButton from "@/components/global/form/SubmitButton";
import { Goal, Roadmap } from "@/types/roadmap";
import { updateRoadmapAction } from "@/utils/entities/roadmaps/server";
import { Save } from "lucide-react";

export default function EditGoalForm({
  goal,
  onSuccess,
}: {
  goal: Goal;
  onSuccess: () => void;
}) {
  return (
    <FormProvider
      className="flex items-start me-2 gap-4 flex-1"
      action={updateRoadmapAction}
      onSuccess={onSuccess}
    >
      <div className="flex-1 flex flex-col">
        <input type="text" name="goalId" defaultValue={goal.id} hidden />
        <input className="p-2" name="title" defaultValue={goal.name} />
        <textarea
          className="p-2 mt-2"
          name="description"
          defaultValue={goal.description || "-"}
        />
      </div>
      <SubmitButton
        className="max-w-fit flex-center text-primary bg-transparent [&>svg]:text-primary! hover:bg-transparent! p-1! [&>svg]:w-5 [&>svg]:h-5"
        Icon={Save}
      />
    </FormProvider>
  );
}

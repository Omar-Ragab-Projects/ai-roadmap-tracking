"use client";
import Button from "@/components/ui/Button";
import { download } from "@/utils/common";
import { fetchNotesClient } from "@/utils/entities/notes/client";
import { useQuery } from "@tanstack/react-query";
import { Download } from "lucide-react";

export default function DownloadNotes() {
  const { isLoading, data: notes } = useQuery({
    queryKey: ["notes"],
    queryFn: fetchNotesClient,
  });

  const notesText = notes
    ?.map(
      (note) =>
        `#${note.goal.roadmap.title}\n${note.goal.name}\n\n${note.note}\n\n---\n\n`
    )
    .join("");

  return (
    <Button
      className="max-lg:mt-6 max-lg:w-full"
      loading={isLoading}
      disabled={!notes?.length}
      Icon={Download}
      onClick={() => download("notes.txt", notesText || "")}
    >
      <span>Download All</span>
    </Button>
  );
}

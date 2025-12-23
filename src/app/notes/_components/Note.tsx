"use client";

import type { Note } from "@/types/notes";
import { Activity, useState } from "react";
import { BookMarked, Pen, Save, Trash2 } from "lucide-react";
import ConfirmButton from "@/components/ui/ConfirmButton";
import {
  deleteNoteAction,
  updateNoteAction,
} from "@/utils/entities/notes/server";
import Dialog from "@/components/ui/Dialog";
import FormProvider from "@/components/global/form/FormProvider";
import SubmitButton from "@/components/global/form/SubmitButton";
import Link from "next/link";

export default function Note({
  note,
  onUpdateNote,
}: {
  note: Note;
  onUpdateNote: () => void;
}) {
  const [previewNote, setPreviewNote] = useState<Note | null>(null);
  const [edit, setEdit] = useState(false);
  const toggleEdit = () => setEdit(!edit);

  return (
    <>
      <li key={note.id} className="card">
        <div className="flex-between gap-4">
          <div>
            <h3 className="text-lg cursor-pointer hover:underline">
              <Link
                href={`/roadmaps/${note.goal.roadmap.id}`}
                className="flex items-center gap-2"
              >
                <BookMarked size={18} className="text-primary" />
                {note.goal.roadmap.title}
              </Link>
            </h3>
            <p>
              <span className="opacity-80 text-xs">Goal #{note.goal.id}</span>:{" "}
              {note.goal.name}
            </p>
          </div>

          <ConfirmButton
            onConfirm={deleteNoteAction}
            values={{ noteId: note.id }}
            onSuccess={onUpdateNote}
          >
            <Trash2
              size={16}
              className="text-red-400 cursor-pointer hover:text-red-500 transition"
            />
          </ConfirmButton>
        </div>

        <p
          onClick={() => setPreviewNote(note)}
          className="max-lines-3 mt-6 whitespace-pre-wrap break-all text-black/85 bg-muted/10 p-4 rounded-md hover:shadow hover:-translate-y-0.5 transition cursor-pointer hover:bg-primary/5"
        >
          {note.note}
        </p>

        <span className="block w-fit ms-auto mt-6 text-xs text-gray-400">
          {new Date(note.created_at).toLocaleDateString() +
            " " +
            new Date(note.created_at).toLocaleTimeString()}
        </span>
      </li>

      {/* Edit Note Modal */}
      <Dialog open={previewNote !== null} onClose={() => setPreviewNote(null)}>
        <FormProvider
          action={updateNoteAction}
          hiddenFields={[
            { name: "noteId", value: previewNote?.id.toString() || "" },
          ]}
          onSuccess={() => {
            setPreviewNote(null);
            onUpdateNote();
          }}
        >
          <Activity mode={edit ? "hidden" : "visible"}>
            <Pen
              onClick={toggleEdit}
              size={18}
              className="text-primary cursor-pointer"
            />
          </Activity>
          <Activity mode={!edit ? "hidden" : "visible"}>
            <SubmitButton Icon={Save}></SubmitButton>
          </Activity>

          <Activity mode={edit ? "hidden" : "visible"}>
            <p className="whitespace-pre-wrap break-all text-black/85 bg-muted/10 p-4 rounded-md mt-4">
              {previewNote?.note}
            </p>
          </Activity>
          <Activity mode={!edit ? "hidden" : "visible"}>
            <textarea
              defaultValue={previewNote?.note}
              className="mt-4 min-h-[50vh]"
              name="updatedNote"
            />
          </Activity>
        </FormProvider>
      </Dialog>
    </>
  );
}

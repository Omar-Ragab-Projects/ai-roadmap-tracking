"use client";

import { fetchNotesClient } from "@/utils/entities/notes/client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import SearchBar from "./SearchBar";
import Loader from "@/components/ui/Loader";
import Note from "./Note";
import { useState } from "react";

export default function Notes() {
  const [searchNote, setSearchNote] = useState("");

  const queryClient = useQueryClient();
  const { isLoading, data: notes } = useQuery({
    queryKey: ["notes"],
    queryFn: fetchNotesClient,
  });

  const onUpdateNote = () => {
    queryClient.invalidateQueries({ queryKey: ["notes"] });
  };

  const filteredNotes = notes?.filter((note) => {
    const searchKeys = [
      note.goal.name,
      note.note,
      note.goal.roadmap.title,
      note.goal.roadmap.description,
    ];
    return searchKeys.some((key) =>
      key?.toLowerCase().includes(searchNote.toLowerCase())
    );
  });

  const changeSearchNote = (value: string) => {
    setSearchNote(value);
  };

  return (
    <section className="mt-10 lg:mt-12">
      <SearchBar search={searchNote} changeSearch={changeSearchNote} />

      {isLoading && <Loader />}

      {filteredNotes?.length === 0 && !isLoading && (
        <p className="text-center mt-8 opacity-70">No notes found.</p>
      )}

      <ul className="mt-6 grid md:grid-cols-2 gap-4 lg:gap-6">
        {filteredNotes?.map((note) => (
          <Note key={note.id} note={note} onUpdateNote={onUpdateNote} />
        ))}
      </ul>
    </section>
  );
}

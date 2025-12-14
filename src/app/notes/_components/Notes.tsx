"use client";

import { fetchNotesClient } from "@/utils/entities/notes/client";
import { useQuery } from "@tanstack/react-query";
import SearchBar from "./SearchBar";
import Loader from "@/components/ui/Loader";
import Note from "./Note";

export default function Notes() {
  const { isLoading, data, refetch } = useQuery({
    queryKey: ["notes"],
    queryFn: fetchNotesClient,
  });

  return (
    <section className="mt-12">
      <SearchBar />

      {isLoading && <Loader />}

      {data?.length === 0 && !isLoading && (
        <p className="text-center mt-8 opacity-70">No notes found.</p>
      )}

      <ul className="mt-4 grid grid-cols-2 gap-6">
        {data?.map((note) => (
          <Note key={note.id} note={note} refetch={refetch} />
        ))}
      </ul>
    </section>
  );
}

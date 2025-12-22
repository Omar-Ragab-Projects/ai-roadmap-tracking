import PageTitle from "@/components/ui/PageTitle";
import Notes from "./_components/Notes";
import DownloadNotes from "./_components/DownloadNotes";

export default function NotesPage() {
  return (
    <>
      <header className="lg:flex-between">
        <PageTitle
          title="Learning Notes"
          description="Organize and backup your learning notes easily."
        />
        <DownloadNotes />
      </header>

      <Notes />
    </>
  );
}

import Button from "@/components/ui/Button";
import PageTitle from "@/components/ui/PageTitle";
import { Download } from "lucide-react";
import Notes from "./_components/Notes";

export default function NotesPage() {
  return (
    <>
      <header className="flex-between">
        <PageTitle
          title="Learning Notes"
          description="Organize and backup your learning notes easily."
        />
        <Button>
          <Download size={16} />
          <span>Download All</span>
        </Button>
      </header>

      <Notes />
    </>
  );
}

"use client";

import Button from "@/components/ui/Button";
import { RotateCcw } from "lucide-react";

export default function ClearChatButton({ onClear }: { onClear: () => void }) {
  return (
    <>
      <Button
        className="max-lg:mt-6"
        variant="ghost"
        title={"Clear"}
        Icon={RotateCcw}
        onClick={onClear}
      />
    </>
  );
}

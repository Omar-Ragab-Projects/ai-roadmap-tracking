"use client";

import Button from "@/components/ui/Button";
import { RotateCcw } from "lucide-react";

export default function ClearChatButton({ onClear }: { onClear: () => void }) {
  return (
    <>
      <Button
        varient="ghost"
        title={"Clear"}
        Icon={RotateCcw}
        onClick={onClear}
      />
    </>
  );
}

import { Sparkles } from "lucide-react";
import React from "react";

export default function ASide() {
  return (
    <aside className="min-w-[250px] h-lvh bg-sidebar text-foreground">
      <div className="p-6 border-b border-sidebar-border">
        <h3 className="flex items-center gap-2 font-bold text-xl">
          <Sparkles className="text-accent" strokeWidth={"2.25"} />
          <span>Roadmap</span>
        </h3>
        <span className="block mt-2 text-sm text-background">
          AI-Powered Learning
        </span>
      </div>
    </aside>
  );
}

import { Sparkles } from "lucide-react";

export default function MobileHeader() {
  return (
    <div className="lg:hidden p-2 bg-sidebar text-white fixed top-0 w-full z-50 shadow-md ">
      <h3 className={`flex items-center justify-center gap-2 font-semibold`}>
        <Sparkles className="text-accent" size={12} strokeWidth={"2.25"} />
        <span className="block text-xs text-white/60">AI-Powered Learning</span>
      </h3>
    </div>
  );
}

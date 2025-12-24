import { Sparkles } from "lucide-react";

export default function TipsSection() {
  return (
    <section className="card bg-secondary/4 mt-6 border border-secondary/10">
      <h4 className="flex items-center gap-2 text-secondary/90  ">
        <Sparkles size={14} className="text-secondary/60" />
        <span className="font-semibold ">Tips for Best Results</span>
      </h4>
      <ul className="list-disc w-[96%] mx-auto mt-4 text-sm opacity-75 [&>li]:not-last:mb-2">
        <li>Be specific about what you want to learn.</li>
        <li>Mention your current skill level if relevant.</li>
        <li>Include timeframe or end goal in your description.</li>
        <li>Try different phrasing if results don't match expectations.</li>
      </ul>
    </section>
  );
}

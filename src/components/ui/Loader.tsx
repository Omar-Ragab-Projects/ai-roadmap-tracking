import { Loader2 } from "lucide-react";

export default function Loader() {
  return (
    <div className="w-full h-[300px] flex-center">
      <Loader2 size={26} className="animate-spin text-primary" />
    </div>
  );
}

import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { Activity } from "react";

interface SmallViewProps {
  smallView: boolean;
  toggleView: () => void;
}

export default function SmallView({ smallView, toggleView }: SmallViewProps) {
  return (
    <>
      <Activity mode={!smallView ? "visible" : "hidden"}>
        <PanelLeftClose
          size={20}
          className="absolute right-2 top-2 text-gray hover:text-white cursor-pointer"
          onClick={toggleView}
        />
      </Activity>
      <Activity mode={smallView ? "visible" : "hidden"}>
        <PanelLeftOpen
          size={20}
          className="absolute right-1 top-1 text-gray/65 hover:text-white cursor-pointer"
          onClick={toggleView}
        />
      </Activity>
    </>
  );
}

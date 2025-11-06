import {
  BookOpen,
  ChartColumn,
  PanelsTopLeft,
  Sparkles,
  WandSparkles,
  Zap,
} from "lucide-react";

export const routes = [
  {
    name: "Dashboard",
    path: "/",
    icon: PanelsTopLeft,
  },
  {
    name: "Roadmaps",
    path: "/roadmaps",
    icon: ChartColumn,
  },
  {
    name: "Ai Generator",
    path: "/ai-generator",
    icon: WandSparkles,
  },
  {
    name: "Notes",
    path: "/notes",
    icon: BookOpen,
  },
  {
    name: "Focus Mode",
    path: "/focus",
    icon: Zap,
  },
  {
    name: "Ai Assistant",
    path: "/ai-assistant",
    icon: Sparkles,
  },
];

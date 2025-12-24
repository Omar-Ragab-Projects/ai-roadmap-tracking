import {
  BookOpen,
  ChartColumn,
  PanelsTopLeft,
  Sparkles,
  TrendingUp,
  WandSparkles,
  Zap,
} from "lucide-react";

export const routes = [
  {
    name: "AI Generator",
    path: "/",
    icon: WandSparkles,
  },
  {
    name: "Roadmaps",
    path: "/roadmaps",
    icon: ChartColumn,
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
    name: "AI Assistant",
    path: "/ai-assistant",
    icon: Sparkles,
  },
  {
    name: "Progress",
    path: "/progress",
    icon: TrendingUp,
  },
];

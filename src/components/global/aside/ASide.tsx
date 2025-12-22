"use client";
import { routes } from "@/lib/routes";
import { Plus, Sparkles } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import SmallView from "./components/SmallView";

export default function ASide() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const toggleView = () => setIsCollapsed(!isCollapsed);

  const getActivePath = () => {
    const firstSegment = "/" + pathname.split("/")[1];
    return firstSegment || "/";
  };

  const isActivePath = (path: string) => getActivePath() === path;

  return (
    <>
      {/* Web ASide Version */}
      <aside
        className={`hidden h-lvh bg-sidebar text-background lg:flex flex-col sticky top-0 z-100
    ${isCollapsed ? "w-[100px] transition-all duration-300" : "w-[250px]"}`}
      >
        <div className="p-6 border-b border-sidebar-border relative">
          <h3
            className={`flex items-center gap-2 font-bold text-xl
          ${isCollapsed ? "justify-center" : ""}`}
          >
            <Sparkles className="text-accent" strokeWidth={"2.25"} />
            {!isCollapsed && <span>Roadmap</span>}
          </h3>
          {!isCollapsed && (
            <span className="block mt-2 text-sm text-[#afaeb4]">
              AI-Powered Learning
            </span>
          )}
          <SmallView smallView={isCollapsed} toggleView={toggleView} />
        </div>

        <nav className="flex-1 p-4 border-b border-sidebar-border">
          <ul>
            {routes.map((route, index) => (
              <li key={index} className="not-last:mb-2 relative group">
                <Link
                  href={route.path}
                  className={`flex items-center gap-2 px-4 py-2 text-lg font-semibold rounded-lg hover:bg-sidebar-primary
                  ${isCollapsed ? "justify-center" : ""} 
                  ${isActivePath(route.path) ? "bg-sidebar-primary" : ""}`}
                >
                  <route.icon size={isCollapsed ? 24 : 20} />
                  {!isCollapsed && <span>{route.name}</span>}
                </Link>
                {isCollapsed && (
                  <span className="tooltip hidden group-hover:block">
                    {route.name}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-b border-t border-sidebar-border">
          <Link
            href="/roadmaps/new"
            className="w-full bg-accent text-sidebar px-4 py-2 rounded-lg flex-center gap-1 font-semibold tracking-wide cursor-pointer hover:bg-accent/90 transition text-sm"
          >
            <Plus size={18} />
            {!isCollapsed && <span>New Roadmap</span>}
          </Link>
        </div>

        <div
          className={`p-4 text-center text-gray
        ${isCollapsed ? "text-[8px]" : "text-xs"}`}
        >
          Keep learning, keep growing
        </div>
      </aside>
      {/* Mobile ASide Version */}
      <nav
        className={`lg:hidden w-lvw bg-sidebar text-background flex justify-between gap-2 fixed bottom-0 z-100 px-4 py-2 border-b border-sidebar-border h-[57px]`}
      >
        {routes.map((route) => (
          <Link
            key={route.path}
            href={route.path}
            className={`relative group flex-center gap-2 p-2 text-lg font-semibold rounded-full hover:bg-sidebar-primary
                  ${isActivePath(route.path) ? "bg-sidebar-primary" : ""}`}
          >
            <route.icon
              size={isActivePath(route.path) ? 24 : 20}
              className="transition-all duration-100"
            />
          </Link>
        ))}
      </nav>
    </>
  );
}

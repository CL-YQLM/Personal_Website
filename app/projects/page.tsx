import type { Metadata } from "next";
import Projects from "@/components/Projects";

export const metadata: Metadata = {
  title: "Projects — Cici Liu",
};

export default function ProjectsPage() {
  return (
    <main className="pt-14">
      <Projects />
    </main>
  );
}

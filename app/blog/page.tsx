import type { Metadata } from "next";
import Blog from "@/components/Blog";

export const metadata: Metadata = {
  title: "Blog — Cici Liu",
};

export default function BlogPage() {
  return (
    <main className="pt-14">
      <Blog />
    </main>
  );
}

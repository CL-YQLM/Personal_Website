import TravelGlobe from "@/components/TravelGlobe";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Travel — Cici Liu",
};

export default function TravelPage() {
  return (
    <main className="bg-slate-950 pt-14">
      <div className="w-full" style={{ height: "calc(100vh - 3.5rem)" }}>
        <TravelGlobe />
      </div>
    </main>
  );
}

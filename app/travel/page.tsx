import Link from "next/link";
import TravelGlobe from "@/components/TravelGlobe";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Travel — Cici Liu",
};

const visited = [
  {
    flag: "🇨🇳",
    country: "China",
    places: ["Beijing", "Hometown"],
    color: "bg-red-50 border-red-100",
  },
  {
    flag: "🇺🇸",
    country: "United States",
    places: ["Champaign-Urbana, IL", "University of Illinois"],
    color: "bg-blue-50 border-blue-100",
  },
  {
    flag: "🇨🇦",
    country: "Canada",
    places: ["Vancouver, BC", "Simon Fraser University"],
    color: "bg-sky-50 border-sky-100",
  },
];

export default function TravelPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-6 py-5">
        <Link
          href="/"
          className="font-mono text-sm text-white/50 hover:text-white transition-colors"
        >
          ← Home
        </Link>
        <div className="text-center">
          <p className="font-mono text-xs uppercase tracking-widest text-white/30">
            Around the world
          </p>
          <h1 className="text-lg font-bold tracking-tight">Travel</h1>
        </div>
        <div className="w-16" />
      </div>

      {/* Globe */}
      <div className="w-full" style={{ height: "80vh" }}>
        <TravelGlobe />
      </div>

      {/* Visited places */}
      <section className="bg-white text-black px-6 py-16 max-w-4xl mx-auto">
        <div className="mb-10">
          <p className="text-sm text-black/40 font-mono tracking-widest uppercase mb-2">
            Countries &amp; regions
          </p>
          <h2 className="text-3xl font-bold tracking-tight">Places I've Been</h2>
          <p className="mt-3 text-black/50 text-sm">
            {visited.length} countries · highlights shown in green on the globe
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {visited.map(({ flag, country, places, color }) => (
            <div
              key={country}
              className={`border rounded-2xl p-5 space-y-2 ${color}`}
            >
              <div className="text-3xl">{flag}</div>
              <p className="font-semibold text-base">{country}</p>
              <ul className="space-y-0.5">
                {places.map((p) => (
                  <li key={p} className="text-sm text-black/50">{p}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Photo placeholder */}
        <div className="mt-14">
          <p className="text-sm text-black/40 font-mono tracking-widest uppercase mb-6">
            Photos
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="aspect-square rounded-xl bg-black/5 border border-black/8 flex items-center justify-center text-black/20 text-xs font-mono"
              >
                Photo {i}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

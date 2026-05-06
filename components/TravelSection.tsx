"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";

const Globe = dynamic(() => import("react-globe.gl"), { ssr: false });

const VISITED = new Set([
  "China",
  "United States of America",
  "Canada",
]);

const COUNTRY_INFO: Record<string, {
  emoji: string;
  label: string;
  places: { region: string; cities: string[] }[];
  photos: string[];
}> = {
  "China": {
    emoji: "🇨🇳",
    label: "China",
    places: [
      { region: "Cities visited", cities: ["Shanghai", "Beijing", "Tianjin", "Chengdu"] },
    ],
    photos: [],
  },
  "United States of America": {
    emoji: "🇺🇸",
    label: "United States",
    places: [
      { region: "Illinois", cities: ["Chicago", "Urbana-Champaign"] },
      { region: "Washington", cities: ["Seattle"] },
      { region: "Pacific Northwest", cities: ["Olympic National Park", "Crater Lake", "Mt. Rainier"] },
      { region: "California", cities: ["San Francisco", "San Jose", "Los Angeles", "San Diego", "Irvine"] },
      { region: "Southwest", cities: ["Arizona", "Utah (National Parks)", "Nevada"] },
    ],
    photos: [],
  },
  "Canada": {
    emoji: "🇨🇦",
    label: "Canada",
    places: [
      { region: "Cities visited", cities: ["Vancouver, BC", "Waterloo, ON"] },
    ],
    photos: [],
  },
};

const CITIES = [
  { name: "Shanghai", lat: 31.2304, lng: 121.4737 },
  { name: "Beijing", lat: 39.9042, lng: 116.4074 },
  { name: "Tianjin", lat: 39.3434, lng: 117.3616 },
  { name: "Chengdu", lat: 30.5728, lng: 104.0668 },
  { name: "Chicago", lat: 41.8781, lng: -87.6298 },
  { name: "Urbana, IL", lat: 40.1105, lng: -88.2073 },
  { name: "Seattle", lat: 47.6062, lng: -122.3321 },
  { name: "San Francisco", lat: 37.7749, lng: -122.4194 },
  { name: "Los Angeles", lat: 34.0522, lng: -118.2437 },
  { name: "San Diego", lat: 32.7157, lng: -117.1611 },
  { name: "Vancouver", lat: 49.2827, lng: -123.1207 },
  { name: "Waterloo, ON", lat: 43.4643, lng: -80.5204 },
];

export default function TravelSection() {
  const globeEl = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [countries, setCountries] = useState<{ features: object[] }>({ features: [] });
  const [size, setSize] = useState({ w: 400, h: 400 });
  const [loaded, setLoaded] = useState(false);
  const [activeCountry, setActiveCountry] = useState<string | null>(null);

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/vasturiano/react-globe.gl/master/example/datasets/ne_110m_admin_0_countries.geojson"
    )
      .then((r) => r.json())
      .then((data) => { setCountries(data); setLoaded(true); });
  }, []);

  useEffect(() => {
    const update = () => {
      if (containerRef.current) {
        setSize({ w: containerRef.current.clientWidth, h: containerRef.current.clientHeight });
      }
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    if (!loaded || !globeEl.current) return;
    const ctrl = globeEl.current.controls();
    ctrl.autoRotate = true;
    ctrl.autoRotateSpeed = 0.35;
    ctrl.rotateSpeed = 0.4;
    ctrl.zoomSpeed = 0.6;
    ctrl.enableDamping = true;
    ctrl.dampingFactor = 0.08;
    globeEl.current.pointOfView({ lat: 25, lng: 80, altitude: 2.2 }, 1000);
  }, [loaded]);

  const handleClick = (d: any) => {
    const country = d?.properties?.ADMIN as string | undefined;
    if (!country || !VISITED.has(country)) return;
    setActiveCountry((prev) => (prev === country ? null : country));
  };

  const info = activeCountry ? COUNTRY_INFO[activeCountry] : null;

  return (
    <section id="travel" className="max-w-4xl mx-auto px-6 py-14">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <p className="text-sm text-black/40 font-mono tracking-widest uppercase mb-3">Around the world</p>
        <h2 className="text-4xl font-bold tracking-tight">Travel</h2>
      </motion.div>

      <div className="flex flex-col md:grid md:grid-cols-2 gap-5">
        {/* Globe */}
        <div
          ref={containerRef}
          className="rounded-2xl overflow-hidden border border-black/8 bg-slate-950"
          style={{ height: 400 }}
        >
          {!loaded && (
            <div className="w-full h-full flex items-center justify-center">
              <p className="text-white/30 font-mono text-xs tracking-widest animate-pulse">Loading…</p>
            </div>
          )}
          {loaded && (
            <Globe
              ref={globeEl}
              width={size.w}
              height={size.h}
              globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
              backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
              atmosphereColor="rgba(120,180,255,0.8)"
              atmosphereAltitude={0.14}
              polygonsData={countries.features}
              polygonCapColor={(d: any) =>
                d.properties?.ADMIN === activeCountry
                  ? "rgba(52,211,153,0.85)"
                  : VISITED.has(d.properties?.ADMIN)
                  ? "rgba(52,211,153,0.5)"
                  : "rgba(255,255,255,0.04)"
              }
              polygonSideColor={() => "rgba(0,0,0,0.1)"}
              polygonStrokeColor={() => "rgba(255,255,255,0.07)"}
              polygonAltitude={(d: any) =>
                d.properties?.ADMIN === activeCountry ? 0.02
                : VISITED.has(d.properties?.ADMIN) ? 0.012
                : 0.004
              }
              polygonLabel={(d: any) =>
                VISITED.has(d.properties?.ADMIN)
                  ? `<div style="background:rgba(0,0,0,0.75);color:#fff;padding:5px 10px;border-radius:6px;font-size:12px;font-family:monospace">${d.properties.ADMIN}</div>`
                  : ""
              }
              onPolygonClick={handleClick}
              labelsData={CITIES}
              labelLat={(d: any) => d.lat}
              labelLng={(d: any) => d.lng}
              labelText={(d: any) => d.name}
              labelSize={0.55}
              labelDotRadius={0.3}
              labelColor={() => "rgba(255,255,255,0.75)"}
              labelResolution={2}
            />
          )}
        </div>

        {/* Info panel */}
        <div
          className="rounded-2xl border border-black/8 bg-white overflow-hidden flex flex-col"
          style={{ height: 400 }}
        >
          <AnimatePresence mode="wait">
            {!activeCountry ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex-1 flex flex-col items-center justify-center gap-3 px-6 text-center"
              >
                <span className="text-4xl">🌍</span>
                <p className="text-sm font-medium text-black/60">Click a highlighted country to explore</p>
                <p className="text-xs text-black/30">{VISITED.size} countries visited</p>
              </motion.div>
            ) : (
              <motion.div
                key={activeCountry}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="flex-1 flex flex-col p-5 gap-4 overflow-y-auto"
              >
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{info?.emoji}</span>
                    <p className="font-bold text-base">{info?.label}</p>
                  </div>
                  <button
                    onClick={() => setActiveCountry(null)}
                    className="text-black/25 hover:text-black transition-colors text-xl leading-none"
                  >
                    ×
                  </button>
                </div>

                {/* Places */}
                <div className="space-y-3">
                  <p className="text-xs font-mono text-black/30 uppercase tracking-widest">Places visited</p>
                  {info?.places.map(({ region, cities }) => (
                    <div key={region}>
                      <p className="text-xs font-semibold text-black/45 mb-1.5">{region}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {cities.map((c) => (
                          <span key={c} className="text-xs px-2 py-0.5 bg-black/[0.04] rounded-full text-black/60">
                            {c}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Photos — only shown when photos exist */}
                {info && info.photos.length > 0 && (
                  <div className="space-y-2 mt-auto">
                    <p className="text-xs font-mono text-black/30 uppercase tracking-widest">Photos</p>
                    <div className="grid grid-cols-3 gap-1.5">
                      {info.photos.map((src, i) => (
                        <img key={i} src={src} alt="" className="w-full aspect-square object-cover rounded-lg" />
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

const Globe = dynamic(() => import("react-globe.gl"), { ssr: false });

const VISITED = new Set([
  "China",
  "United States of America",
  "Canada",
]);

const CITIES = [
  { name: "Champaign, IL", lat: 40.1164, lng: -88.2434 },
  { name: "Vancouver, BC", lat: 49.2827, lng: -123.1207 },
  { name: "Beijing", lat: 39.9042, lng: 116.4074 },
];

export default function TravelGlobe() {
  const globeEl = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [countries, setCountries] = useState<{ features: object[] }>({ features: [] });
  const [size, setSize] = useState({ w: 800, h: 600 });
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/vasturiano/react-globe.gl/master/example/datasets/ne_110m_admin_0_countries.geojson"
    )
      .then((r) => r.json())
      .then((data) => {
        setCountries(data);
        setLoaded(true);
      });
  }, []);

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        setSize({
          w: containerRef.current.clientWidth,
          h: containerRef.current.clientHeight,
        });
      }
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  useEffect(() => {
    if (!loaded || !globeEl.current) return;
    const ctrl = globeEl.current.controls();
    ctrl.autoRotate = true;
    ctrl.autoRotateSpeed = 0.5;
    ctrl.enableDamping = true;
    ctrl.dampingFactor = 0.1;
    globeEl.current.pointOfView({ lat: 30, lng: 100, altitude: 2.0 }, 1200);
  }, [loaded]);

  return (
    <div ref={containerRef} className="w-full h-full relative">
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-950">
          <p className="text-white/40 font-mono text-sm tracking-widest animate-pulse">Loading globe…</p>
        </div>
      )}
      <Globe
        ref={globeEl}
        width={size.w}
        height={size.h}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
        backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
        atmosphereColor="rgba(120,180,255,0.9)"
        atmosphereAltitude={0.15}
        polygonsData={countries.features}
        polygonCapColor={(d: any) =>
          VISITED.has(d.properties?.ADMIN)
            ? "rgba(52, 211, 153, 0.6)"
            : "rgba(255,255,255,0.03)"
        }
        polygonSideColor={() => "rgba(0,0,0,0.1)"}
        polygonStrokeColor={() => "rgba(255,255,255,0.06)"}
        polygonAltitude={(d: any) =>
          VISITED.has(d.properties?.ADMIN) ? 0.014 : 0.004
        }
        polygonLabel={(d: any) =>
          VISITED.has(d.properties?.ADMIN)
            ? `<div style="background:rgba(0,0,0,0.75);color:#fff;padding:6px 12px;border-radius:8px;font-size:13px;font-family:monospace;">${d.properties.ADMIN}</div>`
            : ""
        }
        labelsData={CITIES}
        labelLat={(d: any) => d.lat}
        labelLng={(d: any) => d.lng}
        labelText={(d: any) => d.name}
        labelSize={0.75}
        labelDotRadius={0.45}
        labelColor={() => "rgba(255,255,255,0.85)"}
        labelResolution={2}
      />
    </div>
  );
}

import { useEffect, useRef, useState } from "react";

/**
 * Decorative dotted globe centred on Latin America, slowly rotating.
 * Pure SVG + rAF — no external deps.
 */

// Land mask as lat/lon boxes — refined so continents read clearly.
const LAND: Array<[number, number, number, number]> = [
  // [lonMin, lonMax, latMin, latMax]
  // --- North America ---
  [-168, -140, 60, 71], // Alaska
  [-140, -122, 55, 70], // NW Canada
  [-125, -95, 42, 70], // W Canada
  [-95, -60, 45, 70], // E Canada
  [-88, -62, 42, 50], // Great Lakes / St. Lawrence
  [-125, -95, 31, 49], // W United States
  [-95, -76, 30, 45], // E United States
  [-82, -76, 25, 31], // Florida
  [-73, -56, 46, 61], // Labrador / Newfoundland
  [-56, -45, 60, 72], // Greenland south
  [-48, -20, 62, 82], // Greenland north
  // --- Mexico & Central America ---
  [-115, -97, 23, 32],
  [-106, -90, 15, 24],
  [-94, -83, 12, 18],
  [-86, -77, 7, 15],
  // --- Caribbean ---
  [-84, -74, 19, 23], // Cuba
  [-74, -68, 17, 20], // Hispaniola / PR
  // --- South America ---
  [-79, -60, 0, 12], // Colombia / Venezuela
  [-62, -52, 1, 8], // Guyanas
  [-81, -70, -18, 2], // Ecuador / Peru
  [-70, -34, -16, 4], // Amazon basin
  [-72, -57, -23, -10], // Bolivia
  [-58, -34, -24, -8], // Brazil east
  [-72, -48, -35, -22], // South cone north
  [-73, -56, -46, -33], // Argentina / Chile
  [-74, -65, -55, -44], // Patagonia
  // --- Europe ---
  [-10, 2, 36, 44], // Iberia
  [-5, 20, 43, 55], // W / Central Europe
  [-8, -1, 50, 58], // British Isles
  [4, 30, 54, 70], // Scandinavia / Baltic
  [20, 45, 44, 68], // E Europe / W Russia
  [12, 30, 36, 46], // Italy / Balkans
  // --- Africa ---
  [-17, 34, 15, 33], // Sahara belt
  [-17, 12, 4, 16], // West Africa
  [10, 42, -5, 15], // Central / Horn
  [12, 42, -18, -4], // Southern belt
  [14, 34, -35, -18], // South Africa
  [43, 51, -25, -12], // Madagascar
  // --- Middle East & Asia ---
  [34, 60, 12, 40], // Arabia / Iran
  [60, 90, 8, 36], // India / Central Asia
  [45, 90, 36, 62], // Central Asia steppe
  [60, 140, 50, 72], // Siberia
  [90, 122, 20, 50], // China
  [95, 110, 8, 22], // Indochina
  [126, 142, 32, 46], // Japan / Korea
  [95, 120, -8, 6], // Indonesia
  // --- Oceania ---
  [113, 154, -38, -11], // Australia
  [166, 178, -47, -34], // New Zealand
];

const isLand = (lon: number, lat: number) =>
  LAND.some(([a, b, c, d]) => lon >= a && lon <= b && lat >= c && lat <= d);

const POINTS: Array<{ lon: number; lat: number }> = [];
for (let lat = -80; lat <= 82; lat += 2.6) {
  const step = 2.6 / Math.max(0.22, Math.cos((lat * Math.PI) / 180));
  for (let lon = -180; lon <= 180; lon += step) {
    if (isLand(lon, lat)) POINTS.push({ lon, lat });
  }
}

export function RotatingGlobe({ className }: { className?: string }) {
  const [phase, setPhase] = useState(0);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let last = performance.now();
    const tick = (t: number) => {
      const dt = t - last;
      last = t;
      setPhase((p) => (p + dt * 0.005) % 360);
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  const R = 100;
  const tilt = (-14 * Math.PI) / 180;

  return (
    <svg viewBox="-115 -115 230 230" className={className} aria-hidden>
      <circle r={R} fill="none" stroke="currentColor" strokeOpacity={0.14} />
      <circle r={R} fill="currentColor" fillOpacity={0.025} />
      {/* graticule */}
      {[-60, -30, 0, 30, 60].map((lat) => {
        const b = (lat * Math.PI) / 180;
        const ry = Math.abs(Math.sin(b) * Math.sin(tilt)) + Math.cos(b) * 0.16 + 0.6;
        return (
          <ellipse
            key={lat}
            cx={0}
            cy={-Math.sin(b) * Math.cos(tilt) * R}
            rx={Math.cos(b) * R}
            ry={Math.cos(b) * R * 0.24}
            fill="none"
            stroke="currentColor"
            strokeOpacity={0.07}
            strokeWidth={0.5 * (ry / ry)}
          />
        );
      })}
      {POINTS.map(({ lon, lat }, i) => {
        const l = ((lon + phase - 60) * Math.PI) / 180;
        const b = (lat * Math.PI) / 180;
        const x0 = Math.cos(b) * Math.sin(l);
        const y0 = Math.sin(b);
        const z0 = Math.cos(b) * Math.cos(l);
        if (z0 <= 0.03) return null;
        const y = y0 * Math.cos(tilt) - z0 * Math.sin(tilt);
        const z = y0 * Math.sin(tilt) + z0 * Math.cos(tilt);
        return (
          <circle
            key={i}
            cx={x0 * R}
            cy={-y * R}
            r={0.6 + z * 0.55}
            fill="currentColor"
            opacity={0.14 + z * 0.7}
          />
        );
      })}
    </svg>
  );
}

export default RotatingGlobe;

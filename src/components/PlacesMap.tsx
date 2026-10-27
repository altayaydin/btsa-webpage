import { useEffect, useRef } from "react";
import * as maplibregl from "maplibre-gl";
import workerUrl from "maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url";
import "maplibre-gl/dist/maplibre-gl.css";
import { BOCCONI, placeCats, places } from "@/lib/data";

maplibregl.setWorkerUrl(workerUrl);

type Props = { visible: string[]; active: string | null; onSelect: (name: string) => void; lang: "tr" | "en" };

export default function PlacesMap({ visible, active, onSelect, lang }: Props) {
  const el = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);
  const markers = useRef<Record<string, { m: maplibregl.Marker; node: HTMLElement }>>({});

  useEffect(() => {
    if (!el.current) return;
    const m = new maplibregl.Map({
      container: el.current,
      style: "https://tiles.openfreemap.org/styles/positron",
      center: [BOCCONI.lng, BOCCONI.lat],
      zoom: 14,
      attributionControl: { compact: true },
    });
    map.current = m;
    m.addControl(new maplibregl.NavigationControl({ showCompass: false }), "top-right");
    // The compact attribution starts expanded and covers the map on phones; start it collapsed
    m.once("load", () => el.current?.querySelector(".maplibregl-ctrl-attrib")?.classList.remove("maplibregl-compact-show"));

    const home = document.createElement("div");
    home.className = "map-pin-home";
    home.textContent = "B";
    new maplibregl.Marker({ element: home }).setLngLat([BOCCONI.lng, BOCCONI.lat]).addTo(m);

    places.forEach((p) => {
      const node = document.createElement("button");
      node.className = "map-pin";
      node.dataset["cat"] = p.cat;
      node.innerHTML = `<span>${placeCats[p.cat].emoji}</span>`;
      node.addEventListener("click", (e) => { e.stopPropagation(); onSelect(p.name); });
      markers.current[p.name] = { m: new maplibregl.Marker({ element: node, anchor: "bottom" }).setLngLat([p.lng, p.lat]).addTo(m), node };
    });
    return () => m.remove();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    Object.entries(markers.current).forEach(([name, { node }]) => {
      node.style.display = visible.includes(name) ? "" : "none";
      node.classList.toggle("is-active", name === active);
    });
  }, [visible, active]);

  useEffect(() => {
    const p = places.find((x) => x.name === active);
    if (p && map.current) map.current.flyTo({ center: [p.lng, p.lat], zoom: 15.5, speed: 1.2 });
  }, [active]);

  return <div ref={el} className="h-full w-full" aria-label={lang === "tr" ? "Mekan haritası" : "Places map"} />;
}

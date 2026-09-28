"use client";

import { useRef } from "react";
import { Asset } from "@/components/ui/Asset";
import { shots, type Shot } from "@/content/sources";
import { gsap, useScene } from "@/lib/gsap";

// 03 · Fragmentação. O título fica; os pontos de contato reais passam em
// escalas, velocidades e linguagens diferentes. Sem juízo: o contraste mostra.

type Item = {
  shot: Shot;
  d: [number, number, number]; // left vw, top vh (no campo), width vw
  m: [number, number, number];
  speed: number; // deslocamento extra em vh ao atravessar a cena
};

const items: Item[] = [
  { shot: shots.ytCapa, d: [47, 6, 34], m: [30, 4, 78], speed: 40 },
  { shot: shots.igProposito, d: [86, 30, 17], m: [-10, 40, 44], speed: 70 },
  { shot: shots.igCura, d: [60, 62, 15], m: [58, 58, 46], speed: 20 },
  { shot: shots.siteHome, d: [70, 98, 38], m: [22, 92, 90], speed: 55 },
  { shot: shots.igEspecialidade, d: [-4, 118, 16], m: [-14, 134, 46], speed: 30 },
  { shot: shots.igNarrativa, d: [40, 132, 17], m: [52, 150, 50], speed: 80 },
  { shot: shots.perfilPreco, d: [84, 158, 13], m: [8, 186, 36], speed: 35 },
  { shot: shots.igProfissional, d: [58, 184, 18], m: [52, 212, 48], speed: 60 },
  { shot: shots.igInvestimento, d: [22, 206, 14], m: [-6, 246, 42], speed: 25 },
];

export function Fragmentos() {
  const root = useRef<HTMLElement>(null);

  useScene(root, ({ root: el }) => {
    gsap.utils.toArray<HTMLElement>(el.querySelectorAll("[data-drift]")).forEach((node) => {
      const speed = Number(node.dataset.drift);
      gsap.fromTo(
        node,
        { y: () => (window.innerHeight * speed) / 200 },
        {
          y: () => (-window.innerHeight * speed) / 200,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true, invalidateOnRefresh: true },
        },
      );
    });
  });

  return (
    <section
      ref={root}
      aria-labelledby="frag-title"
      className="relative overflow-x-clip px-5 py-24 md:px-[6vw] anim:h-[290vh] anim:p-0 md:anim:h-[260vh]"
    >
      <div className="relative z-10 anim:sticky anim:text-white anim:mix-blend-difference anim:top-[14vh] anim:px-5 md:anim:top-[34vh] md:anim:px-[6vw]">
        <p className="micro text-mute anim:text-white/70">Hoje</p>
        <h2 id="frag-title" className="display mt-3 max-w-[9ch] text-[15vw] md:text-[7.6vw]">
          Diferentes pontos de contato.
        </h2>
      </div>

      <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 anim:absolute anim:inset-0 anim:mt-0 anim:block">
        {items.map((it) => (
          <div
            key={it.shot.src}
            data-drift={it.speed}
            className="anim:absolute anim:left-[var(--ml)] anim:top-[var(--mt)] anim:w-[var(--mw)] md:anim:left-[var(--dl)] md:anim:top-[var(--dt)] md:anim:w-[var(--dw)]"
            style={
              {
                "--dl": `${it.d[0]}vw`, "--dt": `${it.d[1]}vh`, "--dw": `${it.d[2]}vw`,
                "--ml": `${it.m[0]}vw`, "--mt": `${it.m[1]}vh`, "--mw": `${it.m[2]}vw`,
              } as React.CSSProperties
            }
          >
            <Asset shot={it.shot} sizes="(min-width: 768px) 30vw, 80vw" />
          </div>
        ))}
      </div>

      <p className="micro relative z-10 mt-10 max-w-[40ch] text-mute anim:absolute anim:bottom-8 anim:left-5 anim:mt-0 md:anim:left-[6vw]">
        Capturas públicas de Instagram, YouTube e site, em 27 e 28/09/2026.
      </p>
    </section>
  );
}

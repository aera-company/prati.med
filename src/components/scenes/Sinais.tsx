"use client";

import { useRef } from "react";
import { gsap, useScene } from "@/lib/gsap";

// 08 · Dados. Editorial, não dashboard: quatro linhas, e "—" onde ainda
// não existe leitura. Nenhum número inventado.

const signals = [
  { step: "Conteúdo", reading: "visitas" },
  { step: "Perfil", reading: "interesse" },
  { step: "Agenda", reading: "início" },
  { step: "Consulta", reading: "conclusão" },
];

export function Sinais() {
  const root = useRef<HTMLElement>(null);

  useScene(root, ({ root: el }) => {
    const q = gsap.utils.selector(el);
    gsap.from(q("[data-head] .line-inner"), {
      yPercent: 130,
      stagger: 0.08,
      duration: 0.9,
      ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 60%", toggleActions: "play none none reverse" },
    });
    q<HTMLElement>("[data-row]").forEach((row) => {
      gsap.timeline({ scrollTrigger: { trigger: row, start: "top 88%", toggleActions: "play none none reverse" } })
        .from(row.querySelector("[data-rule]"), { scaleX: 0, transformOrigin: "left", duration: 0.8, ease: "power3.inOut" })
        .from(row.querySelectorAll(".line-inner"), { yPercent: 130, stagger: 0.06, duration: 0.7, ease: "power3.out" }, 0.2);
    });
  });

  return (
    <section ref={root} aria-labelledby="sinais-title" className="relative bg-graphite px-5 py-32 text-white md:px-[5vw] md:py-48">
      <h2 id="sinais-title" data-head className="display text-[clamp(48px,15vw,90px)] md:text-[clamp(72px,10vw,200px)]">
        <span className="line-mask"><span className="line-inner">Cada etapa</span></span>
        <span className="line-mask"><span className="line-inner">deixa um <span className="text-violet">sinal.</span></span></span>
      </h2>

      <ol className="mt-24 md:mt-36">
        {signals.map((s) => (
          <li key={s.step} data-row className="relative grid grid-cols-[1fr_auto] items-end gap-x-6 py-5 md:grid-cols-[1fr_12vw_auto] md:py-7">
            <span data-rule aria-hidden className="absolute inset-x-0 top-0 h-px bg-white/20" />
            <span className="line-mask display text-[clamp(40px,12vw,72px)] md:text-[clamp(56px,7vw,140px)]">
              <span className="line-inner">{s.step}</span>
            </span>
            <span className="line-mask micro col-start-1 row-start-2 text-white/50 md:col-start-2 md:row-start-1 md:pb-[1.2vw]">
              <span className="line-inner">{s.reading}</span>
            </span>
            <span className="line-mask display row-span-2 text-[clamp(40px,12vw,72px)] text-violet md:row-span-1 md:text-[clamp(56px,7vw,140px)]" aria-label="sem dado">
              <span className="line-inner">—</span>
            </span>
          </li>
        ))}
      </ol>

      <p className="micro mt-10 text-white/50">Exemplo conceitual. Indicadores serão definidos com a Pratimed.</p>
    </section>
  );
}

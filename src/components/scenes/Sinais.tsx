"use client";

import { useRef } from "react";
import { gsap, useScene } from "@/lib/gsap";

// 08 · Dados. Quatro sinais, sem números: "—" é a leitura que ainda não existe.

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
    const tl = gsap.timeline({
      scrollTrigger: { trigger: el, start: "top 55%", toggleActions: "play none none reverse" },
    });
    tl.from(q(".line-inner"), { yPercent: 130, stagger: 0.08, duration: 0.9, ease: "power3.out" })
      .from(q("[data-sig]"), { autoAlpha: 0, y: 30, stagger: 0.12, duration: 0.7, ease: "power2.out" }, 0.3)
      .from(q("[data-bar]"), { scaleX: 0, transformOrigin: "left", stagger: 0.12, duration: 0.8, ease: "power3.inOut" }, 0.4);
  });

  return (
    <section
      ref={root}
      aria-labelledby="sinais-title"
      className="relative bg-graphite px-5 py-28 text-white md:px-[6vw] md:py-40"
    >
      <h2 id="sinais-title" className="display text-[14vw] md:text-[8vw]">
        <span className="line-mask"><span className="line-inner">Cada etapa deixa</span></span>
        <span className="line-mask"><span className="line-inner">um <span className="text-violet">sinal.</span></span></span>
      </h2>

      <ol className="mt-20 grid grid-cols-2 gap-x-5 gap-y-14 md:mt-28 md:grid-cols-4 md:gap-x-[2vw]">
        {signals.map((s) => (
          <li key={s.step} data-sig className="flex flex-col gap-3">
            <span data-bar aria-hidden className="h-[2px] bg-violet" />
            <p className="text-[17px] font-medium md:text-[19px]">{s.step}</p>
            <p className="micro text-white/55">{s.reading}</p>
            <p className="display -mt-[0.15em] text-[30vw] leading-none text-violet md:text-[15vw]" aria-label="sem dado">
              —
            </p>
          </li>
        ))}
      </ol>

      <p className="micro mt-16 max-w-[48ch] text-white/55">
        Indicadores ilustrativos. Os dados serão definidos com a Pratimed.
      </p>
    </section>
  );
}

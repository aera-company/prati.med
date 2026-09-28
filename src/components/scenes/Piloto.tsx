"use client";

import { useRef } from "react";
import { gsap, useScene } from "@/lib/gsap";

// 10 · Piloto. Quatro números e cinco verbos. Escopo completo, papéis e
// cronograma ficam no painel "Fontes e notas" (content/sources.ts).

const figures = [
  { n: "01", label: "jornada" },
  { n: "03–05", label: "profissionais" },
  { n: "02–03", label: "conteúdos" },
  { n: "30", label: "dias" },
];

const VERBS = ["Escolher.", "Conectar.", "Colocar no ar.", "Medir.", "Aprender."];

export function Piloto() {
  const root = useRef<HTMLElement>(null);

  useScene(root, ({ root: el }) => {
    const q = gsap.utils.selector(el);
    gsap.from(q("[data-fig] .line-inner"), {
      yPercent: 130,
      stagger: 0.08,
      duration: 0.9,
      ease: "power3.out",
      scrollTrigger: { trigger: q("[data-figs]")[0], start: "top 80%", toggleActions: "play none none reverse" },
    });
    gsap.fromTo(q("[data-verb]"), { opacity: 0.14 }, {
      opacity: 1,
      stagger: 0.3,
      ease: "none",
      scrollTrigger: { trigger: q("[data-verbs]")[0], start: "top 85%", end: "bottom 55%", scrub: 0.4 },
    });
  });

  return (
    <section ref={root} aria-labelledby="piloto-title" className="relative bg-paper-2 px-5 py-32 md:px-[5vw] md:py-48">
      <h2 id="piloto-title" className="display-wide text-[clamp(28px,8vw,44px)] md:text-[clamp(32px,3vw,56px)]">
        Primeiro piloto
      </h2>

      <ol data-figs className="mt-16 grid grid-cols-2 gap-x-4 gap-y-14 md:mt-24 md:grid-cols-[1fr_1.5fr_1.5fr_1fr] md:gap-x-[2vw]">
        {figures.map((f) => (
          <li key={f.label} data-fig>
            <p className="display whitespace-nowrap text-[clamp(56px,17vw,100px)] md:text-[clamp(96px,9vw,190px)]">
              <span className="line-mask"><span className="line-inner">{f.n}</span></span>
            </p>
            <p className="mt-3 text-[16px] md:text-[clamp(17px,1.4vw,24px)]">{f.label}</p>
          </li>
        ))}
      </ol>

      <p data-verbs className="display mt-32 text-[clamp(44px,13vw,80px)] md:mt-48 md:text-[clamp(64px,7.2vw,150px)]">
        {VERBS.map((v, i) => (
          <span key={v} data-verb className={`anim:opacity-15 ${i === VERBS.length - 1 ? "text-violet-ink" : ""}`}>
            {v}{" "}
          </span>
        ))}
      </p>
    </section>
  );
}

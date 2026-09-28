"use client";

import { useRef } from "react";
import { PathLine, PmLogo, ProPhoto } from "@/components/pm/parts";
import { amanda } from "@/content/pros";
import { gsap, useScene } from "@/lib/gsap";

// 06 · Identidade. Cena roxa, curta: três palavras e os elementos do sistema
// orbitando. Não é manual de marca; é o que já apareceu no caso, em síntese.

const WORDS = ["Reconhecimento.", "Clareza.", "Continuidade."];

export function Identidade() {
  const root = useRef<HTMLElement>(null);

  useScene(root, ({ root: el }) => {
    const q = gsap.utils.selector(el);
    gsap.from(q(".line-inner"), {
      yPercent: 130,
      stagger: 0.12,
      ease: "power3.out",
      duration: 1,
      scrollTrigger: { trigger: el, start: "top 60%", toggleActions: "play none none reverse" },
    });
    q<HTMLElement>("[data-orbit]").forEach((n) => {
      const s = Number(n.dataset.orbit);
      gsap.fromTo(n, { y: () => window.innerHeight * s * 0.004 }, {
        y: () => -window.innerHeight * s * 0.004,
        rotation: s % 2 ? 4 : -4,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true, invalidateOnRefresh: true },
      });
    });
  });

  return (
    <section
      ref={root}
      aria-label="O sistema proposto"
      className="pm relative overflow-hidden bg-violet px-5 py-28 text-ink md:px-[6vw] md:py-40"
    >
      <h2 className="display relative z-10 text-[16vw] md:text-[12.5vw]">
        {WORDS.map((w, i) => (
          <span key={w} className={`line-mask ${i === 1 ? "md:pl-[18vw]" : i === 2 ? "md:pl-[6vw]" : ""}`}>
            <span className="line-inner">{w}</span>
          </span>
        ))}
      </h2>

      {/* Elementos do sistema, soltos no espaço */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div data-orbit="30" className="absolute right-[5vw] top-[5%] rounded-2xl bg-[var(--pm-paper)] p-4 shadow-xl md:p-5">
          <PmLogo className="w-24 md:w-32" />
        </div>
        <div data-orbit="55" className="absolute bottom-[7%] right-[24vw] hidden rounded-2xl bg-ink p-5 text-[var(--pm-paper)] shadow-xl md:block">
          <p className="pm-q text-[64px]">Aa</p>
          <p className="micro mt-2 opacity-70">Instrument Sans · condensada</p>
        </div>
        <div data-orbit="20" className="absolute bottom-[5%] right-[5vw] flex overflow-hidden rounded-xl shadow-xl">
          {["#231a4f", "#5b45d6", "#9479f7", "#eee9ff", "#fbfaf7"].map((c) => (
            <span key={c} className="h-14 w-8 md:h-20 md:w-12" style={{ background: c }} />
          ))}
        </div>
        <div data-orbit="70" className="absolute bottom-[9%] left-[34vw] hidden items-center whitespace-nowrap gap-3 rounded-full bg-[var(--pm-paper)] px-4 py-3 text-[14px] font-semibold shadow-xl md:flex">
          <span className="size-2.5 rounded-full bg-[var(--pm-open)]" />
          R$ 150 · 28/09, 13h
        </div>
        <div data-orbit="45" className="absolute right-[4vw] top-[30%] w-24 md:right-[6vw] md:top-[34%] md:w-32">
          <ProPhoto pro={amanda} className="relative aspect-[4/5] w-full rounded-2xl shadow-xl" />
        </div>
        <div data-orbit="35" className="absolute bottom-[4%] left-[6vw] w-[40vw] text-[26px] md:w-[22vw] md:text-[40px]">
          <PathLine className="w-full" />
        </div>
      </div>
    </section>
  );
}

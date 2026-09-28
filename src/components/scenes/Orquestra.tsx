"use client";

import { useRef } from "react";
import { gsap, useScene } from "@/lib/gsap";

// 09 · Papel da AERA. Sem organograma: os parceiros aparecem soltos, cada
// um com sua seta apontando para um lado; no scroll, todas as setas giram
// até a mesma direção. A AERA entra em escala, com o que ela assume.

const partners = [
  { who: "Sócios da Pratimed", d: [58, 50, -38], m: [44, 46, -38] },
  { who: "Conteúdo e mídia", d: [76, 60, 52], m: [6, 52, 52] },
  { who: "Site, CRM e dados", d: [62, 72, 145], m: [46, 58, 145] },
  { who: "Equipe clínica", d: [82, 80, -120], m: [10, 64, 200] },
  { who: "Jurídico", d: [70, 88, 95], m: [56, 70, 95] },
];

const ROLES = ["Marca", "Jornada", "Direção", "Dados"];

export function Orquestra() {
  const root = useRef<HTMLElement>(null);

  useScene(root, ({ desktop, root: el }) => {
    const q = gsap.utils.selector(el);
    gsap.set(q("[data-b] .line-inner, [data-aera] .line-inner"), { yPercent: 160, opacity: 1 });
    gsap.set(q("[data-role]"), { autoAlpha: 0, x: -16 });

    const tl = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: { trigger: el, start: "top top", end: desktop ? "+=190%" : "+=210%", scrub: 0.5, pin: true },
    });
    tl.to({}, { duration: 0.15 })
      .to(q("[data-a]"), { opacity: 0.25, duration: 0.2 }, 0.15)
      .to(q("[data-b] .line-inner"), { yPercent: 0, stagger: 0.05, duration: 0.25, ease: "power3.out" }, 0.18)
      .to(q("[data-arrow]"), { rotation: 0, duration: 0.45, stagger: 0.04, ease: "power2.inOut" }, 0.45)
      .to(q("[data-partner]"), { x: () => (desktop ? 24 : 10), duration: 0.45, ease: "power2.inOut" }, 0.5)
      .to(q("[data-aera] .line-inner"), { yPercent: 0, duration: 0.3, ease: "power3.out" }, 0.6)
      .to(q("[data-role]"), { autoAlpha: 1, x: 0, stagger: 0.05, duration: 0.15 }, 0.75)
      .to({}, { duration: 0.15 });
  });

  return (
    <section
      ref={root}
      aria-labelledby="orq-title"
      className="relative overflow-hidden px-5 py-32 md:px-[5vw] anim:h-svh anim:py-0 anim:pt-[11vh]"
    >
      <h2 id="orq-title" className="display text-[clamp(38px,10vw,64px)] md:text-[clamp(64px,6vw,130px)]">
        <span data-a className="block">Não é sobre substituir quem já faz.</span>
        <span data-b className="mt-2 block">
          <span className="line-mask"><span className="line-inner anim:opacity-0">É sobre fazer todos trabalharem</span></span>
          <span className="line-mask"><span className="line-inner anim:opacity-0">na <span className="text-violet-ink">mesma direção.</span></span></span>
        </span>
      </h2>

      {/* AERA e o que ela assume */}
      <div className="mt-20 flex items-end gap-5 anim:absolute anim:bottom-[5vh] anim:left-5 anim:mt-0 md:anim:bottom-[7vh] md:gap-[2vw] md:anim:left-[5vw]">
        <p data-aera className="display text-[clamp(72px,24vw,140px)] leading-[0.8] md:text-[clamp(120px,15vw,300px)]">
          <span className="line-mask"><span className="line-inner anim:opacity-0">AERA</span></span>
        </p>
        <ul className="flex flex-col gap-1 pb-[0.6em] text-[15px] font-medium text-violet-ink md:text-[clamp(16px,1.4vw,24px)]">
          {ROLES.map((r) => (
            <li key={r} data-role>{r}</li>
          ))}
        </ul>
      </div>

      {/* Parceiros soltos, cada um com sua direção */}
      <ul className="mt-12 flex flex-col gap-3 anim:absolute anim:inset-0 anim:mt-0 anim:block" aria-label="Parceiros">
        {partners.map((p) => (
          <li
            key={p.who}
            data-partner
            className="display-wide flex items-center gap-3 text-[clamp(17px,4.6vw,24px)] md:text-[clamp(20px,1.9vw,36px)] anim:absolute anim:left-[var(--ml)] anim:top-[var(--mt)] md:anim:left-[var(--dl)] md:anim:top-[var(--dt)]"
            style={{ "--dl": `${p.d[0]}vw`, "--dt": `${p.d[1]}vh`, "--ml": `${p.m[0]}vw`, "--mt": `${p.m[1]}vh` } as React.CSSProperties}
          >
            <span className="whitespace-nowrap">{p.who}</span>
            <span
              data-arrow
              aria-hidden
              className="inline-block text-[1.4em] leading-none text-violet-ink anim:[transform:rotate(var(--r))] md:anim:[transform:rotate(var(--rd))]"
              style={{ "--r": `${p.m[2]}deg`, "--rd": `${p.d[2]}deg` } as React.CSSProperties}
            >
              →
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

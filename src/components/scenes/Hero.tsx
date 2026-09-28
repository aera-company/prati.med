"use client";

import { useRef } from "react";
import { Asset } from "@/components/ui/Asset";
import { shots, type Shot } from "@/content/sources";
import { gsap, useScene } from "@/lib/gsap";
import { layoutBox } from "@/lib/layout";

// 01 · Hero. Fragmentos → conexão.
// Objetos reais da Pratimed espalhados em escalas e ângulos diferentes; no
// scroll eles se alinham numa mesma linha, e a afirmação dá lugar à próxima.
// Sem movimento: as duas frases e a linha de objetos, em fluxo normal.

type Piece = {
  shot: Shot;
  aspect: string; // proporção do encaixe final (slot)
  // posição solta: [left vw, top vh, width vw, rotação] desktop / mobile
  d: [number, number, number, number];
  m: [number, number, number, number];
  z?: string;
};

const pieces: Piece[] = [
  { shot: shots.igCura, aspect: "620/828", d: [-3, 57, 15, -6], m: [-12, 60, 36, -6] },
  { shot: shots.ytCapa, aspect: "1280/720", d: [67, 10, 38, 4], m: [42, 9, 72, 4] },
  { shot: shots.siteHome, aspect: "1400/875", d: [73, 58, 31, -3], m: [60, 67, 58, -3] },
  { shot: shots.cardAmanda, aspect: "416/379", d: [41, 80, 19, 2.5], m: [18, 84, 50, 2.5], z: "z-20" },
  { shot: shots.agendaCalendario, aspect: "400/380", d: [58, 50, 7, 0], m: [74, 49, 20, 0] },
];

const LINE_1 = ["A Pratimed", "já tem atenção."];
const LINE_1_M = ["A Pratimed", "já tem", "atenção."];
const LINE_2 = ["Agora essa atenção", "precisa virar", "escolha."];

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useScene(root, ({ desktop, root: el }) => {
    const q = gsap.utils.selector(el);
    const loose = q<HTMLElement>("[data-loose]");
    const slots = q<HTMLElement>("[data-slot]");

    const tl = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        trigger: el,
        start: "top top",
        end: desktop ? "+=220%" : "+=200%",
        scrub: 0.6,
        pin: true,
        invalidateOnRefresh: true,
      },
    });

    // Afirmação sai pelo topo, linha a linha.
    tl.to(q(desktop ? "[data-l1d] .line-inner" : "[data-l1m] .line-inner"), {
      yPercent: -150,
      stagger: 0.04,
      duration: 0.3,
      ease: "power2.in",
    }, 0);

    // Cada fragmento viaja até o seu encaixe na linha (FLIP por offset).
    loose.forEach((p, i) => {
      const slot = slots[i];
      tl.to(
        p,
        {
          x: () => layoutBox(slot, el).x - layoutBox(p, el).x,
          y: () => layoutBox(slot, el).y - layoutBox(p, el).y,
          scale: () => slot.offsetWidth / p.offsetWidth,
          rotation: 0,
          opacity: 1,
          duration: 0.45,
          ease: "power2.inOut",
        },
        0.08 + i * 0.03,
      );
    });

    // Estado inicial da segunda frase: fora da máscara, já visível ao GSAP.
    gsap.set(q("[data-l2] .line-inner"), { y: 0, yPercent: 130, opacity: 1 });
    tl.to(q("[data-l2] .line-inner"), {
      yPercent: 0,
      stagger: 0.05,
      duration: 0.25,
      ease: "power3.out",
    }, 0.34);
    tl.fromTo(q("[data-link]"), { scaleX: 0, opacity: 1 }, { scaleX: 1, opacity: 1, duration: 0.2, ease: "power2.out" }, 0.58);
    tl.fromTo(q("[data-coda]"), { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.15 }, 0.74);
    tl.to({}, { duration: 0.12 });
  });

  return (
    <section
      ref={root}
      id="inicio"
      aria-labelledby="hero-title"
      className="relative flex min-h-svh flex-col gap-10 overflow-hidden px-5 pb-16 pt-28 md:px-[6vw] anim:block anim:h-svh anim:p-0"
    >
      {/* Afirmação */}
      <h1 id="hero-title" className="display relative z-10 text-[19vw] md:text-[12.2vw] anim:absolute anim:left-5 anim:top-[21vh] md:anim:left-[6vw] md:anim:top-[15vh]">
        <span data-l1d className="hidden md:block">
          {LINE_1.map((l) => (
            <span key={l} className="line-mask"><span className="line-inner">{l}</span></span>
          ))}
        </span>
        <span data-l1m className="md:hidden">
          {LINE_1_M.map((l) => (
            <span key={l} className="line-mask"><span className="line-inner">{l}</span></span>
          ))}
        </span>
      </h1>

      {/* Consequência */}
      <p data-l2 className="display relative z-10 text-[10.4vw] md:text-[7.4vw] anim:absolute anim:left-5 anim:top-[14vh] md:anim:left-[6vw] md:anim:top-[12vh]">
        {LINE_2.map((l, i) => (
          <span key={l} className="line-mask">
            <span className={`line-inner anim:opacity-0 ${i === 2 ? "text-violet-ink" : ""}`}>{l}</span>
          </span>
        ))}
      </p>

      {/* Linha de chegada: encaixes dos fragmentos */}
      <div className="relative z-0 anim:absolute anim:inset-x-0 anim:top-[57vh] anim:flex anim:justify-center md:anim:top-[56vh]">
      <div className="relative flex flex-wrap items-center gap-3 anim:w-max anim:shrink-0 anim:flex-nowrap md:gap-[1.1vw]">
        <span
          data-link
          aria-hidden
          className="absolute inset-x-[-4vw] top-1/2 hidden h-[2px] origin-left bg-violet anim:block anim:opacity-0"
        />
        {pieces.map((p) => (
          <div
            key={p.shot.src}
            data-slot
            className="relative h-[24vw] md:h-[21vh] anim:h-[15vh] md:anim:h-[21vh]"
            style={{ aspectRatio: p.aspect }}
          >
            <Asset shot={p.shot} className="h-full anim:hidden [&_img]:h-full [&_img]:w-auto" sizes="30vw" />
          </div>
        ))}
      </div>
      </div>

      {/* Fragmentos soltos (só no layout animado) */}
      <div aria-hidden className="pointer-events-none absolute inset-0 hidden anim:block">
        {pieces.map((p, i) => (
          <div
            key={p.shot.src}
            data-loose
            className={`absolute origin-top-left ${p.z ?? "z-0"} left-[var(--ml)] top-[var(--mt)] w-[var(--mw)] [transform:rotate(var(--mr))] md:left-[var(--dl)] md:top-[var(--dt)] md:w-[var(--dw)] md:[transform:rotate(var(--dr))]`}
            style={
              {
                "--dl": `${p.d[0]}vw`, "--dt": `${p.d[1]}vh`, "--dw": `${p.d[2]}vw`, "--dr": `${p.d[3]}deg`,
                "--ml": `${p.m[0]}vw`, "--mt": `${p.m[1]}vh`, "--mw": `${p.m[2]}vw`, "--mr": `${p.m[3]}deg`,
              } as React.CSSProperties
            }
          >
            <Asset shot={p.shot} priority={i < 3} sizes="(min-width: 768px) 38vw, 72vw" />
          </div>
        ))}
      </div>

      {/* Coda */}
      <div data-coda className="relative z-10 anim:opacity-0 flex flex-col gap-3 anim:absolute anim:bottom-8 anim:left-5 anim:right-5 md:anim:bottom-10 md:anim:left-[6vw] md:anim:right-[6vw] md:flex-row md:items-end md:justify-between">
        <p className="display-wide text-[8vw] md:text-[3.2vw]">Da atenção à consulta.</p>
        <p className="max-w-[34ch] text-[14px] leading-snug text-mute md:text-right md:text-[15px]">
          Conteúdo, marca, profissionais e agendamento funcionando como uma única experiência.
        </p>
      </div>
    </section>
  );
}

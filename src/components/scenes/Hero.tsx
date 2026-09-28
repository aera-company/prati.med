"use client";

import { useRef } from "react";
import { Asset } from "@/components/ui/Asset";
import { shots, type Shot } from "@/content/sources";
import { gsap, useScene } from "@/lib/gsap";
import { layoutBox } from "@/lib/layout";

// 01 · Hero. Tipografia como arquitetura; objetos reais soltos no espaço.
// No scroll: a afirmação sai, os fragmentos se alinham numa linha e a frase
// seguinte ocupa a tela. Fragmentos → conexão.

type Piece = {
  shot: Shot;
  aspect: string;
  d: [number, number, number, number]; // left vw, top vh, width vw, rotação (desktop)
  m: [number, number, number, number]; // idem (mobile)
};

const pieces: Piece[] = [
  { shot: shots.igNarrativa, aspect: "620/828", d: [79, 4, 27, 5], m: [58, 5, 58, 5] },
  { shot: shots.ytCapa, aspect: "1280/720", d: [52, 62, 17, -4], m: [46, 62, 46, -4] },
  { shot: shots.siteHome, aspect: "1400/875", d: [70, 76, 30, 2], m: [-18, 74, 70, 2] },
  { shot: shots.cardAmanda, aspect: "416/379", d: [28, 86, 17, 3], m: [30, 88, 44, 3] },
  { shot: shots.agendaCalendario, aspect: "400/380", d: [-5, 50, 13, -2], m: [-10, 50, 30, -2] },
];

const L1_D = ["A Pratimed", "já tem atenção."];
const L1_M = ["A Pratimed", "já tem", "atenção."];
const L2 = ["Agora essa atenção", "precisa encontrar", "um caminho até", "a consulta."];

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useScene(root, ({ desktop, root: el }) => {
    const q = gsap.utils.selector(el);
    const loose = q<HTMLElement>("[data-loose]");
    const slots = q<HTMLElement>("[data-slot]");
    gsap.set(q("[data-l2] .line-inner"), { y: 0, yPercent: 130, opacity: 1 });

    const tl = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        trigger: el,
        start: "top top",
        end: desktop ? "+=170%" : "+=160%",
        scrub: 0.5,
        pin: true,
        invalidateOnRefresh: true,
      },
    });

    // A afirmação sobe e escala para longe.
    tl.to(q(desktop ? "[data-l1d]" : "[data-l1m]"), { scale: 0.82, transformOrigin: "left top", duration: 0.3 }, 0);
    tl.to(q(desktop ? "[data-l1d] .line-inner" : "[data-l1m] .line-inner"), {
      yPercent: -160,
      stagger: 0.04,
      duration: 0.28,
      ease: "power2.in",
    }, 0.02);

    loose.forEach((p, i) => {
      const slot = slots[i];
      tl.to(p, {
        x: () => layoutBox(slot, el).x - layoutBox(p, el).x,
        y: () => layoutBox(slot, el).y - layoutBox(p, el).y,
        scale: () => slot.offsetWidth / p.offsetWidth,
        rotation: 0,
        duration: 0.42,
        ease: "power3.inOut",
      }, 0.06 + i * 0.025);
    });

    tl.to(q("[data-l2] .line-inner"), { yPercent: 0, stagger: 0.045, duration: 0.24, ease: "power3.out" }, 0.3);
    tl.fromTo(q("[data-link]"), { scaleX: 0, opacity: 1 }, { scaleX: 1, duration: 0.2, ease: "power2.out" }, 0.5);
    tl.fromTo(q("[data-coda]"), { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.14 }, 0.64);
    tl.to({}, { duration: 0.1 });
  });

  return (
    <section
      ref={root}
      id="inicio"
      aria-labelledby="hero-title"
      className="relative flex min-h-svh flex-col gap-10 overflow-hidden bg-paper px-5 pb-16 pt-28 md:px-[5vw] anim:block anim:h-svh anim:p-0"
    >
      <h1
        id="hero-title"
        className="display relative z-10 text-[clamp(56px,19vw,110px)] md:text-[clamp(72px,13vw,240px)] anim:absolute anim:left-5 anim:top-[18vh] anim:text-white anim:mix-blend-difference md:anim:left-[5vw] md:anim:top-[13vh]"
      >
        <span data-l1d className="hidden md:block">
          {L1_D.map((l) => (
            <span key={l} className="line-mask"><span className="line-inner">{l}</span></span>
          ))}
        </span>
        <span data-l1m className="md:hidden">
          {L1_M.map((l) => (
            <span key={l} className="line-mask"><span className="line-inner">{l}</span></span>
          ))}
        </span>
      </h1>

      <p
        data-l2
        className="display relative z-10 text-[clamp(38px,10.8vw,64px)] md:text-[clamp(64px,8.6vw,170px)] anim:absolute anim:left-5 anim:top-[12vh] md:anim:left-[5vw] md:anim:top-[9vh]"
      >
        {L2.map((l, i) => (
          <span key={l} className="line-mask">
            <span className={`line-inner anim:opacity-0 ${i === L2.length - 1 ? "text-violet-ink" : ""}`}>{l}</span>
          </span>
        ))}
      </p>

      {/* Linha de chegada */}
      <div className="relative z-0 anim:absolute anim:inset-x-0 anim:top-[62vh] anim:flex anim:justify-center md:anim:top-[66vh]">
        <div className="relative flex flex-wrap items-center gap-3 anim:w-max anim:shrink-0 anim:flex-nowrap md:gap-[1vw]">
          <span data-link aria-hidden className="absolute inset-x-[-6vw] top-1/2 hidden h-[2px] origin-left bg-violet anim:block anim:opacity-0" />
          {pieces.map((p) => (
            <div key={p.shot.src} data-slot className="relative h-[26vw] md:h-[17vh] anim:h-[14vh] md:anim:h-[17vh]" style={{ aspectRatio: p.aspect }}>
              <Asset shot={p.shot} className="h-full anim:hidden [&_img]:h-full [&_img]:w-auto" sizes="30vw" />
            </div>
          ))}
        </div>
      </div>

      {/* Objetos soltos */}
      <div aria-hidden className="pointer-events-none absolute inset-0 hidden anim:block">
        {pieces.map((p, i) => (
          <div
            key={p.shot.src}
            data-loose
            className="absolute origin-top-left left-[var(--ml)] top-[var(--mt)] w-[var(--mw)] [transform:rotate(var(--mr))] md:left-[var(--dl)] md:top-[var(--dt)] md:w-[var(--dw)] md:[transform:rotate(var(--dr))]"
            style={
              {
                "--dl": `${p.d[0]}vw`, "--dt": `${p.d[1]}vh`, "--dw": `${p.d[2]}vw`, "--dr": `${p.d[3]}deg`,
                "--ml": `${p.m[0]}vw`, "--mt": `${p.m[1]}vh`, "--mw": `${p.m[2]}vw`, "--mr": `${p.m[3]}deg`,
              } as React.CSSProperties
            }
          >
            <Asset shot={p.shot} priority={i < 3} sizes="(min-width: 768px) 30vw, 60vw" />
          </div>
        ))}
      </div>

      <div data-coda className="relative z-10 flex flex-col gap-2 anim:absolute anim:bottom-7 anim:left-5 anim:right-5 anim:opacity-0 md:anim:bottom-9 md:anim:left-[5vw] md:anim:right-[5vw] md:flex-row md:items-end md:justify-between">
        <p className="display-wide text-[clamp(28px,8vw,44px)] md:text-[clamp(32px,3vw,56px)]">Da atenção à consulta.</p>
        <p className="max-w-[36ch] text-[13px] leading-snug text-mute md:text-right md:text-[14px]">
          Conteúdo, profissionais, marca e agendamento funcionando como uma mesma experiência.
        </p>
      </div>
    </section>
  );
}

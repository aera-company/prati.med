"use client";

import { useRef } from "react";
import { PmCard, PmPost, PmThumb } from "@/components/pm/Surfaces";
import { Asset } from "@/components/ui/Asset";
import { shots, type Shot } from "@/content/sources";
import { gsap, useScene } from "@/lib/gsap";
import { layoutBox } from "@/lib/layout";

// 03 · Pontos de contato. Uma cena contínua: os materiais de hoje soltos,
// em escalas e ângulos diferentes → três deles se alinham num mesmo grid →
// trocam de pele, no lugar, para a mesma Pratimed. Os outros saem de cena.

type Loose = [number, number, number, number]; // left vw, top vh, width vw, rot

type Pair = { today: Shot; proposal: React.ReactNode; aspect: string; contain?: boolean; d: Loose; m: Loose };
type Extra = { shot: Shot; d: Loose; m: Loose };

const pairs: Pair[] = [
  { today: shots.igCura, proposal: <PmPost />, aspect: "4/5", d: [58, 14, 14, -6], m: [56, 38, 40, -6] },
  { today: shots.ytCapa, proposal: <PmThumb />, aspect: "16/9", d: [70, 40, 30, 3], m: [18, 60, 72, 3] },
  { today: shots.cardAmanda, proposal: <PmCard className="bg-[var(--pm-lilac)] p-[5%]" />, aspect: "3/4", contain: true, d: [49, 62, 14, 4], m: [-6, 42, 36, 4] },
];

const extras: Extra[] = [
  { shot: shots.igProposito, d: [86, 6, 13, 5], m: [68, 22, 34, 5] },
  { shot: shots.igNarrativa, d: [38, 54, 11, -4], m: [62, 78, 34, -4] },
  { shot: shots.siteHome, d: [78, 74, 30, -2], m: [-22, 84, 70, -2] },
  { shot: shots.perfilPreco, d: [93, 38, 9, 6], m: [2, 26, 24, 6] },
];

const vars = (d: Loose, m: Loose) =>
  ({
    "--dl": `${d[0]}vw`, "--dt": `${d[1]}vh`, "--dw": `${d[2]}vw`, "--dr": `${d[3]}deg`,
    "--ml": `${m[0]}vw`, "--mt": `${m[1]}vh`, "--mw": `${m[2]}vw`, "--mr": `${m[3]}deg`,
  }) as React.CSSProperties;

const LOOSE =
  "anim:absolute anim:origin-top-left anim:left-[var(--ml)] anim:top-[var(--mt)] anim:w-[var(--mw)] anim:[transform:rotate(var(--mr))] md:anim:left-[var(--dl)] md:anim:top-[var(--dt)] md:anim:w-[var(--dw)] md:anim:[transform:rotate(var(--dr))]";

export function Pontos() {
  const root = useRef<HTMLElement>(null);

  useScene(root, ({ desktop, root: el }) => {
    const q = gsap.utils.selector(el);
    const loose = q<HTMLElement>("[data-pair]");
    const slots = q<HTMLElement>("[data-slot]");
    const props = q<HTMLElement>("[data-prop]");
    gsap.set(q("[data-b] .line-inner"), { yPercent: 130, opacity: 1 });
    gsap.set(props, { clipPath: "inset(100% 0% 0% 0%)" });
    gsap.set(q("[data-state-b]"), { autoAlpha: 0 });

    const tl = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        trigger: el,
        start: "top top",
        end: desktop ? "+=240%" : "+=260%",
        scrub: 0.5,
        pin: true,
        invalidateOnRefresh: true,
      },
    });

    tl.to({}, { duration: 0.25 });
    // Saem os que não entram na fileira.
    tl.to(q("[data-extra]"), { autoAlpha: 0, scale: 0.7, yPercent: -40, stagger: 0.03, duration: 0.3, ease: "power2.in" }, 0.25);
    tl.to(q("[data-a] .line-inner"), { yPercent: -140, stagger: 0.04, duration: 0.3, ease: "power2.in" }, 0.3);
    // Os três restantes se alinham no mesmo grid.
    loose.forEach((p, i) => {
      const slot = slots[i];
      tl.to(p, {
        x: () => layoutBox(slot, el).x - layoutBox(p, el).x,
        y: () => layoutBox(slot, el).y - layoutBox(p, el).y,
        scale: () => slot.offsetWidth / p.offsetWidth,
        rotation: 0,
        duration: 0.5,
        ease: "power3.inOut",
      }, 0.3 + i * 0.04);
    });
    tl.to(q("[data-b] .line-inner"), { yPercent: 0, stagger: 0.05, duration: 0.3, ease: "power3.out" }, 0.6);
    // E trocam de pele, um a um.
    props.forEach((pr, i) => {
      tl.to(pr, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.3, ease: "power2.inOut" }, 0.95 + i * 0.22);
    });
    tl.to(q("[data-state-a]"), { autoAlpha: 0, duration: 0.1 }, 0.95);
    tl.to(q("[data-state-b]"), { autoAlpha: 1, duration: 0.1 }, 1.0);
    tl.to({}, { duration: 0.3 });
  });

  return (
    <section
      ref={root}
      aria-labelledby="pontos-title"
      className="relative overflow-hidden bg-paper px-5 py-28 md:px-[5vw] anim:h-svh anim:p-0"
    >
      {/* Estado A: hoje */}
      <div data-a className="relative z-10 anim:absolute anim:left-5 anim:top-[12vh] anim:text-white anim:mix-blend-difference md:anim:left-[5vw] md:anim:top-[11vh]">
        <p className="display-wide text-[clamp(24px,7vw,40px)] opacity-60 md:text-[clamp(28px,2.6vw,48px)]">
          <span className="line-mask"><span className="line-inner">Hoje.</span></span>
        </p>
        <h2 id="pontos-title" className="display text-[clamp(44px,13vw,80px)] md:text-[clamp(72px,9vw,180px)]">
          <span className="line-mask"><span className="line-inner">Diferentes</span></span>
          <span className="line-mask"><span className="line-inner">pontos de contato.</span></span>
        </h2>
      </div>

      {/* Estado B: a oportunidade */}
      <div data-b className="relative z-10 mt-16 anim:absolute anim:left-5 anim:top-[12vh] anim:mt-0 md:anim:left-[5vw] md:anim:top-[9vh]">
        <p className="display-wide text-[clamp(24px,7vw,40px)] text-mute md:text-[clamp(28px,2.6vw,48px)]">
          <span className="line-mask"><span className="line-inner anim:opacity-0">A oportunidade.</span></span>
        </p>
        <h2 className="display text-[clamp(40px,11.5vw,72px)] md:text-[clamp(64px,7.4vw,150px)]">
          <span className="line-mask"><span className="line-inner anim:opacity-0">Uma Pratimed</span></span>
          <span className="line-mask"><span className="line-inner anim:opacity-0 text-violet-ink">reconhecível</span></span>
          <span className="line-mask"><span className="line-inner anim:opacity-0">em cada passo.</span></span>
        </h2>
      </div>

      {/* Fileira de chegada (encaixes) */}
      <div className="hidden anim:absolute anim:inset-x-0 anim:bottom-[7vh] anim:flex anim:justify-center md:anim:justify-end md:anim:pr-[5vw]">
        <div className="flex w-max shrink-0 items-end gap-3 md:gap-[1.2vw]">
          {pairs.map((p) => (
            <div key={p.today.src} data-slot className="h-[28vh] md:h-[40vh]" style={{ aspectRatio: p.aspect }} />
          ))}
        </div>
        <p className="micro absolute bottom-[-4vh] right-5 text-mute md:right-[5vw]">
          <span data-state-a>Hoje</span>
          <span data-state-b className="absolute right-0 whitespace-nowrap text-violet-ink">Proposta AERA</span>
        </p>
      </div>

      {/* Objetos */}
      <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4 anim:absolute anim:inset-0 anim:mt-0 anim:block">
        {extras.map((e) => (
          <div key={e.shot.src} data-extra className={LOOSE} style={vars(e.d, e.m)}>
            <Asset shot={e.shot} sizes="(min-width: 768px) 30vw, 70vw" />
          </div>
        ))}
        {pairs.map((p) => (
          <div key={p.today.src} data-pair className={`col-span-2 grid grid-cols-2 gap-3 anim:block ${LOOSE}`} style={vars(p.d, p.m)}>
            <div className={`object relative ${p.contain ? "bg-paper-2" : ""}`} style={{ aspectRatio: p.aspect }} title={`${p.today.context} · capturado em ${p.today.captured}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.today.src} alt={p.today.alt} loading="lazy" className={`size-full ${p.contain ? "object-contain p-[7%]" : "object-cover object-top"}`} />
            </div>
            <div data-prop className="relative overflow-hidden rounded-[10px] anim:absolute anim:inset-0" style={{ aspectRatio: p.aspect }}>
              <div className="h-full [&>div]:h-full">{p.proposal}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

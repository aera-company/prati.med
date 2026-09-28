"use client";

import { useRef } from "react";
import { Asset, Chip } from "@/components/ui/Asset";
import { PmAgenda, PmCard, PmDestino, PmThumb, PmVideoCta, PmVideoOpen } from "@/components/pm/Surfaces";
import { shots } from "@/content/sources";
import { gsap, useScene } from "@/lib/gsap";

// 05 · Caso real. Um conteúdo publicado ("Terapia online funciona?") é
// reconstruído no palco, superfície por superfície, com a mesma identidade.
// Uma frase curta por estado. Sem movimento: a sequência em lista.

type State = {
  label: string;
  caption: string;
  shape: "wide" | "tall" | "phone" | "card"; // como a peça ocupa o palco
  node: React.ReactNode;
};

const states: State[] = [
  { label: "Hoje", caption: "Como o vídeo existe hoje.", shape: "wide", node: <Asset shot={shots.ytCapa} sizes="(min-width: 768px) 50vw, 90vw" /> },
  { label: "Capa", caption: "A pergunta vira a capa.", shape: "wide", node: <PmThumb className="overflow-hidden rounded-[10px]" /> },
  { label: "Abertura", caption: "O vídeo abre com a mesma pergunta.", shape: "tall", node: <PmVideoOpen className="overflow-hidden rounded-[14px]" /> },
  { label: "Identificação", caption: "Quem responde tem nome e registro.", shape: "tall", node: <PmVideoOpen lower className="overflow-hidden rounded-[14px]" /> },
  { label: "Chamada", caption: "O final aponta o próximo passo.", shape: "tall", node: <PmVideoCta className="overflow-hidden rounded-[14px]" /> },
  { label: "Destino", caption: "Uma página continua a conversa.", shape: "phone", node: <PmDestino /> },
  { label: "Profissional", caption: "Valor e horário, lado a lado.", shape: "card", node: <PmCard className="overflow-hidden rounded-[18px]" /> },
  { label: "Agenda", caption: "E a consulta, a um toque.", shape: "card", node: <PmAgenda className="overflow-hidden rounded-[18px]" /> },
];

const SHAPE: Record<State["shape"], string> = {
  wide: "anim:w-full",
  tall: "anim:w-auto anim:h-[min(100cqh,calc(100cqw*16/9))] anim:aspect-[9/16]",
  phone: "anim:w-auto anim:h-[min(100cqh,calc(100cqw*18.5/9))] anim:aspect-[9/18.5]",
  card: "anim:w-[min(88vw,52vh)] md:anim:w-[min(30vw,60vh)]",
};

export function CasoReal() {
  const root = useRef<HTMLElement>(null);

  useScene(root, ({ desktop, root: el }) => {
    const q = gsap.utils.selector(el);
    const layers = q<HTMLElement>("[data-layer]");
    const caps = q<HTMLElement>("[data-cap]");
    const ticks = q<HTMLElement>("[data-tick]");
    const chipToday = q("[data-chip-today]");
    const chipProp = q("[data-chip-prop]");

    gsap.set(layers.slice(1), { autoAlpha: 0 });
    gsap.set(caps.slice(1), { autoAlpha: 0, y: 16 });
    gsap.set(chipProp, { autoAlpha: 0 });

    const tl = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        trigger: el,
        start: "top top",
        end: desktop ? "+=620%" : "+=680%",
        scrub: 0.6,
        pin: true,
      },
    });

    tl.to({}, { duration: 0.5 });
    for (let i = 1; i < layers.length; i++) {
      const at = i;
      // Identificação entra no mesmo quadro da abertura: troca suave, sem máscara.
      const soft = states[i].label === "Identificação";
      tl.to(layers[i - 1], { scale: 0.9, autoAlpha: 0, duration: 0.45, ease: "power2.in" }, at);
      if (soft) {
        tl.fromTo(layers[i], { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.35 }, at + 0.1);
        tl.set(layers[i - 1], { scale: 1 }, at + 0.46);
      } else {
        tl.fromTo(
          layers[i],
          { autoAlpha: 1, clipPath: "inset(100% 0% 0% 0% round 14px)", scale: 1.06 },
          { clipPath: "inset(0% 0% 0% 0% round 14px)", scale: 1, duration: 0.55, ease: "power3.inOut" },
          at + 0.12,
        );
      }
      tl.to(caps[i - 1], { autoAlpha: 0, y: -16, duration: 0.25 }, at);
      tl.to(caps[i], { autoAlpha: 1, y: 0, duration: 0.3 }, at + 0.3);
      tl.to(ticks[i - 1], { opacity: 0.3, duration: 0.2 }, at + 0.2);
      tl.to(ticks[i], { opacity: 1, duration: 0.2 }, at + 0.2);
      if (i === 1) {
        tl.to(chipToday, { autoAlpha: 0, duration: 0.2 }, at);
        tl.to(chipProp, { autoAlpha: 1, duration: 0.2 }, at + 0.4);
      }
    }
    tl.to({}, { duration: 0.6 });
  });

  return (
    <section
      ref={root}
      aria-labelledby="caso-title"
      className="relative overflow-hidden bg-graphite px-5 py-24 text-white md:px-[6vw] anim:h-svh anim:p-0"
    >
      <h2
        id="caso-title"
        className="display max-w-[12ch] text-[12vw] anim:text-[10vw] md:text-[5.2vw] md:anim:text-[5.2vw] anim:absolute anim:left-5 anim:top-[10vh] md:anim:left-[6vw] md:anim:top-[14vh]"
      >
        Um conteúdo pode ser o começo de uma <span className="text-violet">jornada.</span>
      </h2>

      {/* Legenda do estado: uma frase */}
      <div className="hidden anim:absolute anim:bottom-[5vh] anim:left-5 anim:right-5 anim:block anim:h-[4.5em] md:anim:bottom-[19vh] md:anim:left-[6vw] md:anim:right-auto md:anim:w-[30vw]">
        {states.map((s) => (
          <p key={s.label} data-cap className="display-wide absolute inset-x-0 bottom-0 text-[6.4vw] text-white md:text-[2.3vw]">
            {s.caption}
          </p>
        ))}
      </div>

      {/* Trilho de estados */}
      <ol aria-hidden className="hidden anim:absolute anim:left-5 anim:right-5 anim:top-[33vh] anim:flex anim:gap-1.5 md:anim:bottom-[9vh] md:anim:left-[6vw] md:anim:right-auto md:anim:top-auto md:anim:w-[34vw] md:anim:flex-wrap md:anim:gap-x-4 md:anim:gap-y-1">
        {states.map((s, i) => (
          <li key={s.label} data-tick className={`micro flex-1 md:flex-none ${i === 0 ? "opacity-100" : "opacity-30"}`}>
            <span className="block h-[2px] bg-violet md:hidden" />
            <span className="hidden md:inline">
              <span className="text-violet">{String(i + 1).padStart(2, "0")}</span> {s.label}
            </span>
          </li>
        ))}
      </ol>

      {/* Palco */}
      <div className="mt-14 flex flex-col gap-16 anim:[container-type:size] anim:absolute anim:bottom-[13vh] anim:left-5 anim:right-5 anim:top-[37vh] anim:mt-0 anim:block md:anim:bottom-[8vh] md:anim:left-auto md:anim:right-[6vw] md:anim:top-[10vh] md:anim:w-[50vw]">
        {states.map((s, i) => (
          <figure
            key={s.label}
            data-layer
            className="flex flex-col gap-4 anim:absolute anim:inset-0 anim:grid anim:place-items-center"
          >
            <div className={`relative w-full anim:max-w-none ${s.shape === "tall" || s.shape === "phone" ? "max-w-[300px]" : "max-w-[520px]"} ${SHAPE[s.shape]}`}>
              {s.node}
            </div>
            <figcaption className="text-[15px] text-white/80 anim:hidden">
              <span className="micro mr-2 text-violet">{i === 0 ? "Hoje" : "Proposta"}</span>
              {s.caption}
            </figcaption>
          </figure>
        ))}
        <div className="pointer-events-none absolute right-0 top-0 hidden anim:block">
          <span data-chip-today className="absolute right-0 top-0"><Chip>Hoje</Chip></span>
          <span data-chip-prop className="absolute right-0 top-0"><Chip tone="violet">Proposta</Chip></span>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useRef } from "react";
import { Asset } from "@/components/ui/Asset";
import { PmAgenda, PmCard } from "@/components/pm/Surfaces";
import { shots } from "@/content/sources";
import { gsap, useScene } from "@/lib/gsap";

// 07 · Jornada. Quatro palavras, uma por vez. O mesmo ponto roxo percorre a
// trilha e leva de uma etapa à próxima. Sem fluxograma.

function Signals() {
  const rows = ["Conteúdo", "Perfil", "Agenda", "Consulta"];
  return (
    <div className="rounded-[18px] bg-ink p-6 text-white">
      <p className="micro text-white/60">Sinais do piloto</p>
      <ul className="mt-5 flex flex-col gap-4">
        {rows.map((r, i) => (
          <li key={r} className="flex items-center gap-3">
            <span className="w-20 text-[14px]">{r}</span>
            <span className="h-[3px] flex-1 rounded-full bg-white/10">
              <span className="block h-full rounded-full bg-violet" style={{ width: `${85 - i * 18}%`, opacity: 0.25 + i * 0.2 }} />
            </span>
            <span className="display w-6 text-right text-[22px] text-violet">—</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

const steps = [
  { word: "Conteúdo", node: <Asset shot={shots.igEspecialidade} sizes="(min-width: 768px) 24vw, 60vw" />, w: "w-[46vw] md:w-[19vw]" },
  { word: "Escolha", node: <PmCard className="overflow-hidden rounded-[18px] shadow-2xl" />, w: "w-[62vw] md:w-[26vw]" },
  { word: "Consulta", node: <PmAgenda className="overflow-hidden rounded-[18px] shadow-2xl" />, w: "w-[62vw] md:w-[26vw]" },
  { word: "Aprendizado", node: <Signals />, w: "w-[80vw] md:w-[28vw]" },
];

export function Jornada() {
  const root = useRef<HTMLElement>(null);

  useScene(root, ({ desktop, root: el }) => {
    const q = gsap.utils.selector(el);
    const words = q<HTMLElement>("[data-word] .line-inner");
    const visuals = q<HTMLElement>("[data-visual]");
    const track = q<HTMLElement>("[data-track]")[0];
    const dot = q<HTMLElement>("[data-dot]")[0];
    const fill = q<HTMLElement>("[data-fill]")[0];
    const nodes = q<HTMLElement>("[data-node]");

    gsap.set(words.slice(1), { yPercent: 130 });
    gsap.set(visuals.slice(1), { autoAlpha: 0, y: 60 });
    gsap.set(nodes.slice(1), { opacity: 0.35 });

    const tl = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        trigger: el,
        start: "top top",
        end: desktop ? "+=360%" : "+=400%",
        scrub: 0.6,
        pin: true,
        invalidateOnRefresh: true,
      },
    });

    tl.to({}, { duration: 0.4 });
    for (let i = 1; i < steps.length; i++) {
      const at = i;
      tl.to(words[i - 1], { yPercent: -130, duration: 0.4, ease: "power2.in" }, at);
      tl.to(words[i], { yPercent: 0, duration: 0.45, ease: "power3.out" }, at + 0.25);
      tl.to(visuals[i - 1], { autoAlpha: 0, y: -60, scale: 0.94, duration: 0.4 }, at);
      tl.to(visuals[i], { autoAlpha: 1, y: 0, duration: 0.5, ease: "power2.out" }, at + 0.25);
      tl.to(dot, { x: () => (track.offsetWidth * i) / (steps.length - 1), duration: 0.7, ease: "power2.inOut" }, at);
      tl.to(fill, { scaleX: i / (steps.length - 1), duration: 0.7, ease: "power2.inOut" }, at);
      tl.to(nodes[i], { opacity: 1, duration: 0.2 }, at + 0.5);
    }
    tl.to({}, { duration: 0.5 });
  });

  return (
    <section
      ref={root}
      aria-labelledby="jornada-title"
      className="relative overflow-hidden px-5 py-24 md:px-[6vw] anim:h-svh anim:p-0"
    >
      <h2 id="jornada-title" className="micro text-mute anim:absolute anim:left-5 anim:top-[12vh] md:anim:left-[6vw] md:anim:top-[14vh]">
        A jornada
      </h2>

      <div className="mt-6 flex flex-col gap-14 anim:mt-0 anim:block">
        {steps.map((s, i) => (
          <div key={s.word} className="flex flex-col gap-6 anim:contents">
            <p
              data-word
              className="display text-[17vw] md:text-[11.5vw] anim:absolute anim:left-5 anim:top-[17vh] md:anim:left-[6vw] md:anim:top-[30vh]"
            >
              <span className="line-mask">
                <span className={`line-inner ${i === steps.length - 1 ? "text-violet-ink" : ""}`}>{s.word}</span>
              </span>
            </p>
            <div
              data-visual
              className={`${s.w} anim:absolute anim:inset-x-0 anim:mx-auto anim:top-[35vh] md:anim:left-auto md:anim:right-[7vw] md:anim:top-[14vh] md:anim:mx-0`}
            >
              {s.node}
            </div>
          </div>
        ))}
      </div>

      {/* Trilha: o mesmo ponto atravessa as etapas */}
      <div className="hidden anim:absolute anim:bottom-[8vh] anim:left-5 anim:right-5 anim:block md:anim:bottom-[10vh] md:anim:left-[6vw] md:anim:right-[6vw]">
        <div data-track className="relative h-px bg-ink/15">
          <div data-fill className="absolute inset-0 origin-left bg-violet [transform:scaleX(0)]" />
          <div data-dot className="absolute -left-2 -top-2 size-4 rounded-full bg-violet shadow-[0_0_0_6px_rgba(148,121,247,0.2)]" />
        </div>
        <ol className="micro mt-4 flex justify-between text-ink">
          {steps.map((s) => (
            <li key={s.word} data-node>{s.word}</li>
          ))}
        </ol>
      </div>
    </section>
  );
}

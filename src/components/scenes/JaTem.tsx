"use client";

import { useRef } from "react";
import { Asset } from "@/components/ui/Asset";
import { shots, type Shot } from "@/content/sources";
import { gsap, useScene } from "@/lib/gsap";

// 02 · Cena icônica. "Já tem" em tela cheia, quatro vezes; a cada frase os
// materiais reais correspondentes entram e se acumulam. No fim, tudo
// converge numa só pilha e a frase que falta assume a tela.

type Obj = {
  shot: Shot;
  group: number; // qual frase traz o objeto
  d: [number, number, number, number]; // left vw, top vh, width vw, rot
  m: [number, number, number, number];
};

const PHRASES = ["Já tem conteúdo.", "Já tem profissionais.", "Já tem agenda.", "Já tem estrutura."];

const objs: Obj[] = [
  { shot: shots.igEspecialidade, group: 3, d: [60, 80, 13, 5], m: [70, 76, 34, 5] },
  { shot: shots.siteHome, group: 3, d: [44, 4, 26, -2], m: [22, 80, 70, -2] },
  { shot: shots.agendaCalendario, group: 2, d: [70, 70, 12, 4], m: [62, 58, 32, 4] },
  { shot: shots.perfilPreco, group: 2, d: [88, 52, 10, -5], m: [-6, 34, 26, -5] },
  { shot: shots.cardAmanda, group: 1, d: [54, 30, 16, 3], m: [8, 4, 44, 3] },
  { shot: shots.igProfissional, group: 1, d: [83, 14, 15, -4], m: [66, 36, 36, -4] },
  { shot: shots.igProposito, group: 0, d: [46, 58, 12, -7], m: [-8, 66, 36, -7] },
  { shot: shots.ytCapa, group: 0, d: [74, 46, 25, -3], m: [40, 70, 62, -3] },
  { shot: shots.igCura, group: 0, d: [62, 8, 15, 6], m: [56, 6, 38, 6] },
];

// Onde cada objeto termina: uma pilha arrumada, levemente em leque.
const stack = (i: number, desktop: boolean) =>
  desktop
    ? { l: 62 + i * 1.6, t: 22 + i * 3.2, w: 20, r: (i - 4) * 1.6 }
    : { l: 14 + i * 3.2, t: 50 + i * 2.2, w: 50, r: (i - 4) * 1.6 };

export function JaTem() {
  const root = useRef<HTMLElement>(null);

  useScene(root, ({ desktop, root: el }) => {
    const q = gsap.utils.selector(el);
    const lines = q<HTMLElement>("[data-phrase] .line-inner");
    const items = q<HTMLElement>("[data-obj]");
    const vw = () => window.innerWidth / 100;
    const vh = () => window.innerHeight / 100;

    gsap.set(lines.slice(1), { yPercent: 130, opacity: 1 });
    gsap.set(q("[data-final] .line-inner"), { yPercent: 130, opacity: 1 });
    gsap.set(items, { autoAlpha: 0, scale: 0.6, yPercent: 30 });

    const tl = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        trigger: el,
        start: "top top",
        end: desktop ? "+=300%" : "+=320%",
        scrub: 0.5,
        pin: true,
        invalidateOnRefresh: true,
      },
    });

    const entrance = (g: number, at: number) =>
      items.forEach((it, i) => {
        if (objs[i].group !== g) return;
        tl.to(it, { autoAlpha: 1, scale: 1, yPercent: 0, duration: 0.45, ease: "power3.out" }, at + (i % 3) * 0.06);
      });

    entrance(0, 0);
    PHRASES.forEach((_, i) => {
      if (i === 0) return;
      const at = i * 0.8;
      tl.to(lines[i - 1], { yPercent: -130, duration: 0.3, ease: "power2.in" }, at);
      tl.to(lines[i], { yPercent: 0, duration: 0.35, ease: "power3.out" }, at + 0.18);
      // O que já apareceu recua um pouco: acumula, sem sumir.
      items.forEach((it, k) => {
        if (objs[k].group < i) tl.to(it, { opacity: 0.55, duration: 0.3 }, at);
      });
      entrance(i, at + 0.1);
    });

    // Convergência: tudo vai para a mesma pilha.
    const at = PHRASES.length * 0.8 + 0.1;
    tl.to(lines[PHRASES.length - 1], { yPercent: -130, duration: 0.3, ease: "power2.in" }, at);
    items.forEach((it, i) => {
      const s = stack(i, desktop);
      const [l, t, w] = desktop ? objs[i].d : objs[i].m;
      tl.to(it, {
        x: () => (s.l - l) * vw(),
        y: () => (s.t - t) * vh(),
        scale: s.w / w,
        rotation: s.r,
        opacity: 1,
        duration: 0.7,
        ease: "power3.inOut",
      }, at + i * 0.03);
    });
    tl.to(q("[data-final] .line-inner"), { yPercent: 0, stagger: 0.08, duration: 0.4, ease: "power3.out" }, at + 0.45);
    tl.to({}, { duration: 0.35 });
  });

  return (
    <section
      ref={root}
      aria-label="O que a Pratimed já tem"
      className="relative overflow-hidden bg-paper px-5 py-28 md:px-[5vw] anim:h-svh anim:p-0"
    >
      <div data-phrase className="relative z-10 flex flex-col gap-4 anim:text-white anim:mix-blend-difference anim:absolute anim:left-5 anim:top-[26vh] anim:gap-0 md:anim:left-[5vw] md:anim:top-[34vh]">
        {PHRASES.map((p, i) => (
          <h2 key={p} className="display text-[clamp(44px,14vw,90px)] md:text-[clamp(72px,9.6vw,190px)] anim:absolute anim:left-0 anim:top-0 anim:w-[92vw] md:anim:w-[62vw]">
            <span className="line-mask">
              <span className={`line-inner ${i > 0 ? "anim:opacity-0" : ""}`}>
                Já tem
                <br />
                {p.replace("Já tem ", "")}
              </span>
            </span>
          </h2>
        ))}
      </div>

      <h2 data-final className="display relative z-10 mt-14 text-[clamp(48px,14vw,86px)] md:text-[clamp(72px,8.4vw,170px)] anim:absolute anim:left-5 anim:top-[12vh] anim:mt-0 md:anim:left-[5vw] md:anim:top-[20vh]">
        <span className="line-mask"><span className="line-inner anim:opacity-0">O que falta</span></span>
        <span className="line-mask"><span className="line-inner anim:opacity-0">é fazer tudo</span></span>
        <span className="line-mask"><span className="line-inner anim:opacity-0">trabalhar <span className="text-violet-ink">junto.</span></span></span>
      </h2>

      <div aria-hidden className="mt-12 grid grid-cols-3 gap-3 anim:absolute anim:inset-0 anim:mt-0 anim:block">
        {objs.map((o) => (
          <div
            key={o.shot.src}
            data-obj
            className="anim:opacity-0 anim:absolute anim:origin-top-left anim:left-[var(--ml)] anim:top-[var(--mt)] anim:w-[var(--mw)] anim:[transform:rotate(var(--mr))] md:anim:left-[var(--dl)] md:anim:top-[var(--dt)] md:anim:w-[var(--dw)] md:anim:[transform:rotate(var(--dr))]"
            style={
              {
                "--dl": `${o.d[0]}vw`, "--dt": `${o.d[1]}vh`, "--dw": `${o.d[2]}vw`, "--dr": `${o.d[3]}deg`,
                "--ml": `${o.m[0]}vw`, "--mt": `${o.m[1]}vh`, "--mw": `${o.m[2]}vw`, "--mr": `${o.m[3]}deg`,
              } as React.CSSProperties
            }
          >
            <Asset shot={o.shot} sizes="(min-width: 768px) 24vw, 60vw" />
          </div>
        ))}
      </div>
    </section>
  );
}

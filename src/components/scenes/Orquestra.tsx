"use client";

import { useRef } from "react";
import { gsap, useScene } from "@/lib/gsap";

// 09 · Papel da AERA. Cada parceiro é uma linha com direção própria; no
// scroll, todas giram até apontar para o mesmo lugar. A AERA é a linha roxa.

const lanes = [
  { who: "Sócios da Pratimed", angle: -14 },
  { who: "Conteúdo e mídia", angle: 11 },
  { who: "AERA", angle: -6, aera: true },
  { who: "Site, CRM e dados", angle: 16 },
  { who: "Equipe clínica e jurídica", angle: -19 },
];

const AERA_ROLES = ["Direção", "Marca", "Jornada", "Dados"];

export function Orquestra() {
  const root = useRef<HTMLElement>(null);

  useScene(root, ({ desktop, root: el }) => {
    const q = gsap.utils.selector(el);
    const tl = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: { trigger: el, start: "top top", end: desktop ? "+=200%" : "+=220%", scrub: 0.6, pin: true },
    });
    tl.to(q("[data-a]"), { opacity: 0.28, duration: 0.3 }, 0.35)
      .fromTo(q("[data-b] .line-inner"), { yPercent: 130 }, { yPercent: 0, stagger: 0.06, duration: 0.3, ease: "power3.out" }, 0.3)
      .to(q("[data-lane]"), { rotation: 0, duration: 0.55, stagger: 0.03, ease: "power2.inOut" }, 0.2)
      .fromTo(q("[data-roles] > *"), { autoAlpha: 0, x: -12 }, { autoAlpha: 1, x: 0, stagger: 0.05, duration: 0.15 }, 0.72)
      .fromTo(q("[data-dest]"), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.15 }, 0.75)
      .to({}, { duration: 0.15 });
  });

  return (
    <section
      ref={root}
      aria-labelledby="orq-title"
      className="relative overflow-hidden px-5 py-28 md:px-[6vw] anim:h-svh anim:py-0 anim:pt-[14vh]"
    >
      <h2 id="orq-title" className="display text-[9.5vw] md:text-[5.6vw]">
        <span data-a className="block">Não é sobre substituir quem já faz.</span>
        <span data-b className="mt-3 block">
          <span className="line-mask"><span className="line-inner">É sobre fazer todos trabalharem</span></span>
          <span className="line-mask"><span className="line-inner">na <span className="text-violet-ink">mesma direção.</span></span></span>
        </span>
      </h2>

      <ul className="mt-16 flex flex-col gap-5 md:gap-6 anim:absolute anim:bottom-[9vh] anim:left-5 anim:right-5 anim:mt-0 md:anim:left-[6vw] md:anim:right-[6vw]">
        {lanes.map((l) => (
          <li
            key={l.who}
            data-lane
            className="relative flex origin-left items-center gap-4 anim:[transform:rotate(var(--a))]"
            style={{ "--a": `${l.angle}deg` } as React.CSSProperties}
          >
            <span className={`w-[38vw] shrink-0 text-[14px] md:w-[16vw] md:text-[16px] ${l.aera ? "font-semibold text-violet-ink" : ""}`}>
              {l.who}
            </span>
            <span className={`relative h-[2px] flex-1 ${l.aera ? "bg-violet" : "bg-ink/25"}`}>
              <span className={`absolute -right-0.5 -top-[5px] size-3 rotate-45 border-r-2 border-t-2 ${l.aera ? "border-violet" : "border-ink/40"}`} />
            </span>
            {l.aera && (
              <span data-roles className="micro absolute left-[40vw] top-[-22px] flex gap-3 text-violet-ink md:left-[18vw]">
                {AERA_ROLES.map((r) => <span key={r}>{r}</span>)}
              </span>
            )}
          </li>
        ))}
        <li data-dest className="micro self-end text-mute">Da atenção à consulta</li>
      </ul>

      <p className="micro mt-10 max-w-[46ch] text-mute anim:absolute anim:bottom-[3vh] anim:left-5 anim:mt-0 md:anim:left-[6vw]">
        Parceiros atuais seguem executando conteúdo, mídia e desenvolvimento, com responsabilidades acordadas.
      </p>
    </section>
  );
}

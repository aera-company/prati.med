"use client";

import { useRef } from "react";
import { CONTACT_URL } from "@/content/sources";
import { gsap, useScene } from "@/lib/gsap";

// 11 · Fechamento. Escala grande sobre preto: o que já existe se apaga
// aos poucos e sobra a frase que pede ação.

const HAVE = ["A Pratimed já tem conteúdo.", "Já tem profissionais.", "Já tem estrutura."];
const NOW = ["Agora é hora de fazer", "tudo trabalhar junto."];

export function Fechamento() {
  const root = useRef<HTMLElement>(null);

  useScene(root, ({ desktop, root: el }) => {
    const q = gsap.utils.selector(el);
    const have = q<HTMLElement>("[data-have]");
    gsap.set(have, { autoAlpha: 0, y: 40 });
    gsap.set(q("[data-now] .line-inner"), { yPercent: 130 });
    gsap.set(q("[data-cta]"), { autoAlpha: 0, y: 30 });

    const tl = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: { trigger: el, start: "top top", end: desktop ? "+=240%" : "+=260%", scrub: 0.6, pin: true },
    });
    have.forEach((h, i) => {
      tl.to(h, { autoAlpha: 1, y: 0, duration: 0.3, ease: "power2.out" }, i * 0.35);
      if (i > 0) tl.to(have[i - 1], { opacity: 0.25, duration: 0.3 }, i * 0.35);
    });
    tl.to(have, { opacity: 0.12, duration: 0.3 }, 1.2)
      .to(q("[data-now] .line-inner"), { yPercent: 0, stagger: 0.08, duration: 0.4, ease: "power3.out" }, 1.25)
      .to(q("[data-cta]"), { autoAlpha: 1, y: 0, duration: 0.3 }, 1.75)
      .to({}, { duration: 0.4 });
  });

  return (
    <section
      ref={root}
      aria-labelledby="fecho-title"
      className="relative overflow-hidden bg-ink px-5 py-28 text-white md:px-[6vw] anim:h-svh anim:py-0"
    >
      <div className="flex flex-col gap-2 anim:absolute anim:left-5 anim:top-[13vh] md:anim:left-[6vw] md:anim:top-[12vh]">
        {HAVE.map((h) => (
          <p key={h} data-have className="display-wide text-[8vw] md:text-[3.6vw]">{h}</p>
        ))}
      </div>

      <h2 id="fecho-title" data-now className="display mt-16 text-[13.5vw] anim:absolute anim:left-5 anim:right-5 anim:top-[42vh] anim:mt-0 md:text-[8.6vw] md:anim:left-[6vw] md:anim:top-[38vh]">
        {NOW.map((l, i) => (
          <span key={l} className="line-mask">
            <span className="line-inner">
              {i === 1 ? <>tudo trabalhar <span className="text-violet">junto.</span></> : l}
            </span>
          </span>
        ))}
      </h2>

      <div data-cta className="mt-16 flex flex-col gap-6 anim:absolute anim:bottom-[8vh] anim:left-5 anim:right-5 anim:mt-0 md:anim:left-[6vw] md:anim:right-[6vw] md:flex-row md:items-end md:justify-between">
        <div>
          <p className="micro text-white/55">AERA × Pratimed</p>
          <p className="display-wide mt-1 text-[7vw] md:text-[2.6vw]">Da atenção à consulta.</p>
        </div>
        <div className="flex flex-col gap-3 md:items-end">
          <a
            href={CONTACT_URL}
            className="inline-flex w-fit items-center gap-3 rounded-full bg-violet px-7 py-4 text-[17px] font-semibold text-ink transition-transform duration-200 hover:-translate-y-0.5 active:scale-[0.98]"
          >
            Construir o primeiro piloto <span aria-hidden>→</span>
          </a>
          <p className="max-w-[40ch] text-[13px] leading-snug text-white/55 md:text-right">
            Conversa com os sócios para definir foco, responsáveis, recursos e investimento.
          </p>
        </div>
      </div>
    </section>
  );
}

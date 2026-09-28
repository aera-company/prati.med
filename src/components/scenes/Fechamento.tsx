"use client";

import { useRef } from "react";
import { CONTACT_URL } from "@/content/sources";
import { gsap, useScene } from "@/lib/gsap";

// 11 · Fechamento. Muito espaço, escala grande, uma ação.

export function Fechamento() {
  const root = useRef<HTMLElement>(null);

  useScene(root, ({ desktop, root: el }) => {
    const q = gsap.utils.selector(el);
    gsap.set(q("[data-now] .line-inner"), { yPercent: 130, opacity: 1 });
    gsap.set(q("[data-cta]"), { autoAlpha: 0, y: 30 });

    const tl = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: { trigger: el, start: "top top", end: desktop ? "+=160%" : "+=170%", scrub: 0.5, pin: true },
    });
    tl.from(q("[data-have] .line-inner"), { yPercent: 130, stagger: 0.06, duration: 0.3, ease: "power3.out" }, 0)
      .to(q("[data-have]"), { opacity: 0.2, scale: 0.9, transformOrigin: "left top", duration: 0.3 }, 0.45)
      .to(q("[data-now] .line-inner"), { yPercent: 0, stagger: 0.07, duration: 0.35, ease: "power3.out" }, 0.5)
      .to(q("[data-cta]"), { autoAlpha: 1, y: 0, duration: 0.25 }, 0.95)
      .to({}, { duration: 0.3 });
  });

  return (
    <section
      ref={root}
      aria-labelledby="fecho-title"
      className="relative overflow-hidden bg-ink px-5 py-32 text-white md:px-[5vw] anim:h-svh anim:py-0"
    >
      <p data-have className="display text-[clamp(40px,12vw,72px)] md:text-[clamp(56px,5.6vw,110px)] anim:absolute anim:left-5 anim:top-[12vh] md:anim:left-[5vw] md:anim:top-[11vh]">
        <span className="line-mask"><span className="line-inner">A Pratimed</span></span>
        <span className="line-mask"><span className="line-inner">já tem as peças.</span></span>
      </p>

      <h2 id="fecho-title" data-now className="display mt-16 text-[clamp(48px,14vw,86px)] anim:absolute anim:left-5 anim:right-5 anim:top-[34vh] anim:mt-0 md:text-[clamp(80px,9.4vw,200px)] md:anim:left-[5vw] md:anim:top-[33vh]">
        <span className="line-mask"><span className="line-inner anim:opacity-0">Agora é hora de fazer</span></span>
        <span className="line-mask"><span className="line-inner anim:opacity-0">tudo funcionar <span className="text-violet">junto.</span></span></span>
      </h2>

      <div data-cta className="mt-20 flex flex-col gap-8 anim:absolute anim:bottom-[8vh] anim:left-5 anim:right-5 anim:mt-0 anim:opacity-0 md:anim:left-[5vw] md:anim:right-[5vw] md:flex-row md:items-end md:justify-between">
        <div>
          <p className="micro text-white/50">AERA × Pratimed</p>
          <p className="display-wide mt-1 text-[clamp(28px,8vw,44px)] md:text-[clamp(32px,3vw,56px)]">Da atenção à consulta.</p>
        </div>
        <div className="flex flex-col gap-3 md:items-end">
          <a
            href={CONTACT_URL}
            className="group inline-flex w-fit items-center gap-3 text-[clamp(22px,6vw,30px)] font-semibold text-violet md:text-[clamp(22px,2vw,36px)]"
          >
            <span className="border-b-2 border-violet/40 pb-1 transition-colors group-hover:border-violet">Construir o primeiro piloto</span>
            <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
          </a>
          <p className="max-w-[40ch] text-[13px] leading-snug text-white/50 md:text-right">
            Conversa com os sócios para definir foco, responsáveis, recursos e investimento.
          </p>
        </div>
      </div>
    </section>
  );
}

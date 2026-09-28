"use client";

import { useRef } from "react";
import { Chip } from "@/components/ui/Asset";
import { PmCard, PmPost, PmThumb } from "@/components/pm/Surfaces";
import { shots, type Shot } from "@/content/sources";
import { gsap, useScene } from "@/lib/gsap";

// 04 · Transformação. Três pontos de contato atuais são substituídos, um a
// um, pela mesma Pratimed aplicada. A troca acontece por máscara, no lugar.

type Pair = { today: Shot; proposal: React.ReactNode; aspect: string; fit?: "cover" | "contain" };

const pairs: Pair[] = [
  { today: shots.igCura, proposal: <PmPost />, aspect: "4/5" },
  { today: shots.ytCapa, proposal: <PmThumb />, aspect: "16/9" },
  { today: shots.cardAmanda, proposal: <PmCard className="bg-[var(--pm-lilac)] p-[5%]" />, aspect: "3/4", fit: "contain" },
];

export function Transformacao() {
  const root = useRef<HTMLElement>(null);

  useScene(root, ({ desktop, root: el }) => {
    const q = gsap.utils.selector(el);
    const row = q("[data-row]")[0] as HTMLElement;
    const tl = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        trigger: el,
        start: "top top",
        end: desktop ? "+=260%" : "+=320%",
        scrub: 0.6,
        pin: true,
        invalidateOnRefresh: true,
      },
    });

    gsap.from(q("[data-head] .line-inner"), {
      yPercent: 130,
      stagger: 0.08,
      duration: 0.9,
      ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 65%", toggleActions: "play none none reverse" },
    });

    const slots = q<HTMLElement>("[data-pair]");
    slots.forEach((slot, i) => {
      const at = 0.16 + i * 0.26;
      if (!desktop) {
        // No mobile a fileira desliza e traz cada par para o centro.
        tl.to(row, {
          x: () => -(row.offsetLeft + slot.offsetLeft + slot.offsetWidth / 2 - window.innerWidth / 2),
          duration: 0.14,
          ease: "power2.inOut",
        }, at - 0.08);
      }
      tl.fromTo(slot.querySelector("[data-prop]"), { clipPath: "inset(100% 0% 0% 0%)" }, {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 0.16,
        ease: "power2.inOut",
      }, at);
      tl.to(slot.querySelector("[data-today-chip]"), { autoAlpha: 0, duration: 0.04 }, at);
      tl.fromTo(slot.querySelector("[data-today]"), { scale: 1 }, { scale: 0.94, duration: 0.16 }, at);
    });
    tl.to({}, { duration: 0.1 });
  });

  return (
    <section
      ref={root}
      aria-labelledby="transf-title"
      className="relative flex flex-col gap-12 overflow-hidden px-5 py-24 md:px-[6vw] anim:block anim:h-svh anim:p-0"
    >
      <div data-head className="relative z-10 anim:absolute anim:left-5 anim:right-5 anim:top-[13vh] md:anim:left-[6vw] md:anim:top-[12vh]">
        <p className="display-wide text-[7vw] text-mute md:text-[2.4vw]">
          <span className="line-mask"><span className="line-inner">A oportunidade:</span></span>
        </p>
        <h2 id="transf-title" className="display mt-2 text-[12.5vw] md:text-[6.4vw]">
          <span className="line-mask"><span className="line-inner">Uma Pratimed</span></span>
          <span className="line-mask"><span className="line-inner"><span className="text-violet-ink">reconhecível</span></span></span>
          <span className="line-mask"><span className="line-inner">em cada passo.</span></span>
        </h2>
      </div>

      <div
        data-row
        className="flex flex-col gap-10 anim:absolute anim:bottom-[7vh] anim:left-5 anim:flex-row anim:items-end anim:gap-4 md:anim:left-auto md:anim:right-[-3vw] md:anim:gap-[1.4vw]"
      >
        {pairs.map((p) => (
          <div
            key={p.today.src}
            data-pair
            className="grid grid-cols-2 gap-3 anim:relative anim:block anim:h-[44vh] anim:shrink-0 md:anim:h-[44vh]"
          >
            <div
              data-today
              className="relative anim:absolute anim:inset-0 anim:h-full"
              style={{ aspectRatio: p.aspect }}
            >
              <div className={`object relative h-full ${p.fit === "contain" ? "bg-paper-2" : ""}`} title={`${p.today.context} · capturado em ${p.today.captured}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.today.src}
                  alt={p.today.alt}
                  loading="lazy"
                  className={`size-full ${p.fit === "contain" ? "object-contain p-[6%]" : "object-cover object-top"}`}
                />
              </div>
              <div data-today-chip className="absolute left-2 top-2">
                <Chip>Hoje</Chip>
              </div>
            </div>
            <div
              data-prop
              className="relative overflow-hidden rounded-[10px] shadow-[0_30px_60px_-30px_rgba(14,14,17,0.45)] anim:absolute anim:inset-0"
              style={{ aspectRatio: p.aspect }}
            >
              <div className="h-full [&>div]:h-full">{p.proposal}</div>
              <Chip tone="violet" className="absolute right-2 top-2">Proposta</Chip>
            </div>
            {/* reserva a largura do par no layout animado */}
            <div aria-hidden className="hidden h-full anim:block" style={{ aspectRatio: p.aspect }} />
          </div>
        ))}
      </div>
    </section>
  );
}

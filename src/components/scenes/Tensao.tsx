"use client";

import { useRef } from "react";
import { gsap, useScene } from "@/lib/gsap";

// 02 · Tensão. Tela quase vazia; a tese se acende palavra por palavra.

function Words({ text, accent }: { text: string; accent?: string }) {
  return (
    <>
      {text.split(" ").map((w, i) => (
        <span
          key={i}
          data-word
          className={`inline-block anim:opacity-[0.12] ${w === accent ? "text-violet-ink" : ""}`}
        >
          {w}&nbsp;
        </span>
      ))}
    </>
  );
}

export function Tensao() {
  const root = useRef<HTMLElement>(null);

  useScene(root, ({ root: el }) => {
    gsap.to(gsap.utils.selector(el)("[data-word]"), {
      opacity: 1,
      stagger: 0.25,
      ease: "none",
      scrollTrigger: {
        trigger: el,
        start: "top top",
        end: "+=140%",
        scrub: 0.5,
        pin: true,
      },
    });
  });

  return (
    <section
      ref={root}
      aria-label="A oportunidade"
      className="relative flex min-h-svh flex-col justify-center gap-[12vh] px-5 py-28 md:px-[6vw] anim:h-svh anim:py-0"
    >
      <h2 className="display max-w-[11ch] text-[15vw] md:max-w-none md:text-[9vw]">
        <Words text="A Pratimed já produz." />
      </h2>
      <p className="display self-end text-right text-[15vw] md:max-w-[12ch] md:text-[9vw] md:text-left">
        <Words text="A oportunidade é conectar." accent="conectar." />
      </p>
    </section>
  );
}

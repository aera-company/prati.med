"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { shots, type Shot } from "@/content/sources";
import { EvidenceTag } from "@/components/ui/EvidenceTag";

// Cena 1 · O que já existe e a oportunidade.
// Três materiais reais (conteúdo, perfil, agenda) começam soltos, cada um com
// sua inclinação, e se alinham sobre uma linha de percurso. Em reduced motion o
// Framer pula direto para o estado final: a ideia se lê sem animação.

const pieces: { shot: Shot; step: string; tilt: number; dy: number }[] = [
  { shot: shots.ytCapa, step: "Conteúdo", tilt: -4, dy: 18 },
  { shot: shots.listaCardAmanda, step: "Profissional", tilt: 3, dy: -14 },
  { shot: shots.agenda, step: "Agenda", tilt: -2, dy: 10 },
];

const piece: Variants = {
  apart: (p: (typeof pieces)[number]) => ({ rotate: p.tilt, y: p.dy }),
  together: {
    rotate: 0,
    y: 0,
    transition: { type: "spring", stiffness: 70, damping: 18, delay: 0.6 },
  },
};

const line: Variants = {
  apart: { scaleX: 0, scaleY: 0 },
  together: {
    scaleX: 1,
    scaleY: 1,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 1.1 },
  },
};

export function Scene1Hero() {
  return (
    <section
      id="inicio"
      aria-labelledby="hero-title"
      className="mx-auto flex max-w-6xl flex-col gap-12 px-4 pb-20 pt-14 md:px-8 md:pb-28 md:pt-24"
    >
      <div className="flex max-w-3xl flex-col gap-6">
        <p className="text-lg text-ink-2 md:text-xl">
          O conteúdo da Pratimed já está no ar.
        </p>
        <h1
          id="hero-title"
          className="headline text-[clamp(2.6rem,8.5vw,5.75rem)] font-semibold"
        >
          Como ele leva alguém a escolher a{" "}
          <span className="text-violet-ink">Pratimed</span>?
        </h1>
        <a
          href="#conteudo"
          className="inline-flex w-fit items-center gap-2 rounded-full border border-ink/20 px-5 py-3 text-[15px] font-medium transition-colors hover:border-ink hover:bg-ink/5"
        >
          Ver a jornada <span aria-hidden>↓</span>
        </a>
      </div>

      <motion.div
        initial="apart"
        animate="together"
        className="relative"
      >
        {/* Linha de percurso: horizontal no desktop, vertical no mobile. */}
        <motion.div
          variants={line}
          aria-hidden
          className="absolute left-[8%] right-[8%] top-1/2 hidden h-px origin-left bg-violet md:block"
        />
        <motion.div
          variants={line}
          aria-hidden
          className="absolute bottom-[6%] left-6 top-[6%] w-px origin-top bg-violet md:hidden"
        />

        <ol className="relative grid gap-8 md:grid-cols-3 md:items-center md:gap-6">
          {pieces.map((p, i) => (
            <motion.li
              key={p.step}
              custom={p}
              variants={piece}
              className="relative pl-12 md:pl-0"
            >
              <span
                aria-hidden
                className="absolute left-[18px] top-1/2 size-3 -translate-y-1/2 rounded-full border-2 border-paper bg-violet md:hidden"
              />
              <div className="overflow-hidden rounded-xl border border-line bg-surface shadow-[0_24px_48px_-28px_rgba(23,22,28,0.5)]">
                <Image
                  src={p.shot.src}
                  width={p.shot.width}
                  height={p.shot.height}
                  alt={p.shot.alt}
                  sizes="(min-width: 768px) 33vw, 85vw"
                  priority
                  className="h-auto max-h-[300px] w-full object-cover object-top"
                />
              </div>
              <p className="mt-3 flex items-center gap-2 font-mono text-[12px] text-ink-2">
                <span className="text-violet-ink">{i + 1}</span> {p.step}
              </p>
            </motion.li>
          ))}
        </ol>
      </motion.div>

      <div className="flex flex-col gap-3 border-t border-line pt-6 text-[13px] leading-relaxed text-ink-3 md:flex-row md:items-start md:justify-between">
        <EvidenceTag kind="atual" className="w-fit" />
        <p className="max-w-xl">
          Capturas públicas do YouTube, da lista de profissionais e do
          agendamento da Pratimed, em 27/09/2026. A conversa inicial citou um
          planejamento de cerca de 400 vídeos em um ano; esse número será
          validado com os sócios.
        </p>
      </div>
    </section>
  );
}

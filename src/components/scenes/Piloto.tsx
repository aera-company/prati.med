"use client";

import { useRef } from "react";
import { notes } from "@/content/sources";
import { gsap, useScene } from "@/lib/gsap";

// 10 · Piloto. Números grandes e cinco verbos. O escopo completo, papéis e
// cronograma ficam num detalhe expansível: preservados, fora da narrativa.

const figures = [
  { n: "01", label: "jornada" },
  { n: "03–05", label: "profissionais" },
  { n: "02–03", label: "conteúdos" },
  { n: "30", label: "dias de aprendizado" },
];

const VERBS = ["Escolhemos.", "Conectamos.", "Colocamos no ar.", "Medimos.", "Aprendemos."];

const scope = [
  "Uma jornada e um público prioritários",
  "Três a cinco profissionais com perfis e disponibilidade confirmados pela Pratimed",
  "Duas ou três peças de conteúdo, selecionadas com o parceiro atual",
  "Um destino principal, conectado ao agendamento existente",
  "Um sistema visual e verbal aplicado às peças e telas do piloto",
  "Uma leitura dos eventos disponíveis e das adaptações necessárias",
  "Uma rotina de acompanhamento e uma reunião de decisão ao fim do ciclo",
];

const roles = [
  ["Sócios da Pratimed", "Prioridades, oferta, orçamento, responsáveis e decisões do projeto."],
  ["AERA", "Direção de marca, desenho da jornada, sistema visual, primeiras aplicações, critérios de qualidade e coordenação da leitura do piloto."],
  ["Parceiros de conteúdo e mídia", "Planejamento, produção, publicação e distribuição, conforme o escopo acordado."],
  ["Site, CRM e dados", "Avaliação técnica, páginas e eventos, integrações e disponibilização dos dados."],
  ["Responsáveis clínicos e jurídicos", "Validação das informações e dos procedimentos sob sua responsabilidade."],
];

export function Piloto() {
  const root = useRef<HTMLElement>(null);

  useScene(root, ({ root: el }) => {
    const q = gsap.utils.selector(el);
    gsap.from(q("[data-fig]"), {
      yPercent: 40,
      autoAlpha: 0,
      stagger: 0.1,
      duration: 0.9,
      ease: "power3.out",
      scrollTrigger: { trigger: q("[data-figs]")[0], start: "top 75%", toggleActions: "play none none reverse" },
    });
    gsap.fromTo(q("[data-verb]"), { opacity: 0.15 }, {
      opacity: 1,
      stagger: 0.3,
      ease: "none",
      scrollTrigger: { trigger: q("[data-verbs]")[0], start: "top 80%", end: "bottom 45%", scrub: 0.5 },
    });
  });

  return (
    <section ref={root} aria-labelledby="piloto-title" className="relative bg-paper-2 px-5 py-28 md:px-[6vw] md:py-40">
      <h2 id="piloto-title" className="display-wide text-[9vw] md:text-[3.4vw]">Primeiro piloto</h2>

      <ol data-figs className="mt-14 grid grid-cols-2 gap-x-5 gap-y-12 border-t border-line pt-10 md:mt-20 md:grid-cols-4 md:gap-x-[2vw]">
        {figures.map((f) => (
          <li key={f.label} data-fig>
            <p className="display whitespace-nowrap text-[17vw] md:text-[7.4vw]">{f.n}</p>
            <p className="mt-2 text-[16px] md:text-[19px]">{f.label}</p>
          </li>
        ))}
      </ol>
      <p className="micro mt-8 text-mute">+ implantação inicial de 4 a 6 semanas, quando pertinente</p>

      <p data-verbs className="display mt-28 text-[13vw] md:mt-40 md:text-[7vw]">
        {VERBS.map((v, i) => (
          <span key={v} data-verb className={`inline anim:opacity-15 ${i === VERBS.length - 1 ? "text-violet-ink" : ""}`}>
            {v}{" "}
          </span>
        ))}
      </p>

      <details className="group mt-20 border-t border-line pt-6 md:mt-28">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[15px] font-medium">
          Escopo completo, papéis e cronograma
          <span aria-hidden className="text-[22px] transition-transform group-open:rotate-45">+</span>
        </summary>
        <div className="mt-8 grid gap-10 text-[14px] leading-relaxed text-ink/80 md:grid-cols-3">
          <div>
            <p className="micro mb-3 text-mute">Escopo de referência</p>
            <ul className="flex flex-col gap-2">{scope.map((s) => <li key={s}>{s}</li>)}</ul>
          </div>
          <div>
            <p className="micro mb-3 text-mute">Quem faz o quê</p>
            <dl className="flex flex-col gap-3">
              {roles.map(([w, d]) => (
                <div key={w}><dt className="font-semibold text-ink">{w}</dt><dd>{d}</dd></div>
              ))}
            </dl>
          </div>
          <div>
            <p className="micro mb-3 text-mute">Cronograma</p>
            <p><span className="font-semibold text-ink">Implantação, 4 a 6 semanas:</span> alinhamento e acessos, desenho da jornada, sistema visual, aplicações, implementação, validação do percurso e da medição.</p>
            <p className="mt-3"><span className="font-semibold text-ink">Acompanhamento, 30 dias no ar:</span> leitura dos sinais, registro de dificuldades, ajustes acordados e recomendação para o próximo ciclo.</p>
            <p className="mt-3 text-mute">{notes.pilot}</p>
          </div>
        </div>
      </details>
    </section>
  );
}

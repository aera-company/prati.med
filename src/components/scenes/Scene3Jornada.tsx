import { AnimatedItem, AnimatedSection } from "@/components/ui/AnimatedSection";
import { AppDestino } from "@/components/applications/AppDestino";
import { EvidenceTag } from "@/components/ui/EvidenceTag";
import { SceneIntro } from "@/components/ui/SceneIntro";
import { ShotFigure } from "@/components/ui/ShotFigure";
import { shots } from "@/content/sources";
import type { ReactNode } from "react";

// Cena 3 · Reconstruir uma jornada possível.
// Foco: escolher um psicólogo para a primeira sessão. Sequência vertical em
// todas as larguras; no desktop a pergunta da etapa fica fixa ao lado da tela.

type Step = { stage: string; question: string; media: ReactNode; note?: string };

const steps: Step[] = [
  {
    stage: "Conteúdo",
    question: "Como funciona, ou por onde começo?",
    media: <ShotFigure shot={shots.ytCapa} />,
  },
  {
    stage: "Destino",
    question: "O que preciso saber para escolher?",
    media: (
      <div className="flex flex-col gap-3">
        <AppDestino />
        <EvidenceTag kind="proposta" className="w-fit self-center" />
      </div>
    ),
    note: "Entra só quando ajuda a decisão. O conteúdo também pode levar direto aos perfis.",
  },
  {
    stage: "Profissionais",
    question: "Quem atende e quais critérios posso comparar?",
    media: (
      <>
        <div className="hidden sm:block">
          <ShotFigure shot={shots.listaCards} />
        </div>
        <div className="sm:hidden">
          <ShotFigure shot={shots.listaCardAmanda} sizes="100vw" />
        </div>
      </>
    ),
  },
  {
    stage: "Perfil e agenda",
    question: "Qual o valor, quando há horário e como reservo?",
    media: (
      <div className="grid gap-4 sm:grid-cols-[1fr_1.5fr] sm:items-start">
        <ShotFigure shot={shots.perfilPreco} sizes="(min-width: 640px) 25vw, 100vw" />
        <ShotFigure shot={shots.agenda} sizes="(min-width: 640px) 40vw, 100vw" />
      </div>
    ),
  },
];

export function Scene3Jornada() {
  return (
    <section id="jornada" className="border-t border-line">
      <AnimatedSection className="mx-auto flex max-w-6xl flex-col gap-14 px-4 py-20 md:px-8 md:py-28">
        <SceneIntro
          n={3}
          label="Uma jornada possível"
          title={
            <>
              Uma dúvida.
              <br />
              Um próximo passo claro.
            </>
          }
        >
          Percurso ilustrativo para quem vai escolher um psicólogo para a
          primeira sessão. Telas reais na base; intervenções identificadas.
        </SceneIntro>

        <ol className="flex flex-col">
          {steps.map((s, i) => (
            <li
              key={s.stage}
              className="grid gap-6 border-t border-line py-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] md:gap-12"
            >
              <AnimatedItem className="md:sticky md:top-24 md:self-start">
                <p className="font-mono text-[12px] text-ink-3">
                  <span className="text-violet-ink">{i + 1}</span> · {s.stage}
                </p>
                <p className="headline mt-3 text-[clamp(1.4rem,3vw,2rem)] font-medium">
                  {s.question}
                </p>
                {s.note && (
                  <p className="mt-4 max-w-sm text-[14px] leading-relaxed text-ink-2">
                    {s.note}
                  </p>
                )}
              </AnimatedItem>
              <AnimatedItem>{s.media}</AnimatedItem>
            </li>
          ))}
        </ol>

        <AnimatedItem>
          <p className="max-w-2xl text-[14px] leading-relaxed text-ink-3">
            Captura de contato só entra no percurso quando houver uma
            necessidade clara e uma pessoa responsável pelo acompanhamento.
          </p>
        </AnimatedItem>
      </AnimatedSection>
    </section>
  );
}

import type { ReactNode } from "react";
import { AppDestinoPerfis } from "@/components/applications/AppDestino";
import { AppPerfil } from "@/components/applications/AppPerfil";
import { AppThumb } from "@/components/applications/AppThumb";
import { AppVideo } from "@/components/applications/AppVideo";
import { DirectionSpec } from "@/components/applications/DirectionSpec";
import { AnimatedItem, AnimatedSection } from "@/components/ui/AnimatedSection";
import { EvidenceTag } from "@/components/ui/EvidenceTag";
import { SceneIntro } from "@/components/ui/SceneIntro";
import { ShotFigure } from "@/components/ui/ShotFigure";
import { shots } from "@/content/sources";

// Cena 4 · A marca funcionando na jornada. Principal demonstração criativa.
// Primeiro estado: recortes atuais lado a lado, sem classificar nenhum.
// Segundo estado: uma direção ("a pergunta primeiro") aplicada em quatro
// superfícies, sempre com o rótulo de aplicação proposta.

const current = [
  { shot: shots.instagram, channel: "Instagram" },
  { shot: shots.ytCapa, channel: "YouTube" },
  { shot: shots.siteHome, channel: "Site" },
];

const applications: { title: string; changes: string[]; mock: ReactNode }[] = [
  {
    title: "Miniatura ou capa",
    changes: [
      "A pergunta do público ocupa o espaço principal.",
      "Quem responde aparece com nome e função.",
      "O roxo do símbolo assina a peça, sem caixa alta.",
    ],
    mock: <AppThumb />,
  },
  {
    title: "Dentro do vídeo",
    changes: [
      "Quem fala é identificado com nome e CRP.",
      "O fechamento aponta um próximo passo com endereço.",
      "Mesma tipografia e cor da capa.",
    ],
    mock: <AppVideo />,
  },
  {
    title: "Seção ou página de destino",
    changes: [
      "Continua a mesma pergunta do vídeo, como na cena 3.",
      "Três perfis para começar, com a mesma pessoa do vídeo.",
      "Valor visível antes de abrir o perfil.",
    ],
    mock: (
      <figure className="flex flex-col gap-2">
        <AppDestinoPerfis />
        <figcaption className="text-center font-mono text-[11px] text-ink-3">
          Recorte da página de destino
        </figcaption>
      </figure>
    ),
  },
  {
    title: "Card e perfil do profissional",
    changes: [
      "Nome em caixa baixa e retrato com o mesmo enquadramento.",
      "Valor e próximo horário lado a lado.",
      "O agendamento repete retrato, nome e valor.",
    ],
    mock: <AppPerfil />,
  },
];

export function Scene4Marca() {
  return (
    <section id="marca" className="border-t border-line bg-paper-2">
      <AnimatedSection className="mx-auto flex max-w-6xl flex-col gap-16 px-4 py-20 md:px-8 md:py-28">
        <SceneIntro
          n={4}
          label="A marca na jornada"
          title="A mesma Pratimed, do primeiro vídeo à escolha do profissional."
        />

        <div className="flex flex-col gap-6">
          <AnimatedItem>
            <h3 className="text-xl font-semibold md:text-2xl">
              Hoje, diferentes pontos de contato.
            </h3>
          </AnimatedItem>
          <div className="grid gap-6 md:grid-cols-3">
            {current.map((c) => (
              <AnimatedItem key={c.channel} className="flex flex-col gap-2">
                <p className="font-mono text-[12px] text-ink-3">{c.channel}</p>
                <ShotFigure shot={c.shot} sizes="(min-width: 768px) 33vw, 100vw" />
              </AnimatedItem>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-8">
          <AnimatedItem className="flex flex-col gap-4">
            <h3 className="text-xl font-semibold md:text-2xl">
              A oportunidade: uma experiência reconhecível em todos eles.
            </h3>
            <p className="max-w-2xl text-[15px] leading-relaxed text-ink-2">
              Direção proposta: <span className="font-semibold text-ink">a pergunta primeiro.</span>{" "}
              Toda peça começa pela dúvida de quem procura e termina em um
              próximo passo.
            </p>
          </AnimatedItem>
          <AnimatedItem>
            <DirectionSpec />
          </AnimatedItem>
        </div>

        <ol className="flex flex-col">
          {applications.map((a, i) => (
            <li
              key={a.title}
              className="grid gap-8 border-t border-line py-12 md:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] md:gap-12"
            >
              <AnimatedItem className="flex flex-col gap-4 md:sticky md:top-24 md:self-start">
                <p className="font-mono text-[12px] text-ink-3">
                  <span className="text-violet-ink">{i + 1}</span> · superfície
                </p>
                <h4 className="headline text-[clamp(1.5rem,3vw,2rem)] font-medium">
                  {a.title}
                </h4>
                <EvidenceTag kind="proposta" className="w-fit" />
                <ul className="flex flex-col gap-2 text-[15px] leading-snug text-ink-2">
                  {a.changes.map((c) => (
                    <li key={c} className="flex gap-2.5">
                      <span aria-hidden className="mt-[0.45em] size-1.5 shrink-0 rounded-full bg-violet" />
                      {c}
                    </li>
                  ))}
                </ul>
              </AnimatedItem>
              <AnimatedItem>{a.mock}</AnimatedItem>
            </li>
          ))}
        </ol>

        <div className="grid gap-8 border-t border-line pt-10 md:grid-cols-2 md:gap-14">
          <AnimatedItem>
            <p className="lede text-lg leading-relaxed text-ink md:text-xl">
              Uma direção comum dá critérios claros para quem produz e faz a
              Pratimed continuar reconhecível quando a pessoa avança do
              conteúdo para a escolha do profissional.
            </p>
          </AnimatedItem>
          <AnimatedItem>
            <p className="text-[14px] leading-relaxed text-ink-3">
              Exemplos montados com dados de perfis públicos da Pratimed,
              conferidos em 27/09/2026, para mostrar a continuidade de uma
              mesma pessoa entre as superfícies. As silhuetas marcam o lugar das
              fotos: quem aparece em cada peça será definido com a Pratimed e
              com os profissionais. O endereço de destino é ilustrativo.
            </p>
          </AnimatedItem>
        </div>
      </AnimatedSection>
    </section>
  );
}

import { AnimatedItem, AnimatedSection } from "@/components/ui/AnimatedSection";
import { EvidenceTag, type Evidence } from "@/components/ui/EvidenceTag";
import { SceneIntro } from "@/components/ui/SceneIntro";
import { YouTubeLite } from "@/components/ui/YouTubeLite";
import { anchorVideo, CAPTURED_AT, shots } from "@/content/sources";

// Cena 2 · Um conteúdo real, logo no início.
// Material escolhido: vídeo do YouTube, então vale a headline alternativa.
// Se trocarmos por um Reel, a headline passa a ser "Um Reel não precisa
// terminar no Reel."

const sequence: { title: string; body: string; kind: Evidence }[] = [
  {
    title: "Publicado",
    body: "Vídeo de 3 minutos no canal oficial, com capa, título e descrição.",
    kind: "atual",
  },
  {
    title: "A pergunta que ele aborda",
    body: "“Terapia online funciona?”",
    kind: "atual",
  },
  {
    title: "Uma possível dúvida seguinte",
    body: "“Como escolho um psicólogo para a primeira sessão?”",
    kind: "proposta",
  },
  {
    title: "Uma continuação proposta",
    body: "Do vídeo para um próximo passo claro, até a agenda.",
    kind: "proposta",
  },
];

export function Scene2Conteudo() {
  return (
    <section
      id="conteudo"
      className="border-t border-line bg-surface"
    >
      <AnimatedSection className="mx-auto flex max-w-6xl flex-col gap-12 px-4 py-20 md:px-8 md:py-28">
        <SceneIntro
          n={2}
          label="Um conteúdo real"
          title="Este vídeo pode abrir o caminho para a primeira consulta."
        />

        <div className="grid gap-10 lg:grid-cols-[1.25fr_1fr] lg:gap-14">
          <AnimatedItem className="flex flex-col gap-3">
            <YouTubeLite
              id={anchorVideo.id}
              title={anchorVideo.title}
              poster={shots.ytCapa}
            />
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
              <EvidenceTag kind="atual" />
              <p className="text-[13px] text-ink-3">
                {anchorVideo.channel} · publicado em {anchorVideo.publishedAt} ·{" "}
                <a
                  href={anchorVideo.url}
                  target="_blank"
                  rel="noreferrer"
                  className="underline decoration-line underline-offset-2 hover:text-violet-ink"
                >
                  ver no YouTube
                </a>{" "}
                · conferido em {CAPTURED_AT}
              </p>
            </div>
            <p className="text-[15px] font-medium leading-snug">
              {anchorVideo.title}
            </p>
          </AnimatedItem>

          <ol className="flex flex-col">
            {sequence.map((s, i) => (
              <AnimatedItem key={s.title}>
                <li className="grid grid-cols-[2rem_1fr] gap-3 border-t border-line py-5">
                  <span className="font-mono text-[13px] text-violet-ink">
                    {i + 1}
                  </span>
                  <div className="flex flex-col gap-2">
                    <p className="text-[15px] font-semibold">{s.title}</p>
                    <p className="text-[15px] leading-relaxed text-ink-2">
                      {s.body}
                    </p>
                    {s.kind === "proposta" && (
                      <EvidenceTag kind="proposta" className="w-fit" />
                    )}
                  </div>
                </li>
              </AnimatedItem>
            ))}
          </ol>
        </div>

        <AnimatedItem>
          <p className="headline max-w-3xl border-l-2 border-violet pl-5 text-[clamp(1.5rem,3.6vw,2.4rem)] font-medium">
            Depois de assistir, como essa pessoa encontra o próximo passo?
          </p>
        </AnimatedItem>
      </AnimatedSection>
    </section>
  );
}

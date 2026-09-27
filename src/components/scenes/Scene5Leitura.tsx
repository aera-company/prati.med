import { AnimatedItem, AnimatedSection } from "@/components/ui/AnimatedSection";
import { EvidenceTag } from "@/components/ui/EvidenceTag";
import { SceneIntro } from "@/components/ui/SceneIntro";

// Cena 5 · O que o piloto permitiria acompanhar.
// Painel conceitual: nenhum valor preenchido. "—" é valor vazio, não pontuação.

const rows = [
  {
    metric: "Visitas identificadas por conteúdo",
    question: "Quais peças levaram pessoas ao destino?",
  },
  {
    metric: "Aberturas de perfis",
    question: "A pessoa avançou para conhecer os profissionais?",
  },
  {
    metric: "Inícios de agendamento",
    question: "Houve avanço do perfil para a agenda?",
  },
  {
    metric: "Reservas concluídas",
    question: "Quantas reservas ocorreram no percurso acompanhado?",
  },
  {
    metric: "Consultas realizadas",
    question: "Quantas reservas se tornaram atendimento?",
    condition: "se o dado estiver disponível",
  },
  {
    metric: "Etapas com saída",
    question: "Onde vale investigar dificuldade ou dúvida?",
    condition: "quando mensuráveis",
  },
];

export function Scene5Leitura() {
  return (
    <section id="leitura" className="border-t border-line">
      <AnimatedSection className="mx-auto flex max-w-6xl flex-col gap-12 px-4 py-20 md:px-8 md:py-28">
        <SceneIntro
          n={5}
          label="O que acompanhar"
          title="Cada etapa deve ajudar a orientar a próxima decisão."
        />

        <AnimatedItem>
          <div className="overflow-hidden rounded-2xl border border-line bg-surface">
            <div className="flex flex-col gap-3 border-b border-line px-5 py-4 md:flex-row md:items-center md:justify-between">
              <div className="flex flex-col gap-1">
                <p className="text-[15px] font-semibold">
                  Piloto · primeiro psicólogo
                </p>
                <p className="font-mono text-[12px] text-ink-3">
                  Leitura por conteúdo · destino · etapa
                </p>
              </div>
              <EvidenceTag kind="conceitual" className="w-fit" />
            </div>

            <table className="w-full text-left">
              <caption className="sr-only">
                Indicadores do piloto e as perguntas que ajudam a responder.
                Nenhum valor preenchido.
              </caption>
              <thead className="hidden md:table-header-group">
                <tr className="font-mono text-[12px] text-ink-3">
                  <th scope="col" className="px-5 py-3 font-normal">Indicador</th>
                  <th scope="col" className="px-5 py-3 font-normal">Pergunta que ajuda a responder</th>
                  <th scope="col" className="px-5 py-3 text-right font-normal">Valor</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr
                    key={r.metric}
                    className="grid grid-cols-[1fr_auto] gap-x-4 gap-y-1 border-t border-line px-5 py-4 md:table-row md:p-0"
                  >
                    <th scope="row" className="text-[15px] font-medium md:px-5 md:py-4">
                      {r.metric}
                      {r.condition && (
                        <span className="block text-[12px] font-normal text-ink-3">
                          {r.condition}
                        </span>
                      )}
                    </th>
                    <td className="col-start-1 text-[14px] leading-snug text-ink-2 md:px-5 md:py-4">
                      {r.question}
                    </td>
                    <td
                      className="col-start-2 row-span-2 row-start-1 self-center text-right font-mono text-2xl text-ink-3 md:px-5 md:py-4"
                      aria-label="Sem dado"
                    >
                      —
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <p className="border-t border-dashed border-ink-3/40 bg-paper px-5 py-3 text-[13px] text-ink-2">
              Demonstração conceitual. Indicadores e disponibilidade serão
              validados com a Pratimed.
            </p>
          </div>
        </AnimatedItem>

        <div className="grid gap-6 md:grid-cols-2 md:gap-14">
          <AnimatedItem>
            <p className="text-[15px] leading-relaxed text-ink-2">
              A implementação aproveita os recursos que a Pratimed já tem, com
              responsáveis definidos. O desenho de dados será validado
              considerando finalidade, acesso e informações de saúde envolvidas.
            </p>
          </AnimatedItem>
          <AnimatedItem>
            <p className="text-[15px] leading-relaxed text-ink-2">
              Um link identificado mostra um percurso observado. Sozinho, ele não
              prova todo o efeito de um conteúdo sobre a decisão.
            </p>
          </AnimatedItem>
        </div>
      </AnimatedSection>
    </section>
  );
}

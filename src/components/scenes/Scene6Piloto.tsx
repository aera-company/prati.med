import { AnimatedItem, AnimatedSection } from "@/components/ui/AnimatedSection";
import { SceneIntro } from "@/components/ui/SceneIntro";

// Cena 6 · Um piloto concreto com a equipe atual.
// Resumo legível de entregas, colaboração e cronograma. A tabela completa de
// responsabilidades fica no brief como referência de dimensionamento.

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
  {
    who: "Sócios da Pratimed",
    what: "Prioridades, oferta, orçamento, responsáveis e decisões do projeto.",
  },
  {
    who: "AERA",
    what: "Direção de marca, desenho da jornada, sistema visual, primeiras aplicações, critérios de qualidade e coordenação da leitura do piloto.",
  },
  {
    who: "Parceiros de conteúdo e mídia",
    what: "Planejamento, produção, publicação e distribuição, conforme o escopo acordado.",
  },
  {
    who: "Site, CRM e dados",
    what: "Avaliação técnica, páginas e eventos, integrações e acesso aos dados.",
  },
  {
    who: "Responsáveis clínicos e jurídicos",
    what: "Validação das informações e dos procedimentos sob sua responsabilidade.",
  },
];

const phases = [
  {
    name: "Implantação",
    time: "4 a 6 semanas",
    steps: [
      "Alinhamento e acessos",
      "Desenho da jornada",
      "Sistema visual",
      "Aplicações",
      "Implementação",
      "Validação do percurso e da medição",
    ],
  },
  {
    name: "Acompanhamento",
    time: "30 dias com o piloto no ar",
    steps: [
      "Leitura dos sinais",
      "Registro de dificuldades",
      "Ajustes acordados",
      "Recomendação para o próximo ciclo",
    ],
  },
];

const closing = [
  "O percurso funciona e pode ser acompanhado?",
  "Quais barreiras foram observadas?",
  "O que merece continuar, mudar ou ganhar uma nova aplicação?",
];

export function Scene6Piloto() {
  return (
    <section id="piloto" className="border-t border-line bg-surface">
      <AnimatedSection className="mx-auto flex max-w-6xl flex-col gap-16 px-4 py-20 md:px-8 md:py-28">
        <SceneIntro
          n={6}
          label="Um piloto concreto"
          title="Primeiro piloto: escolher o primeiro psicólogo."
        >
          Uma direção compartilhada, construída com os sócios e com quem já faz
          a Pratimed acontecer.
        </SceneIntro>

        {/* Entregas */}
        <div className="grid gap-8 md:grid-cols-[1fr_1.6fr] md:gap-14">
          <AnimatedItem>
            <h3 className="text-xl font-semibold md:text-2xl">O que o piloto inclui</h3>
            <p className="mt-3 text-[14px] leading-relaxed text-ink-3">
              Recorte de referência, validado depois de conhecer ferramentas,
              contratos, dados e capacidade de execução.
            </p>
          </AnimatedItem>
          <ul className="flex flex-col">
            {scope.map((s) => (
              <AnimatedItem key={s}>
                <li className="flex gap-3 border-t border-line py-3.5 text-[15px] leading-snug">
                  <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-violet" />
                  {s}
                </li>
              </AnimatedItem>
            ))}
          </ul>
        </div>

        {/* Colaboração */}
        <div className="grid gap-8 md:grid-cols-[1fr_1.6fr] md:gap-14">
          <AnimatedItem>
            <h3 className="text-xl font-semibold md:text-2xl">Quem faz o quê</h3>
            <p className="mt-3 text-[14px] leading-relaxed text-ink-3">
              A AERA pode executar partes de design e tecnologia quando
              acordado, sem duplicar contratos existentes.
            </p>
          </AnimatedItem>
          <dl className="grid gap-3 sm:grid-cols-2">
            {roles.map((r) => (
              <AnimatedItem key={r.who}>
                <div
                  className={`h-full rounded-xl border p-4 ${r.who === "AERA" ? "border-violet bg-violet-soft" : "border-line bg-paper"}`}
                >
                  <dt className="text-[15px] font-semibold">{r.who}</dt>
                  <dd className="mt-1.5 text-[14px] leading-snug text-ink-2">{r.what}</dd>
                </div>
              </AnimatedItem>
            ))}
          </dl>
        </div>

        {/* Cronograma */}
        <div className="grid gap-8 md:grid-cols-[1fr_1.6fr] md:gap-14">
          <AnimatedItem>
            <h3 className="text-xl font-semibold md:text-2xl">Cronograma</h3>
            <p className="mt-3 text-[14px] leading-relaxed text-ink-3">
              O prazo depende da disponibilidade dos responsáveis, das
              aprovações e da complexidade técnica. Verba e distribuição serão
              definidas com os sócios e parceiros.
            </p>
          </AnimatedItem>
          <ol className="grid gap-3 sm:grid-cols-[1.3fr_1fr]">
            {phases.map((p, i) => (
              <AnimatedItem key={p.name}>
                <li className="flex h-full flex-col gap-4 rounded-xl border border-line p-5">
                  <div>
                    <p className="font-mono text-[12px] text-violet-ink">Fase {i + 1}</p>
                    <p className="mt-1 text-lg font-semibold">{p.name}</p>
                    <p className="text-[14px] text-ink-2">{p.time}</p>
                  </div>
                  <ul className="flex flex-col gap-1.5 text-[14px] text-ink-2">
                    {p.steps.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                </li>
              </AnimatedItem>
            ))}
          </ol>
        </div>

        {/* Ao fim do ciclo */}
        <AnimatedItem>
          <div className="rounded-2xl bg-paper-2 p-6 md:p-10">
            <p className="text-[14px] text-ink-2">Ao fim do ciclo, responder</p>
            <ul className="mt-4 flex flex-col gap-3">
              {closing.map((q) => (
                <li key={q} className="headline text-[clamp(1.25rem,2.6vw,1.75rem)] font-medium">
                  {q}
                </li>
              ))}
            </ul>
            <p className="mt-6 max-w-2xl text-[14px] leading-relaxed text-ink-3">
              O volume de visitas e consultas define a força das conclusões. Com
              poucos dados, o relatório traz sinais e limitações, sem prometer
              aumento de conversão em 30 dias.
            </p>
          </div>
        </AnimatedItem>
      </AnimatedSection>
    </section>
  );
}

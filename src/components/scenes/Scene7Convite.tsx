import Image from "next/image";
import { AnimatedItem, AnimatedSection } from "@/components/ui/AnimatedSection";
import { SceneIntro } from "@/components/ui/SceneIntro";
import { CAPTURED_AT, CONTACT_URL } from "@/content/sources";

// Cena 7 · Convite para construir. Única ação comercial da página.

export function Scene7Convite() {
  return (
    <section id="convite" className="bg-night text-night-ink">
      <AnimatedSection className="mx-auto flex max-w-6xl flex-col gap-12 px-4 py-24 md:px-8 md:py-32">
        <SceneIntro n={7} label="Próximo passo" title="Vamos construir o primeiro piloto." dark>
          AERA conecta marca, conteúdo e agendamento. E transforma os
          resultados dessa jornada em decisões para o próximo ciclo.
        </SceneIntro>

        <AnimatedItem className="flex max-w-2xl flex-col gap-8">
          <p className="border-l-2 border-violet pl-5 text-[17px] leading-relaxed">
            Uma conversa com os sócios para escolher o foco, conhecer a produção
            e os recursos atuais e combinar entregas, responsáveis e
            investimento.
          </p>
          <a
            href={CONTACT_URL}
            className="inline-flex w-fit items-center gap-2 rounded-full bg-violet px-7 py-4 text-[16px] font-semibold text-night transition-transform duration-200 hover:-translate-y-0.5 active:scale-[0.98]"
          >
            Conversar sobre o piloto <span aria-hidden>→</span>
          </a>
        </AnimatedItem>
      </AnimatedSection>

      <footer className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 text-[13px] text-night-2 md:flex-row md:items-end md:justify-between md:px-8">
          <div className="flex flex-col gap-4">
            <Image
              src="/brand/aera-logo.png"
              width={1868}
              height={312}
              alt="AERA"
              className="h-4 w-auto self-start"
            />
            <p>Da atenção à consulta · proposta para a Pratimed</p>
          </div>
          <p className="max-w-md leading-relaxed">
            Materiais atuais capturados de fontes públicas em {CAPTURED_AT}.
            Aplicações propostas e painel são demonstrações e não representam
            resultados. Interfaces sem dados de pacientes.
          </p>
        </div>
      </footer>
    </section>
  );
}

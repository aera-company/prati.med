import { PathLine, PmLogo } from "./parts";

// A direção em três elementos: tipografia com papéis, cor e o percurso.

const swatches = [
  { name: "Roxo Pratimed", hex: "#9479F7", role: "Assinatura e percurso", var: "--pm-violet" },
  { name: "Roxo profundo", hex: "#231A4F", role: "Texto e fundos de vídeo", var: "--pm-ink" },
  { name: "Roxo de ação", hex: "#5B45D6", role: "Botões e links", var: "--pm-violet-deep" },
  { name: "Lilás", hex: "#EEE9FF", role: "Etiquetas e apoio", var: "--pm-lilac" },
  { name: "Papel", hex: "#FBFAF7", role: "Base de todas as peças", var: "--pm-paper" },
];

export function DirectionSpec() {
  return (
    <div className="pm grid gap-px overflow-hidden rounded-2xl border border-[var(--pm-line)] bg-[var(--pm-line)] md:grid-cols-3">
      {/* Tipografia */}
      <div className="flex flex-col gap-4 bg-[var(--pm-paper)] p-6">
        <p className="font-mono text-[11px] text-ink-3">Tipografia</p>
        <p className="font-serif text-[34px] leading-[1.02]">
          A pergunta de quem procura
        </p>
        <p className="text-[17px] font-medium leading-snug">
          A resposta da Pratimed, clara e objetiva.
        </p>
        <p className="mt-auto text-[13px] leading-relaxed text-[var(--pm-ink-2)]">
          Serifa para a dúvida, sans para informação e ação. Sempre em caixa
          baixa, para ler rápido no feed e no celular.
        </p>
      </div>

      {/* Cor */}
      <div className="flex flex-col gap-4 bg-[var(--pm-paper)] p-6">
        <p className="font-mono text-[11px] text-ink-3">Cor</p>
        <ul className="flex flex-col gap-2">
          {swatches.map((s) => (
            <li key={s.name} className="flex items-center gap-3">
              <span
                className="size-8 shrink-0 rounded-lg border border-[var(--pm-line)]"
                style={{ background: `var(${s.var})` }}
              />
              <span className="min-w-0 text-[13px] leading-tight">
                <span className="font-semibold">{s.name}</span>{" "}
                <span className="font-mono text-[11px] text-[var(--pm-ink-2)]">{s.hex}</span>
                <span className="block text-[var(--pm-ink-2)]">{s.role}</span>
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-auto text-[13px] leading-relaxed text-[var(--pm-ink-2)]">
          Parte do roxo do símbolo atual. Verde só como sinal funcional de
          horário disponível.
        </p>
      </div>

      {/* Percurso e símbolo */}
      <div className="flex flex-col gap-4 bg-[var(--pm-paper)] p-6">
        <p className="font-mono text-[11px] text-ink-3">Elemento</p>
        <div className="flex items-center gap-3 py-2">
          <PmLogo className="w-24" />
          <PathLine className="flex-1 text-[18px]" />
        </div>
        <p className="text-[17px] font-medium leading-snug">
          O percurso liga pergunta, pessoa e horário.
        </p>
        <p className="mt-auto text-[13px] leading-relaxed text-[var(--pm-ink-2)]">
          Vem dos pontos do próprio símbolo. O logotipo atual segue nesta
          fase; uma V2 será avaliada dentro das aplicações.
        </p>
      </div>
    </div>
  );
}

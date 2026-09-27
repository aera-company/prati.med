import Image from "next/image";
import type { Pro } from "@/content/pros";

// Peças da direção proposta, reutilizadas nas quatro superfícies.

// Retrato do profissional como silhueta: retângulo arredondado, cabeça no
// terço superior (o enquadramento que a direção propõe para as fotos reais).
// Silhuetas em vez de fotos: quem aparece em cada peça será definido com a
// Pratimed e com os profissionais. O tom varia para distinguir pessoas.
// Quem usa define o posicionamento (relative ou absolute) via className.
const TONES = [
  { bg: "var(--pm-lilac)", fig: "var(--pm-violet)" },
  { bg: "#e4ddfb", fig: "var(--pm-violet-deep)" },
  { bg: "#f1eee6", fig: "#8c84b0" },
];

export function ProPhoto({
  pro,
  className = "",
  cover = false,
}: {
  pro: Pro;
  className?: string;
  cover?: boolean; // preenche a altura (plano médio), para quadros verticais
}) {
  const t = TONES[pro.tone % TONES.length];
  return (
    <div
      role="img"
      aria-label={`Retrato de ${pro.name} (silhueta)`}
      className={`overflow-hidden ${className}`}
      style={{ background: t.bg }}
    >
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio={cover ? "xMidYMax slice" : "xMidYMax meet"}
        className="absolute inset-0 size-full"
        aria-hidden
      >
        <circle cx="50" cy="40" r="17" fill={t.fig} opacity="0.85" />
        <path d="M13 100C13 75 30 63 50 63S87 75 87 100Z" fill={t.fig} opacity="0.85" />
      </svg>
    </div>
  );
}

// O percurso: ponto, linha, ponto. Liga pergunta, pessoa e horário.
export function PathLine({
  className = "",
  vertical = false,
}: {
  className?: string;
  vertical?: boolean;
}) {
  return (
    <span
      aria-hidden
      className={`relative flex items-center ${vertical ? "flex-col" : ""} ${className}`}
    >
      <span className="size-[0.5em] shrink-0 rounded-full border-[0.12em] border-[var(--pm-violet)] bg-[var(--pm-paper)]" />
      <span
        className={`${vertical ? "w-[0.12em] flex-1" : "h-[0.12em] flex-1"} bg-[var(--pm-violet)]`}
      />
      <span className="size-[0.5em] shrink-0 rounded-full bg-[var(--pm-violet)]" />
    </span>
  );
}

// Assinatura: símbolo atual mantido nesta fase (a V2 será avaliada depois).
export function PmLogo({ className = "" }: { className?: string }) {
  return (
    <Image
      src="/brand/pratimed-logo.webp"
      width={384}
      height={143}
      alt="Pratimed"
      className={`h-auto ${className}`}
    />
  );
}

export function Stars({ score, count }: { score: string; count: number }) {
  return (
    <span className="inline-flex items-center gap-1 text-[var(--pm-ink-2)]">
      <svg viewBox="0 0 20 20" className="size-[1em] text-[var(--pm-violet)]" aria-hidden>
        <path
          fill="currentColor"
          d="M10 1.8l2.5 5.2 5.7.8-4.1 4 1 5.7L10 14.8l-5.1 2.7 1-5.7-4.1-4 5.7-.8z"
        />
      </svg>
      {score} · {count} avaliações
    </span>
  );
}

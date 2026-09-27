// Rótulo que distingue o que existe, o que é proposto e o que é demonstração
// (brief V6, "Critério de evidência"). Discreto, mas sempre legível.

export type Evidence = "atual" | "proposta" | "conceitual";

const LABEL: Record<Evidence, string> = {
  atual: "Material atual",
  proposta: "Aplicação proposta",
  conceitual: "Demonstração conceitual",
};

const STYLE: Record<Evidence, string> = {
  atual: "bg-surface text-ink-2 border border-line",
  proposta: "bg-violet-ink text-white border border-violet-ink",
  conceitual: "bg-paper text-ink-2 border border-dashed border-ink-3",
};

const DOT: Record<Evidence, string> = {
  atual: "bg-ink-3",
  proposta: "bg-violet",
  conceitual: "border border-ink-3",
};

export function EvidenceTag({
  kind,
  className = "",
}: {
  kind: Evidence;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[11px] leading-none ${STYLE[kind]} ${className}`}
    >
      <span aria-hidden className={`size-1.5 rounded-full ${DOT[kind]}`} />
      {LABEL[kind]}
    </span>
  );
}

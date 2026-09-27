import { EvidenceTag } from "./EvidenceTag";

// Lugar reservado para uma aplicação proposta que ainda será desenhada.
// Lista o que a peça precisa resolver, sem simular uma interface pronta.
export function ProposalSlot({
  title,
  items,
  ratio = "aspect-[4/3] lg:aspect-[4/5]",
  className = "",
}: {
  title: string;
  items?: string[];
  ratio?: string;
  className?: string;
}) {
  return (
    <div
      className={`proposal-slot relative flex flex-col justify-end gap-3 rounded-xl p-5 ${ratio} ${className}`}
    >
      <EvidenceTag kind="proposta" className="absolute left-3 top-3" />
      <p className="text-[15px] font-semibold text-ink">{title}</p>
      {items && (
        <ul className="flex flex-col gap-1 text-[13px] leading-snug text-ink-2">
          {items.map((it) => (
            <li key={it} className="flex gap-2">
              <span aria-hidden className="text-violet-ink">
                ·
              </span>
              {it}
            </li>
          ))}
        </ul>
      )}
      <p className="font-mono text-[11px] text-ink-3">Em desenho</p>
    </div>
  );
}

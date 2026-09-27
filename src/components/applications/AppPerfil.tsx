import { amanda } from "@/content/pros";
import { PathLine, ProPhoto, Stars } from "./parts";

// Superfície 4 · Card do profissional, com continuidade até a agenda.
// Dados públicos do perfil em 27/09/2026. Nome em caixa baixa, valor e
// próximo horário juntos, e o mesmo desenho segue no passo de agendamento.

const steps = ["Data", "Horário", "Confirmar"];

export function AppPerfil() {
  const p = amanda;
  return (
    <div className="pm mx-auto flex w-full max-w-[420px] flex-col gap-3">
      {/* Card na lista */}
      <article className="rounded-3xl border border-[var(--pm-line)] bg-white p-5 shadow-[0_24px_48px_-32px_rgba(35,26,79,0.5)]">
        <div className="flex gap-4">
          <ProPhoto pro={p} className="relative aspect-[4/5] w-24 shrink-0 rounded-2xl" />
          <div className="flex min-w-0 flex-col gap-1">
            <h4 className="text-[18px] font-semibold leading-tight">{p.name}</h4>
            <p className="text-[13px] text-[var(--pm-ink-2)]">Psicóloga · CRP {p.crp}</p>
            {p.rating && (
              <p className="text-[13px]">
                <Stars {...p.rating} />
              </p>
            )}
          </div>
        </div>

        <p className="mt-4 font-serif text-[21px] leading-snug">{p.focus}</p>
        <ul className="mt-3 flex flex-wrap gap-1.5">
          {p.tags.map((t) => (
            <li
              key={t}
              className="rounded-full bg-[var(--pm-lilac)] px-2.5 py-1 text-[12px] text-[var(--pm-violet-deep)]"
            >
              {t}
            </li>
          ))}
        </ul>

        <div className="mt-5 grid grid-cols-2 gap-3 border-t border-[var(--pm-line)] pt-4">
          <div>
            <p className="text-[12px] text-[var(--pm-ink-2)]">Sessão online</p>
            <p className="text-[18px] font-semibold">
              R$ {p.price} <span className="text-[13px] font-normal text-[var(--pm-ink-2)]">· {p.duration}</span>
            </p>
          </div>
          <div>
            <p className="text-[12px] text-[var(--pm-ink-2)]">Próximo horário</p>
            <p className="flex items-center gap-1.5 text-[18px] font-semibold">
              <span className="size-2 rounded-full bg-[var(--pm-open)]" aria-hidden />
              {p.next}
            </p>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-center gap-2 rounded-full bg-[var(--pm-violet-deep)] py-3 text-[15px] font-semibold text-white">
          Ver horários <span aria-hidden>→</span>
        </div>
      </article>

      {/* Continuação: o agendamento com o mesmo desenho */}
      <div className="rounded-3xl border border-[var(--pm-line)] bg-[var(--pm-paper)] p-5">
        <div className="flex items-center gap-3">
          <ProPhoto pro={p} className="relative size-10 shrink-0 rounded-xl" />
          <div className="min-w-0">
            <p className="truncate text-[14px] font-semibold">{p.name}</p>
            <p className="text-[12px] text-[var(--pm-ink-2)]">
              R$ {p.price} · {p.duration} · online
            </p>
          </div>
        </div>
        <ol className="mt-5 grid grid-cols-3 text-[12px]">
          {steps.map((s, i) => (
            <li key={s} className="flex flex-col gap-2">
              <span className="flex items-center">
                <span
                  className={`size-2.5 shrink-0 rounded-full ${i === 0 ? "bg-[var(--pm-violet)]" : "border-2 border-[var(--pm-violet)] bg-[var(--pm-paper)]"}`}
                />
                {i < steps.length - 1 && <span className="h-0.5 flex-1 bg-[var(--pm-violet)]/40" />}
              </span>
              <span className={i === 0 ? "font-semibold" : "text-[var(--pm-ink-2)]"}>
                {i + 1}. {s}
              </span>
            </li>
          ))}
        </ol>
        <p className="mt-4 flex items-center gap-2 text-[12px] text-[var(--pm-ink-2)]">
          <PathLine className="w-5 text-[11px]" />
          Mesmo nome, retrato, valor e horário do card
        </p>
      </div>
    </div>
  );
}

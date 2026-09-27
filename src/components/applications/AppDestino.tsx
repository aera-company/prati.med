import { amanda, raquelBento, raquelBiondi, TOTAL_PSICOLOGOS, type Pro } from "@/content/pros";
import { PathLine, PmLogo, ProPhoto } from "./parts";

// Superfície 3 · Página de destino, vista no celular.
// Continua a pergunta do vídeo, organiza critérios e leva aos perfis.

const criteria = [
  { name: "Abordagem", body: "Como cada profissional trabalha, como TCC ou psicanálise." },
  { name: "Valor", body: "O valor da sessão aparece em cada perfil, antes de agendar." },
  { name: "Horário", body: "Veja o próximo horário livre e reserve online." },
];

function MiniCard({ pro }: { pro: Pro }) {
  return (
    <li className="flex items-center gap-3 rounded-2xl border border-[var(--pm-line)] bg-white p-3">
      <ProPhoto pro={pro} className="relative size-14 shrink-0 rounded-xl" />
      <div className="min-w-0 flex-1">
        <p className="truncate text-[14px] font-semibold">{pro.name}</p>
        <p className="truncate text-[12px] text-[var(--pm-ink-2)]">{pro.focus}</p>
      </div>
      <p className="shrink-0 text-right text-[13px] font-semibold">R$ {pro.price}</p>
    </li>
  );
}

export function AppDestino() {
  return (
    <div className="pm mx-auto w-full max-w-[380px] rounded-[2.2rem] border-[7px] border-[var(--pm-ink)] bg-[var(--pm-ink)] shadow-[0_30px_60px_-30px_rgba(35,26,79,0.6)]">
      <div className="overflow-hidden rounded-[1.7rem] bg-[var(--pm-paper)]">
        <div className="flex items-center justify-between px-5 pb-3 pt-5">
          <PmLogo className="w-24" />
          <span className="text-[12px] text-[var(--pm-ink-2)]">Psicologia</span>
        </div>

        <div className="px-5 pb-6 pt-4">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--pm-lilac)] px-2.5 py-1 text-[12px] font-medium text-[var(--pm-violet-deep)]">
            <span className="size-1.5 rounded-full bg-[var(--pm-violet)]" />
            Primeira sessão
          </span>
          <h4 className="mt-4 font-serif text-[34px] leading-[1.02]">
            Como escolher um psicólogo para a primeira sessão
          </h4>
          <p className="mt-3 text-[15px] leading-relaxed text-[var(--pm-ink-2)]">
            Três critérios ajudam a comparar. A sessão é online, por
            videochamada, de onde você estiver.
          </p>
        </div>

        <ol className="flex flex-col gap-4 border-y border-[var(--pm-line)] bg-white px-5 py-5">
          {criteria.map((c, i) => (
            <li key={c.name} className="grid grid-cols-[1.5rem_1fr] gap-2">
              <span className="font-mono text-[13px] text-[var(--pm-violet-deep)]">{i + 1}</span>
              <div>
                <p className="text-[15px] font-semibold">{c.name}</p>
                <p className="text-[13px] leading-snug text-[var(--pm-ink-2)]">{c.body}</p>
              </div>
            </li>
          ))}
        </ol>

        <ProfilesBlock />
      </div>
    </div>
  );
}

// Bloco "Para começar": três perfis e o acesso à lista completa.
function ProfilesBlock() {
  return (
    <div className="px-5 py-5">
      <p className="flex items-center gap-2 text-[13px] font-medium text-[var(--pm-ink-2)]">
        <PathLine className="w-6 text-[12px]" />
        Para começar
      </p>
      <ul className="mt-3 flex flex-col gap-2">
        {[amanda, raquelBiondi, raquelBento].map((p) => (
          <MiniCard key={p.crp} pro={p} />
        ))}
      </ul>
      <div className="mt-4 flex items-center justify-center gap-2 rounded-full bg-[var(--pm-violet-deep)] py-3.5 text-[15px] font-semibold text-white">
        Ver os {TOTAL_PSICOLOGOS} psicólogos <span aria-hidden>→</span>
      </div>
    </div>
  );
}

// Recorte usado na cena 4: só o bloco dos perfis, com o celular cortado
// no topo, para não repetir a página inteira que já aparece na cena 3.
export function AppDestinoPerfis() {
  return (
    <div className="pm mx-auto w-full max-w-[380px] rounded-b-[2.2rem] border-[7px] border-t-0 border-[var(--pm-ink)] bg-[var(--pm-ink)] shadow-[0_30px_60px_-30px_rgba(35,26,79,0.6)]">
      <div className="relative overflow-hidden rounded-b-[1.7rem] bg-[var(--pm-paper)]">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 z-10 h-8 bg-linear-to-b from-[var(--pm-paper)] to-transparent"
        />
        <ProfilesBlock />
      </div>
    </div>
  );
}

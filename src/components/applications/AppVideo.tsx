import { amanda, raquelBento, raquelBiondi } from "@/content/pros";
import { PathLine, PmLogo, ProPhoto } from "./parts";

// Superfície 2 · Dentro do vídeo (9:16). Dois momentos:
// A) abertura com a pergunta e a identificação de quem fala;
// B) fechamento com um próximo passo concreto.
// Não há legenda de fala: não atribuímos palavras a uma profissional real.

function Frame({ children, time }: { children: React.ReactNode; time: string }) {
  return (
    <figure className="flex flex-col gap-2">
      <div className="pm @container relative aspect-[9/16] overflow-hidden rounded-[5cqw] bg-[var(--pm-ink)] shadow-[0_30px_60px_-36px_rgba(35,26,79,0.6)]">
        {children}
      </div>
      <figcaption className="font-mono text-[11px] text-ink-3">{time}</figcaption>
    </figure>
  );
}

export function AppVideo() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-5">
      <Frame time="Abertura · identificação">
        <ProPhoto pro={amanda} className="absolute inset-0" cover />
        <div className="absolute inset-x-0 top-0 h-2/5 bg-linear-to-b from-[rgba(35,26,79,0.7)] to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-[rgba(35,26,79,0.85)] to-transparent" />
        <p className="absolute left-[7cqw] right-[7cqw] top-[8cqw] font-serif text-[9.5cqw] leading-[1] text-white">
          Como escolher um psicólogo para a primeira sessão?
        </p>
        <div className="absolute bottom-[9cqw] left-[6cqw] right-[6cqw] rounded-[3.5cqw] bg-[var(--pm-paper)] p-[4.5cqw]">
          <p className="text-[5.4cqw] font-semibold leading-tight">{amanda.name}</p>
          <p className="mt-[1cqw] flex items-center gap-[2cqw] text-[4cqw] text-[var(--pm-ink-2)]">
            <PathLine className="w-[7cqw] text-[3.4cqw]" />
            Psicóloga · CRP {amanda.crp}
          </p>
        </div>
      </Frame>

      <Frame time="Fechamento · próximo passo">
        <div className="absolute inset-0 flex flex-col bg-[var(--pm-paper)] p-[7cqw]">
          <PmLogo className="w-[30cqw]" />
          <p className="mt-[10cqw] text-[4.2cqw] font-medium text-[var(--pm-violet-deep)]">
            Próximo passo
          </p>
          <p className="mt-[2cqw] font-serif text-[10.5cqw] leading-[1]">
            Compare perfis, valores e horários.
          </p>
          <ol className="mt-[8cqw] flex flex-col gap-[3.5cqw] text-[4.6cqw] font-medium">
            {["Abordagem", "Valor", "Horário"].map((c, i) => (
              <li key={c} className="flex items-center gap-[3cqw]">
                <span className="font-mono text-[3.8cqw] text-[var(--pm-violet-deep)]">{i + 1}</span>
                {c}
              </li>
            ))}
          </ol>
          <div className="mt-auto flex -space-x-[3cqw]">
            {[amanda, raquelBiondi, raquelBento].map((p) => (
              <ProPhoto
                key={p.crp}
                pro={p}
                className="relative size-[17cqw] rounded-[4cqw] border-[1cqw] border-[var(--pm-paper)]"
              />
            ))}
          </div>
          <div className="mt-[6cqw] flex items-center justify-between gap-[2cqw] rounded-full bg-[var(--pm-violet-deep)] px-[5cqw] py-[3.6cqw] text-[4.2cqw] font-semibold text-white">
            pratimed.com.br/primeira-sessao
            <span aria-hidden>→</span>
          </div>
        </div>
      </Frame>
    </div>
  );
}

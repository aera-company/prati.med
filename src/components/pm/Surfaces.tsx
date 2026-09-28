import { amanda, raquelBento, raquelBiondi, TOTAL_PSICOLOGOS, type Pro } from "@/content/pros";
import { PathLine, PmLogo, ProPhoto, Stars } from "./parts";

// Aplicações propostas da identidade Pratimed ("a pergunta primeiro").
// Cada superfície é um @container dimensionado em cqw: escala como imagem
// em qualquer largura. Silhuetas no lugar de fotos; dados de perfis públicos.

const Q = "Terapia online funciona?";

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex w-fit items-center gap-[0.6em] rounded-full bg-[var(--pm-lilac)] px-[0.9em] py-[0.4em] font-medium text-[var(--pm-violet-deep)]">
      <span className="size-[0.5em] rounded-full bg-[var(--pm-violet)]" />
      {children}
    </span>
  );
}

/* Post de feed 4:5 */
export function PmPost({ className = "" }: { className?: string }) {
  return (
    <div className={`pm @container ${className}`}>
      <div className="flex aspect-[4/5] flex-col justify-between bg-[var(--pm-paper)] p-[8cqw]">
        <div className="flex items-center justify-between text-[3.6cqw]">
          <PmLogo className="w-[26cqw]" />
          <Tag>Primeira sessão</Tag>
        </div>
        <p className="pm-q text-[15cqw]">{Q}</p>
        <div className="flex items-center gap-[3cqw] text-[3.8cqw] text-[var(--pm-ink-2)]">
          <PathLine className="w-[12cqw] text-[3.4cqw]" />
          Uma psicóloga responde, no vídeo completo
        </div>
      </div>
    </div>
  );
}

/* Capa 16:9 */
export function PmThumb({ className = "" }: { className?: string }) {
  return (
    <div className={`pm @container ${className}`}>
      <div className="grid aspect-video grid-cols-[1.4fr_1fr] overflow-hidden bg-[var(--pm-paper)]">
        <div className="flex flex-col justify-between p-[5cqw] pr-[2cqw]">
          <span className="text-[1.9cqw]">
            <Tag>Primeira sessão</Tag>
          </span>
          <p className="pm-q text-[8.4cqw]">{Q}</p>
          <div className="flex items-center gap-[2cqw]">
            <PmLogo className="w-[13cqw]" />
            <PathLine className="w-[8cqw] text-[2.2cqw]" />
            <span className="text-[1.9cqw] text-[var(--pm-ink-2)]">com Amanda de Sá, psicóloga</span>
          </div>
        </div>
        <ProPhoto pro={amanda} className="relative m-[2.4cqw] ml-0 rounded-[1.6cqw]" />
      </div>
    </div>
  );
}

/* Vídeo 9:16: abertura, com ou sem identificação de quem fala */
export function PmVideoOpen({ lower = false, className = "" }: { lower?: boolean; className?: string }) {
  return (
    <div className={`pm @container ${className}`}>
      <div className="relative aspect-[9/16] overflow-hidden bg-[var(--pm-ink)]">
        <ProPhoto pro={amanda} className="absolute inset-0" cover />
        <div className="absolute inset-x-0 top-0 h-1/2 bg-linear-to-b from-[rgba(35,26,79,0.78)] to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-[rgba(35,26,79,0.8)] to-transparent" />
        <p className="pm-q absolute left-[7cqw] right-[7cqw] top-[9cqw] text-[15cqw] text-white">{Q}</p>
        <div
          data-lower
          className={`absolute bottom-[9cqw] left-[6cqw] right-[6cqw] rounded-[3.5cqw] bg-[var(--pm-paper)] p-[4.5cqw] ${lower ? "" : "invisible"}`}
        >
          <p className="text-[5.6cqw] font-semibold leading-tight">{amanda.name}</p>
          <p className="mt-[1.2cqw] flex items-center gap-[2cqw] text-[4.2cqw] text-[var(--pm-ink-2)]">
            <PathLine className="w-[7cqw] text-[3.4cqw]" />
            Psicóloga · CRP {amanda.crp}
          </p>
        </div>
      </div>
    </div>
  );
}

/* Vídeo 9:16: fechamento com o próximo passo */
export function PmVideoCta({ className = "" }: { className?: string }) {
  return (
    <div className={`pm @container ${className}`}>
      <div className="flex aspect-[9/16] flex-col bg-[var(--pm-paper)] p-[8cqw]">
        <PmLogo className="w-[32cqw]" />
        <p className="mt-[12cqw] text-[4.6cqw] font-medium text-[var(--pm-violet-deep)]">Próximo passo</p>
        <p className="pm-q mt-[2cqw] text-[13cqw]">Escolha quem vai te ouvir.</p>
        <p className="mt-[4cqw] text-[4.6cqw] leading-snug text-[var(--pm-ink-2)]">
          Perfis, valores e horários, em um só lugar.
        </p>
        <div className="mt-auto flex -space-x-[3cqw]">
          {[amanda, raquelBiondi, raquelBento].map((p) => (
            <ProPhoto key={p.crp} pro={p} className="relative size-[18cqw] rounded-[4.5cqw] border-[1cqw] border-[var(--pm-paper)]" />
          ))}
        </div>
        <div className="mt-[6cqw] flex items-center justify-between rounded-full bg-[var(--pm-violet-deep)] px-[5.5cqw] py-[4cqw] text-[4.4cqw] font-semibold text-white">
          pratimed.com.br/primeira-sessao
          <span aria-hidden>→</span>
        </div>
      </div>
    </div>
  );
}

function MiniCard({ pro }: { pro: Pro }) {
  return (
    <li className="flex items-center gap-[3.5cqw] rounded-[4cqw] border border-[var(--pm-line)] bg-white p-[3cqw]">
      <ProPhoto pro={pro} className="relative size-[14cqw] shrink-0 rounded-[3cqw]" />
      <div className="min-w-0 flex-1">
        <p className="truncate text-[4.2cqw] font-semibold">{pro.name}</p>
        <p className="truncate text-[3.4cqw] text-[var(--pm-ink-2)]">{pro.focus}</p>
      </div>
      <p className="shrink-0 text-[4cqw] font-semibold">R$ {pro.price}</p>
    </li>
  );
}

/* Página de destino no celular */
export function PmDestino({ className = "" }: { className?: string }) {
  return (
    <div className={`pm @container ${className}`}>
      <div className="aspect-[9/18.5] overflow-hidden rounded-[9cqw] border-[2cqw] border-[var(--pm-ink)] bg-[var(--pm-paper)]">
        <div className="flex items-center justify-between px-[6cqw] pt-[6cqw]">
          <PmLogo className="w-[26cqw]" />
          <span className="text-[3.4cqw] text-[var(--pm-ink-2)]">Psicologia</span>
        </div>
        <div className="px-[6cqw] pt-[7cqw]">
          <span className="text-[3.4cqw]">
            <Tag>Primeira sessão</Tag>
          </span>
          <p className="pm-q mt-[4cqw] text-[10.5cqw]">Como escolher um psicólogo para a primeira sessão</p>
          <p className="mt-[3cqw] text-[3.9cqw] leading-snug text-[var(--pm-ink-2)]">
            Compare abordagem, valor e horário. A sessão é online, de onde você estiver.
          </p>
        </div>
        <div className="mt-[6cqw] px-[6cqw]">
          <p className="flex items-center gap-[2.5cqw] text-[3.6cqw] font-medium text-[var(--pm-ink-2)]">
            <PathLine className="w-[7cqw] text-[3.2cqw]" /> Para começar
          </p>
          <ul className="mt-[3cqw] flex flex-col gap-[2.2cqw]">
            {[amanda, raquelBiondi, raquelBento].map((p) => (
              <MiniCard key={p.crp} pro={p} />
            ))}
          </ul>
          <div className="mt-[4cqw] rounded-full bg-[var(--pm-violet-deep)] py-[3.6cqw] text-center text-[4.2cqw] font-semibold text-white">
            Ver os {TOTAL_PSICOLOGOS} psicólogos →
          </div>
        </div>
      </div>
    </div>
  );
}

/* Card do profissional */
export function PmCard({ className = "" }: { className?: string }) {
  const p = amanda;
  return (
    <div className={`pm @container ${className}`}>
      <article className="rounded-[7cqw] bg-white p-[6cqw]">
        <div className="flex gap-[5cqw]">
          <ProPhoto pro={p} className="relative aspect-[4/5] w-[27cqw] shrink-0 rounded-[4.5cqw]" />
          <div className="flex min-w-0 flex-col gap-[1.2cqw]">
            <p className="text-[5.4cqw] font-semibold leading-tight">{p.name}</p>
            <p className="text-[3.7cqw] text-[var(--pm-ink-2)]">Psicóloga · CRP {p.crp}</p>
            {p.rating && (
              <p className="text-[3.7cqw]">
                <Stars {...p.rating} />
              </p>
            )}
          </div>
        </div>
        <p className="pm-q mt-[6cqw] text-[7.4cqw]">{p.focus}</p>
        <ul className="mt-[3.5cqw] flex flex-wrap gap-[1.6cqw] text-[3.4cqw]">
          {p.tags.map((t) => (
            <li key={t} className="rounded-full bg-[var(--pm-lilac)] px-[2.6cqw] py-[1cqw] text-[var(--pm-violet-deep)]">
              {t}
            </li>
          ))}
        </ul>
        <div className="mt-[6cqw] grid grid-cols-2 gap-[3cqw] border-t border-[var(--pm-line)] pt-[4.5cqw]">
          <div>
            <p className="text-[3.3cqw] text-[var(--pm-ink-2)]">Sessão online</p>
            <p className="text-[5.4cqw] font-semibold">
              R$ {p.price} <span className="text-[3.6cqw] font-normal text-[var(--pm-ink-2)]">· {p.duration}</span>
            </p>
          </div>
          <div>
            <p className="text-[3.3cqw] text-[var(--pm-ink-2)]">Próximo horário</p>
            <p className="flex items-center gap-[1.5cqw] text-[5.4cqw] font-semibold">
              <span aria-hidden className="size-[2cqw] rounded-full bg-[var(--pm-open)]" />
              {p.next}
            </p>
          </div>
        </div>
        <div className="mt-[5cqw] rounded-full bg-[var(--pm-violet-deep)] py-[3.6cqw] text-center text-[4.2cqw] font-semibold text-white">
          Ver horários →
        </div>
      </article>
    </div>
  );
}

/* Agenda: o mesmo desenho até a reserva */
const WEEK = ["28", "29", "30", "1", "2", "3", "4"];
const DAYS = ["dom", "seg", "ter", "qua", "qui", "sex", "sáb"];

export function PmAgenda({ className = "" }: { className?: string }) {
  const p = amanda;
  return (
    <div className={`pm @container ${className}`}>
      <div className="rounded-[7cqw] bg-[var(--pm-paper)] p-[6cqw]">
        <div className="flex items-center gap-[3.5cqw]">
          <ProPhoto pro={p} className="relative size-[13cqw] shrink-0 rounded-[3.5cqw]" />
          <div className="min-w-0">
            <p className="truncate text-[4.6cqw] font-semibold">{p.name}</p>
            <p className="text-[3.5cqw] text-[var(--pm-ink-2)]">R$ {p.price} · {p.duration} · online</p>
          </div>
        </div>

        <ol className="mt-[6cqw] grid grid-cols-3 text-[3.4cqw]">
          {["Data", "Horário", "Confirmar"].map((s, i) => (
            <li key={s} className="flex flex-col gap-[2cqw]">
              <span className="flex items-center">
                <span className={`size-[2.8cqw] shrink-0 rounded-full ${i < 2 ? "bg-[var(--pm-violet)]" : "border-[0.6cqw] border-[var(--pm-violet)]"}`} />
                {i < 2 && <span className={`h-[0.5cqw] flex-1 ${i < 1 ? "bg-[var(--pm-violet)]" : "bg-[var(--pm-violet)]/35"}`} />}
              </span>
              <span className={i < 2 ? "font-semibold" : "text-[var(--pm-ink-2)]"}>{s}</span>
            </li>
          ))}
        </ol>

        <div className="mt-[6cqw] rounded-[4.5cqw] bg-white p-[4.5cqw]">
          <p className="text-[3.6cqw] font-semibold">Setembro e outubro</p>
          <div className="mt-[3cqw] grid grid-cols-7 gap-[1.5cqw] text-center">
            {DAYS.map((d) => (
              <span key={d} className="text-[2.9cqw] text-[var(--pm-ink-2)]">{d}</span>
            ))}
            {WEEK.map((d, i) => (
              <span
                key={d}
                className={`grid aspect-square place-items-center rounded-full text-[3.6cqw] ${i === 0 ? "bg-[var(--pm-violet-deep)] font-semibold text-white" : ""}`}
              >
                {d}
              </span>
            ))}
          </div>
          <div className="mt-[4cqw] flex items-center gap-[2cqw] border-t border-[var(--pm-line)] pt-[3.5cqw] text-[3.6cqw]">
            <span className="rounded-full border-[0.4cqw] border-[var(--pm-violet-deep)] px-[3cqw] py-[1.2cqw] font-semibold text-[var(--pm-violet-deep)]">
              13h00
            </span>
            <span className="text-[var(--pm-ink-2)]">Próximo horário livre</span>
          </div>
        </div>

        <div className="mt-[5cqw] rounded-full bg-[var(--pm-violet-deep)] py-[3.6cqw] text-center text-[4.2cqw] font-semibold text-white">
          Confirmar horário →
        </div>
      </div>
    </div>
  );
}

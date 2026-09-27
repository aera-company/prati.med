import { amanda } from "@/content/pros";
import { PathLine, PmLogo, ProPhoto } from "./parts";

// Superfície 1 · Miniatura 16:9 da continuação proposta do vídeo.
// Tudo em cqw: a peça escala como imagem, do mobile ao desktop.
export function AppThumb() {
  return (
    <div className="pm @container">
      <div className="relative grid aspect-video grid-cols-[1.35fr_1fr] overflow-hidden rounded-[2cqw] bg-[var(--pm-paper)] shadow-[0_30px_60px_-36px_rgba(35,26,79,0.55)]">
        <div className="flex flex-col justify-between p-[5cqw] pr-[3cqw]">
          <span className="inline-flex w-fit items-center gap-[1cqw] rounded-full bg-[var(--pm-lilac)] px-[1.8cqw] py-[0.8cqw] text-[1.9cqw] font-medium text-[var(--pm-violet-deep)]">
            <span className="size-[1cqw] rounded-full bg-[var(--pm-violet)]" />
            Primeira sessão
          </span>
          <p className="font-serif text-[6.6cqw] leading-[0.98] tracking-[-0.01em]">
            Como escolher um psicólogo para a primeira sessão?
          </p>
          <div className="flex items-center gap-[2cqw]">
            <PmLogo className="w-[13cqw]" />
            <PathLine className="w-[8cqw] text-[2.2cqw]" />
            <span className="text-[1.9cqw] text-[var(--pm-ink-2)]">
              com {amanda.name.split(" ").slice(0, 3).join(" ")}, psicóloga
            </span>
          </div>
        </div>
        <ProPhoto pro={amanda} className="relative m-[2.4cqw] ml-0 rounded-[1.6cqw]" />
      </div>
    </div>
  );
}

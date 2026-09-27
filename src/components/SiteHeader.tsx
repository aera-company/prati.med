import Image from "next/image";

// Cabeçalho discreto: o nome da proposta fica aqui, o hero fica com a pergunta.
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/85 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 md:px-8">
        <div className="flex items-center gap-3">
          <Image
            src="/brand/pratimed-logo.webp"
            width={384}
            height={143}
            alt="Pratimed"
            className="h-7 w-auto"
            priority
          />
          <span aria-hidden className="text-ink-3">
            ×
          </span>
          <Image
            src="/brand/aera-logo.png"
            width={1868}
            height={312}
            alt="AERA"
            className="h-3.5 w-auto invert"
            priority
          />
        </div>
        <p className="hidden text-[13px] text-ink-2 sm:block">
          Da atenção à consulta
        </p>
      </div>
    </header>
  );
}

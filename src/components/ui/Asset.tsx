import Image from "next/image";
import type { Shot } from "@/content/sources";

// Material atual da Pratimed tratado como objeto. A fonte fica no tooltip
// (title) e no painel de notas; na tela, só o chip "Hoje" quando pedido.
export function Asset({
  shot,
  className = "",
  sizes = "(min-width: 768px) 30vw, 60vw",
  priority = false,
  chip = false,
}: {
  shot: Shot;
  className?: string;
  sizes?: string;
  priority?: boolean;
  chip?: boolean;
}) {
  return (
    <figure
      className={`object relative ${className}`}
      title={`${shot.context} · capturado em ${shot.captured}`}
    >
      <Image
        src={shot.src}
        width={shot.width}
        height={shot.height}
        alt={shot.alt}
        sizes={sizes}
        priority={priority}
        className="block h-auto w-full"
      />
      {chip && <Chip className="absolute left-2 top-2">Hoje</Chip>}
    </figure>
  );
}

export function Chip({
  children,
  tone = "light",
  className = "",
}: {
  children: React.ReactNode;
  tone?: "light" | "violet" | "dark";
  className?: string;
}) {
  const t = {
    light: "bg-white/90 text-ink",
    violet: "bg-violet text-ink",
    dark: "bg-ink/80 text-white",
  }[tone];
  return (
    <span
      className={`micro inline-flex items-center gap-1.5 rounded-full px-2 py-1 backdrop-blur ${t} ${className}`}
    >
      <span aria-hidden className="size-1.5 rounded-full bg-current opacity-60" />
      {children}
    </span>
  );
}

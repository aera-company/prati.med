import Image from "next/image";
import { CAPTURED_AT, type Shot } from "@/content/sources";
import { EvidenceTag } from "./EvidenceTag";

// Screenshot real, com aparência original, rótulo "Material atual" e fonte.
export function ShotFigure({
  shot,
  className = "",
  sizes = "(min-width: 1024px) 50vw, 100vw",
  priority = false,
  showCaption = true,
}: {
  shot: Shot;
  className?: string;
  sizes?: string;
  priority?: boolean;
  showCaption?: boolean;
}) {
  return (
    <figure className={`flex flex-col gap-2 ${className}`}>
      <div className="overflow-hidden rounded-xl border border-line bg-surface shadow-[0_24px_48px_-32px_rgba(23,22,28,0.45)]">
        <Image
          src={shot.src}
          width={shot.width}
          height={shot.height}
          alt={shot.alt}
          sizes={sizes}
          priority={priority}
          className="h-auto w-full"
        />
      </div>
      {showCaption && (
        <figcaption className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[12px] leading-snug text-ink-3">
          <EvidenceTag kind="atual" />
          {shot.context} ·{" "}
          <a
            href={shot.source}
            target="_blank"
            rel="noreferrer"
            className="underline decoration-line underline-offset-2 hover:text-violet-ink"
          >
            fonte
          </a>{" "}
          · capturado em {CAPTURED_AT}
        </figcaption>
      )}
    </figure>
  );
}

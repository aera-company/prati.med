"use client";

import Image from "next/image";
import { useState } from "react";
import type { Shot } from "@/content/sources";

// Capa leve com botão de play. O iframe (youtube-nocookie) só carrega
// quando a pessoa pede, sem autoplay com som e sem custo na primeira tela.
export function YouTubeLite({
  id,
  title,
  poster,
}: {
  id: string;
  title: string;
  poster: Shot;
}) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="relative aspect-video overflow-hidden rounded-xl border border-line bg-night">
      {playing ? (
        <iframe
          className="absolute inset-0 size-full"
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title={title}
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          className="group absolute inset-0 size-full"
          aria-label={`Assistir: ${title}`}
        >
          <Image
            src={poster.src}
            width={poster.width}
            height={poster.height}
            alt={poster.alt}
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="size-full object-cover"
          />
          <span className="absolute inset-0 grid place-items-center bg-night/10 transition-colors group-hover:bg-night/25">
            <span className="grid size-16 place-items-center rounded-full bg-surface/95 text-ink shadow-lg transition-transform group-hover:scale-105">
              <svg viewBox="0 0 24 24" className="ml-1 size-6" aria-hidden>
                <path d="M8 5v14l11-7z" fill="currentColor" />
              </svg>
            </span>
          </span>
        </button>
      )}
    </div>
  );
}

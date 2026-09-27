import type { ReactNode } from "react";
import { AnimatedItem } from "./AnimatedSection";

// Abertura de cena: número, título e um apoio curto.
// Uma mensagem dominante por cena (brief V6, critério 11).
export function SceneIntro({
  n,
  label,
  title,
  children,
  dark = false,
}: {
  n: number;
  label: string;
  title: ReactNode;
  children?: ReactNode;
  dark?: boolean;
}) {
  return (
    <header className="flex max-w-3xl flex-col gap-5">
      <AnimatedItem>
        <p
          className={`font-mono text-[12px] ${dark ? "text-night-2" : "text-ink-3"}`}
        >
          <span className={dark ? "text-violet" : "text-violet-ink"}>
            {String(n).padStart(2, "0")}
          </span>{" "}
          · {label}
        </p>
      </AnimatedItem>
      <AnimatedItem>
        <h2 className="headline text-[clamp(2rem,6vw,4rem)] font-semibold">
          {title}
        </h2>
      </AnimatedItem>
      {children && (
        <AnimatedItem>
          <div
            className={`lede max-w-2xl text-[17px] leading-relaxed md:text-lg ${dark ? "text-night-2" : "text-ink-2"}`}
          >
            {children}
          </div>
        </AnimatedItem>
      )}
    </header>
  );
}

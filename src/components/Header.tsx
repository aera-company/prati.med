import { CONTACT_URL } from "@/content/sources";

// Cabeçalho mínimo. mix-blend-difference mantém a leitura sobre papel,
// preto e roxo sem trocar de cor por cena.
export function Header() {
  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 text-white mix-blend-difference">
      <div className="flex h-16 items-center justify-between gap-6 px-5 md:px-10">
        <p className="pointer-events-auto text-[15px] font-semibold tracking-tight">
          Pratimed <span className="opacity-60">×</span> AERA
        </p>
        <p className="micro hidden opacity-80 md:block">Da atenção à consulta</p>
        <a
          href={CONTACT_URL}
          className="pointer-events-auto hidden rounded-full border border-white/60 px-4 py-2 text-[13px] font-medium transition-colors hover:bg-white hover:text-black md:inline-flex"
        >
          Conversar sobre o piloto
        </a>
        <p className="micro opacity-80 md:hidden">Da atenção à consulta</p>
      </div>
    </header>
  );
}

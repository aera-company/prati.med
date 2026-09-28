"use client";

import { useRef } from "react";
import { CONTACT_URL, notes, shots, anchorVideo } from "@/content/sources";

// Rodapé simples + painel "Fontes e notas": fontes, datas de captura e as
// ressalvas que não entram na narrativa principal.

export function Footer() {
  const dialog = useRef<HTMLDialogElement>(null);
  const list = Object.values(shots);

  return (
    <footer className="bg-ink px-5 pb-10 pt-6 text-white md:px-[6vw]">
      <div className="flex flex-col gap-4 border-t border-white/12 pt-6 text-[13px] md:flex-row md:items-center md:justify-between">
        <p>AERA × Pratimed · Da atenção à consulta.</p>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <a href={CONTACT_URL} className="font-medium text-violet hover:underline">Conversar sobre o piloto →</a>
          <button type="button" onClick={() => dialog.current?.showModal()} className="text-white/60 underline-offset-4 hover:text-white hover:underline">
            Fontes e notas
          </button>
          <span className="text-white/40">AERA 2026</span>
        </div>
      </div>

      <dialog
        ref={dialog}
        onClick={(e) => e.target === dialog.current && dialog.current?.close()}
        className="m-auto max-h-[85vh] w-[min(720px,92vw)] overflow-y-auto rounded-2xl bg-paper p-0 text-ink backdrop:bg-ink/60"
      >
        <div className="flex flex-col gap-6 p-6 md:p-8">
          <div className="flex items-start justify-between gap-6">
            <h2 className="display-wide text-[28px]">Fontes e notas</h2>
            <button type="button" onClick={() => dialog.current?.close()} className="micro rounded-full border border-line px-3 py-1.5">
              Fechar
            </button>
          </div>
          {[notes.distinction, notes.people, notes.data, notes.planning].map((n) => (
            <p key={n.slice(0, 20)} className="text-[14px] leading-relaxed text-ink/80">{n}</p>
          ))}
          <div>
            <p className="micro mb-3 text-mute">Materiais atuais</p>
            <ul className="flex flex-col gap-2 text-[13px]">
              <li>
                <a href={anchorVideo.url} target="_blank" rel="noreferrer" className="underline underline-offset-2">{anchorVideo.title}</a>
                <span className="text-mute"> · {anchorVideo.channel}, publicado em {anchorVideo.publishedAt}</span>
              </li>
              {list.map((s) => (
                <li key={s.src}>
                  <a href={s.source} target="_blank" rel="noreferrer" className="underline underline-offset-2">{s.context}</a>
                  <span className="text-mute"> · capturado em {s.captured}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </dialog>
    </footer>
  );
}

# Pratimed × AERA · Da atenção à consulta

Apresentação one-page para os sócios da Pratimed. A fonte de verdade é `../PRATIMED_AERA_ONEPAGE_HTML_BRIEF_V6.md`. Os materiais capturados estão documentados em `../capture/MANIFESTO.md`.

Stack: Next 16, Tailwind v4, Framer Motion e Lenis, a partir da `new-3d-landbase`, sem a hero de frame-sequence. `turbopack.root` está fixado.

## Estrutura
- `src/app/page.tsx`: as sete cenas em ordem.
- `src/components/scenes/Scene1..7`: uma cena por arquivo, com uma mensagem dominante em cada.
- `src/content/sources.ts`: registro das capturas (URL, data, contexto) e `CONTACT_URL`, ainda **pendente**.
- `src/components/ui/`:
  - `EvidenceTag`: rótulos atual / proposta / conceitual.
  - `ShotFigure`: screenshot real com fonte.
  - `ProposalSlot`: aplicação proposta em desenho.
  - `YouTubeLite`: player que só carrega o iframe no clique.

## Regras
- Screenshot real mantém a aparência original e sempre leva `ShotFigure` (rótulo e fonte).
- Proposta sempre leva o rótulo "Aplicação proposta". O painel leva "Demonstração conceitual" e mostra "—" onde não há valor.
- Não inventar números, rankings ou conversão.
- Copy visível: sem travessão como pontuação e títulos em sentence case.
- Mobile primeiro, com jornadas em sequência vertical. No mobile, usar recortes de detalhe em vez de telas inteiras reduzidas.
- Conteúdo completo mesmo com `prefers-reduced-motion`.
- Git e Vercel só com ordem do Tiago.

## Rodar
Use `npm run dev`. A porta vem da variável `PORT` (preview em `../.claude/launch.json`).

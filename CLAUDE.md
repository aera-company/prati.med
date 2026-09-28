# Pratimed × AERA · Da atenção à consulta (V2)

Apresentação one-page para os sócios da Pratimed.

- **Tese:** `../PRATIMED_AERA_ONEPAGE_HTML_BRIEF_V6.md`.
- **Direção da V2:** redesign com referência de ritmo e escala na MetaDeck.
- **Materiais capturados:** `../capture/MANIFESTO.md`.
- **V1 documental:** preservada no branch `v1-documental` e na tag `v1.0-documental`.

Stack: Next 16, Tailwind v4, GSAP ScrollTrigger (via `@gsap/react`) e Lenis. O `turbopack.root` está fixado.

## Arquitetura de movimento
- `src/app/layout.tsx`:
  - Um script no `<head>` marca `html[data-motion="on"]` quando há JS e o sistema não pede movimento reduzido.
  - A variante `anim:` (em `globals.css`) aplica o layout animado.
  - Sem ela, cada cena cai num layout estático completo.
- `src/lib/gsap.ts` (`useScene`): monta a timeline de cada cena só com movimento permitido. Desktop (≥768px) e mobile têm montagens próprias.
- `SmoothScrollProvider`: Lenis dirigido pelo ticker do GSAP.
- **Cuidado:** no Tailwind v4, `rotate-*`, `translate-*` e `scale-*` usam as propriedades CSS individuais, que o GSAP não controla. Estado inicial que o GSAP vai animar precisa estar em `[transform:...]` ou em `gsap.set`.
- Máscara de linha (`.line-mask`): o estado escondido usa yPercent ±130 ou mais, senão acentos e descendentes aparecem.

## Cenas (`src/components/scenes/`), PASS 02 "deck vivo"
| # | Arquivo | O que mostra |
| --- | --- | --- |
| 1 | `Hero` | "A Pratimed já tem atenção." Os objetos soltos se alinham e entra "…um caminho até a consulta." |
| 2 | `JaTem` | Cena icônica: "Já tem…" quatro vezes, os assets se acumulam e convergem, e fecha em "O que falta é fazer tudo trabalhar junto." |
| 3 | `Pontos` | Hoje, soltos → mesmo grid → trocam de pele para a proposta, no lugar |
| 4 | `CasoReal` | "Terapia online funciona?" em 8 estados; trilho só de progresso |
| 5 | `Identidade` | Cena roxa com palavras que vazam da tela |
| 6 | `Jornada` | Quatro palavras e um ponto que percorre a trilha |
| 7 | `Sinais` | Linhas editoriais com "—" |
| 8 | `Orquestra` | Setas dos parceiros giram para a mesma direção; "AERA" em escala |
| 9 | `Piloto` | Números e verbos |
| 10 | `Fechamento` | "A Pratimed já tem as peças." |

Escopo, papéis e cronograma do piloto ficam em `pilot` (`sources.ts`) e aparecem no painel "Fontes e notas".
Seções com texto em `mix-blend-difference` precisam de fundo próprio (`bg-paper`), porque o pin isola o blend.

## Outras peças
- `src/components/pm/`: identidade proposta para a Pratimed. Superfícies em cqw (capa, post, vídeo, destino, card, agenda) e silhuetas no lugar de fotos.
- `src/content/sources.ts`: fontes, datas de captura, ressalvas (`notes`) e `CONTACT_URL`, ainda **pendente**. Aparecem no painel "Fontes e notas" do rodapé.

## Regras
- Pouco texto por viewport. O brief é orientação interna e não vira conteúdo.
- Material atual leva o chip "Hoje" e a fonte no tooltip e nas notas. Proposta leva o chip "Proposta". Indicadores são ilustrativos.
- Copy em sentence case, sem travessão como pontuação. O "—" só aparece como valor vazio.
- Git e Vercel só com ordem do Tiago.

## Rodar
Use `npm run dev`. A porta vem da variável `PORT` (preview em `../.claude/launch.json`).

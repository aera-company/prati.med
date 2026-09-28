// Registro dos materiais atuais (públicos) usados na página.
// URL, data e contexto ficam aqui e no painel "Fontes e notas"; na narrativa
// aparecem só como chip "Hoje" e tooltip. Detalhes: ../capture/MANIFESTO.md.

// Destino oficial de contato da AERA. PENDENTE: validar antes de publicar.
export const CONTACT_URL = "#";

export type Shot = {
  src: string;
  width: number;
  height: number;
  alt: string;
  source: string;
  context: string;
  captured: string;
};

const SITE = "https://www.pratimed.com.br";
const IG = "https://www.instagram.com/prati.med/";
const PERFIL = `${SITE}/psicologo-online/profissionais/amanda-de-sa-macgado-0555323`;

const ig = (src: string, alt: string): Shot => ({
  src: `/capture/${src}.webp`,
  width: 620,
  height: 828,
  alt,
  source: IG,
  context: "Instagram @prati.med · post do feed",
  captured: "28/09/2026",
});

export const shots = {
  ytCapa: {
    src: "/capture/yt-terapia-online-capa.webp",
    width: 1280,
    height: 720,
    alt: "Capa atual do vídeo Conheça a Pratimed: psicologia, psiquiatria e nutrição online",
    source: "https://www.youtube.com/watch?v=ngJLtzdLdQY",
    context: "YouTube · capa do vídeo Terapia online funciona?",
    captured: "27/09/2026",
  },
  siteHome: {
    src: "/capture/site-home.webp",
    width: 1400,
    height: 875,
    alt: "Página inicial atual da Pratimed",
    source: `${SITE}/`,
    context: "Site · página inicial",
    captured: "27/09/2026",
  },
  cardAmanda: {
    src: "/capture/lista-card-amanda.webp",
    width: 416,
    height: 379,
    alt: "Card atual de profissional na lista da Pratimed",
    source: `${SITE}/psicologo-online/profissionais`,
    context: "Site · card na lista de psicólogos",
    captured: "27/09/2026",
  },
  perfilPreco: {
    src: "/capture/perfil-preco.webp",
    width: 354,
    height: 600,
    alt: "Bloco atual de valor do perfil, com o botão Falar agora",
    source: PERFIL,
    context: "Site · valor e próximo horário no perfil",
    captured: "27/09/2026",
  },
  agendaCalendario: {
    src: "/capture/agenda-calendario.webp",
    width: 400,
    height: 380,
    alt: "Calendário atual do agendamento da Pratimed",
    source: "https://agendamento.pratimed.com.br/widget/amanda-de-sa-macgado-0555323",
    context: "Agendamento · escolha da data",
    captured: "27/09/2026",
  },
  igProposito: ig("ig-proposito", "Post atual: Qual nosso propósito?, em caixa alta roxa e azul"),
  igEspecialidade: ig("ig-especialidade", "Reel atual com gravação de tela do site: Escolha a especialidade"),
  igCura: ig("ig-cura", "Post atual com citação em serifa sobre fundo lilás"),
  igNarrativa: ig("ig-narrativa", "Reel atual com citação em serifa sobre foto de praia"),
  igProfissional: ig("ig-profissional", "Post atual apresentando uma nova profissional"),
  igInvestimento: ig("ig-investimento", "Post atual com citação em serifa sobre fundo roxo"),
} satisfies Record<string, Shot>;

export const anchorVideo = {
  id: "ngJLtzdLdQY",
  title: "Terapia online funciona? Psicólogo, psiquiatra e nutricionista na PratiMed",
  channel: "Pratimed - Telemedicina",
  publishedAt: "26/09/2026",
  url: "https://www.youtube.com/watch?v=ngJLtzdLdQY",
};

// Notas que não entram na narrativa principal, mas ficam acessíveis.
export const notes = {
  distinction:
    "Materiais marcados como Hoje são capturas públicas da Pratimed, com aparência original. Aplicações marcadas como Proposta são demonstrações da AERA. Indicadores são ilustrativos.",
  people:
    "As aplicações usam dados de perfis públicos como exemplo, com silhuetas no lugar das fotos. Quem aparece em cada peça será definido com a Pratimed e com os profissionais. O endereço de destino é ilustrativo.",
  data:
    "Não tivemos acesso a CRM, analytics ou campanhas. Os indicadores e a forma de medir serão definidos com a Pratimed, considerando finalidade, acesso e informações de saúde. Um link identificado mostra um percurso observado, sem provar sozinho todo o efeito de um conteúdo.",
  pilot:
    "Recorte de referência, validado depois de conhecer ferramentas, contratos, dados e capacidade de execução. Sem promessa de aumento de conversão em 30 dias: com poucos dados, a leitura traz sinais e limitações.",
  planning:
    "A conversa inicial citou um planejamento de cerca de 400 vídeos em um ano, a validar com os sócios.",
};

// Escopo completo do piloto (fora da narrativa; no painel de notas).
export const pilot = {
  scope: [
    "Uma jornada e um público prioritários",
    "Três a cinco profissionais com perfis e disponibilidade confirmados pela Pratimed",
    "Duas ou três peças de conteúdo, selecionadas com o parceiro atual",
    "Um destino principal, conectado ao agendamento existente",
    "Um sistema visual e verbal aplicado às peças e telas do piloto",
    "Uma leitura dos eventos disponíveis e das adaptações necessárias",
    "Uma rotina de acompanhamento e uma reunião de decisão ao fim do ciclo",
  ],
  roles: [
    ["Sócios da Pratimed", "Prioridades, oferta, orçamento, responsáveis e decisões do projeto."],
    ["AERA", "Direção de marca, desenho da jornada, sistema visual, primeiras aplicações, critérios de qualidade e coordenação da leitura do piloto."],
    ["Parceiros de conteúdo e mídia", "Planejamento, produção, publicação e distribuição, conforme o escopo acordado."],
    ["Site, CRM e dados", "Avaliação técnica, páginas e eventos, integrações e disponibilização dos dados."],
    ["Responsáveis clínicos e jurídicos", "Validação das informações e dos procedimentos sob sua responsabilidade."],
  ] as [string, string][],
  timeline: [
    "Implantação, 4 a 6 semanas: alinhamento e acessos, desenho da jornada, sistema visual, aplicações, implementação, validação do percurso e da medição.",
    "Acompanhamento, 30 dias no ar: leitura dos sinais, registro de dificuldades, ajustes acordados e recomendação para o próximo ciclo.",
  ],
};

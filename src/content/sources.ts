// Registro dos materiais atuais usados na página.
// Toda captura tem URL, data e contexto (brief V6, seção 06).
// Detalhes completos em ../capture/MANIFESTO.md.

export const CAPTURED_AT = "27/09/2026";

// Destino oficial de contato da AERA. PENDENTE: validar antes de publicar.
export const CONTACT_URL = "#";

export type Shot = {
  src: string;
  width: number;
  height: number;
  alt: string;
  source: string; // URL de origem
  context: string; // o que o recorte mostra
};

export const shots = {
  siteHome: {
    src: "/capture/site-home.webp",
    width: 1400,
    height: 875,
    alt: "Página inicial da Pratimed: psicólogos e nutricionistas online",
    source: "https://www.pratimed.com.br/",
    context: "Site · página inicial",
  },
  listaCards: {
    src: "/capture/lista-cards.webp",
    width: 1312,
    height: 379,
    alt: "Três cards de psicólogas na lista da Pratimed, com CRP, especialidades e valor da sessão",
    source: "https://www.pratimed.com.br/psicologo-online/profissionais",
    context: "Site · lista de profissionais",
  },
  listaCardAmanda: {
    src: "/capture/lista-card-amanda.webp",
    width: 416,
    height: 379,
    alt: "Card da psicóloga Amanda de Sá Machado na lista, sessão a R$ 150",
    source: "https://www.pratimed.com.br/psicologo-online/profissionais",
    context: "Site · card de profissional",
  },
  perfilTopo: {
    src: "/capture/perfil-topo.webp",
    width: 1160,
    height: 700,
    alt: "Topo do perfil de Amanda de Sá Machado: foto, CRP, especialidade, avaliações e valor",
    source:
      "https://www.pratimed.com.br/psicologo-online/profissionais/amanda-de-sa-macgado-0555323",
    context: "Site · perfil do profissional",
  },
  perfilPreco: {
    src: "/capture/perfil-preco.webp",
    width: 354,
    height: 600,
    alt: "Bloco de valor do perfil: R$ 150, 50 minutos, próximo horário disponível e botão Falar agora",
    source:
      "https://www.pratimed.com.br/psicologo-online/profissionais/amanda-de-sa-macgado-0555323",
    context: "Site · valor e próximo horário",
  },
  agenda: {
    src: "/capture/agenda-widget.webp",
    width: 1024,
    height: 950,
    alt: "Agendamento em três passos: escolher data, horário e confirmar dados",
    source: "https://agendamento.pratimed.com.br/widget/amanda-de-sa-macgado-0555323",
    context: "Agendamento · passo 1",
  },
  instagram: {
    src: "/capture/instagram-perfil.webp",
    width: 936,
    height: 840,
    alt: "Perfil @prati.med no Instagram com bio e primeiros posts",
    source: "https://www.instagram.com/prati.med/",
    context: "Instagram · perfil",
  },
  ytCapa: {
    src: "/capture/yt-terapia-online-capa.webp",
    width: 1280,
    height: 720,
    alt: "Capa do vídeo Conheça a Pratimed: psicologia, psiquiatria e nutrição online",
    source: "https://www.youtube.com/watch?v=ngJLtzdLdQY",
    context: "YouTube · capa do vídeo",
  },
} satisfies Record<string, Shot>;

export const anchorVideo = {
  id: "ngJLtzdLdQY",
  title: "Terapia online funciona? Psicólogo, psiquiatra e nutricionista na PratiMed",
  channel: "Pratimed - Telemedicina",
  publishedAt: "26/09/2026",
  duration: "3:34",
  url: "https://www.youtube.com/watch?v=ngJLtzdLdQY",
};

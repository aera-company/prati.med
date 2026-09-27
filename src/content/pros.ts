// Perfis públicos da Pratimed usados como exemplo nas aplicações propostas.
// Dados conferidos em 27/09/2026 em pratimed.com.br/psicologo-online/profissionais.
// Quem aparece em cada peça real será definido com a Pratimed e os profissionais.

export type Pro = {
  name: string;
  crp: string;
  tone: number; // variação de tom da silhueta
  focus: string;
  tags: string[];
  price: number;
  rating?: { score: string; count: number };
  duration?: string;
  next?: string; // próximo horário exibido no perfil na data da captura
};

export const amanda: Pro = {
  name: "Amanda de Sá Machado",
  tone: 0,
  crp: "05/55323",
  focus: "Adolescentes e jovens adultos, de 13 a 30 anos",
  tags: ["TCC", "Ansiedade", "Orientação profissional"],
  price: 150,
  rating: { score: "5,0", count: 10 },
  duration: "50 min",
  next: "28/09, 13h",
};

export const raquelBiondi: Pro = {
  name: "Raquel Terezinha da Silva Biondi",
  tone: 1,
  crp: "08/42512",
  focus: "Equilíbrio emocional e relações mais saudáveis",
  tags: ["Autoconhecimento", "Relacionamentos"],
  price: 100,
  rating: { score: "5,0", count: 9 },
};

export const raquelBento: Pro = {
  name: "Raquel Bento da Silva",
  tone: 2,
  crp: "03/30147",
  focus: "TCC, psicologia hospitalar e da saúde",
  tags: ["TCC", "Psicologia da saúde"],
  price: 100,
  rating: { score: "5,0", count: 8 },
};

export const TOTAL_PSICOLOGOS = 66;

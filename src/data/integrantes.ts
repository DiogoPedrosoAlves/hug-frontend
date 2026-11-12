export interface Integrante {
  id: string;
  nome: string;
  rm: string;
  turma: string;
  funcao: string;
  bio: string;
}

// TODO: preencher com os dados reais do grupo (nome, RM, turma, função e apresentação).
export const integrantes: Integrante[] = [1, 2, 3, 4, 5].map((n) => ({
  id: `integrante-${n}`,
  nome: "A definir",
  rm: "A definir",
  turma: "1TDS",
  funcao: "A definir",
  bio: "Apresentação do integrante a ser preenchida.",
}));

export interface PerguntaFrequente {
  id: string;
  pergunta: string;
  resposta: string;
}

export const perguntasFrequentes: PerguntaFrequente[] = [
  {
    id: "o-que-e",
    pergunta: "O que é o Hug?",
    resposta:
      "O Hug reúne conteúdos educativos de psicólogos sobre sentimentos, autocuidado, respiração e meditação, um diário para registrar seu humor e um catálogo de clínicas por cidade e bairro.",
  },
  {
    id: "gratuito",
    pergunta: "O Hug é gratuito?",
    resposta:
      "Sim. O acesso básico é gratuito. O Hug+ oferece conteúdos exclusivos dos psicólogos por assinatura.",
  },
  {
    id: "diagnostico",
    pergunta: "O diário faz diagnóstico?",
    resposta:
      "Não. O histórico e o gráfico mostram apenas os seus registros, para você observar os próprios padrões. Nenhum resultado substitui a avaliação de um profissional.",
  },
  {
    id: "privacidade",
    pergunta: "Quem pode ver o que eu registro?",
    resposta:
      "Seus registros de humor são pessoais. O relato escrito é privado e só você o vê.",
  },
  {
    id: "crise",
    pergunta: "E se eu precisar de ajuda agora?",
    resposta:
      "Ligue 188 para o CVV (Centro de Valorização da Vida). O atendimento é gratuito e funciona 24 horas. Em caso de emergência, procure o serviço de saúde mais próximo ou ligue 192 (SAMU).",
  },
  {
    id: "psicologo",
    pergunta: "Como um psicólogo publica conteúdo?",
    resposta:
      "O psicólogo cria um perfil com o CRP e a biografia. Após a análise da equipe, a área do psicólogo é liberada para publicar textos e vídeos educativos.",
  },
];

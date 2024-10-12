type PromptFactory = (content: string, intention: string) => string;

export const createPrompt: PromptFactory = (content, intention) => {
  const prompt = {
    resumo: () => {
      return `
        Realize o processo de ${intention} concernente ao conteúdo: ${content}. 
        Entregue ao usuário o resultado final de forma otimizada sobre o conteúdo solicitado.
        Mantenha as principais informações e elimine o que for desnecessário, não se prive a resumos curtos. 
        Adicione um campos para o título e a descrição do conteúdo de forma espaçada, 
        informe ao usuário que o título é uma sugestão.
      `;
    },
    revisao: () => {
      return `
        Realize o processo de ${intention} concernente ao conteúdo: ${content}. 
        Entregue ao usuário o resultado final de forma otimizada sobre o conteúdo solicitado.
        Revise e exponha alternativas que visem os melhores padrões de escritas, além de corrigir
        possíveis erros gramaticais. A intenção é que o conteúdo seja revisado e entregue ao usuário
        de forma clara e objetiva fornecendo opções para melhorias.
      `;
    },
    correcao: () => {
      return `
        Realize o processo de ${intention} concernente ao conteúdo: ${content}. 
        Entregue ao usuário o texto corrigido como resultado final, além de sugestões de 
        correções para melhorias, prorize a semântica a escrita correta. Retorne também
        ao usuário uma breve lista dos erros que ele cometeu. Caso não haja erros, 
        informe ao usuário que o conteúdo está correto e não necessita de correções.
      `;
    },
  };

  return prompt[intention]();
};

import { useEffect } from "react";

// Atualiza o título da aba do navegador ao montar a página.
export function usePageTitle(titulo: string): void {
  useEffect(() => {
    document.title = `${titulo} | Hug`;
    return () => {
      document.title = "Hug | Saúde emocional";
    };
  }, [titulo]);
}

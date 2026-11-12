// Cliente HTTP central. Todas as chamadas usam caminho relativo (/hug/...):
// em desenvolvimento o Vite faz o proxy para a API; em produção o vercel.json faz o rewrite.
const PREFIXO_API = "/hug";

const CABECALHOS: HeadersInit = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

// O guia devolve erros de regra em texto puro, prontos para o usuário.
// Erros de validação do Spring (JSON padrão, sem texto de regra) caem na mensagem padrão.
function extrairMensagem(corpo: string): string {
  if (!corpo || corpo.trim().startsWith("{")) return "";
  return corpo;
}

function mensagemPadrao(status: number): string {
  if (status === 400) return "Não foi possível salvar. Verifique os dados informados.";
  if (status === 404) return "Registro não encontrado.";
  if (status >= 500) return "Erro no servidor. Tente novamente em instantes.";
  return `Erro na requisição (${status}).`;
}

const STATUS_TRANSITORIOS = [0, 502, 503, 504];
const TENTATIVAS_LEITURA = 3;

export async function requisitar<T>(caminho: string, opcoes: RequestInit = {}): Promise<T> {
  // Só repete leituras (GET): repetir POST poderia duplicar um cadastro ou uma assinatura.
  const metodo = (opcoes.method ?? "GET").toUpperCase();
  const tentativasMaximas = metodo === "GET" ? TENTATIVAS_LEITURA : 1;

  for (let tentativa = 1; ; tentativa++) {
    try {
      return await executar<T>(caminho, opcoes);
    } catch (erro) {
      const transitorio = erro instanceof ApiError && STATUS_TRANSITORIOS.includes(erro.status);
      if (!transitorio || tentativa >= tentativasMaximas) throw erro;
      await new Promise((resolve) => setTimeout(resolve, 800 * tentativa));
    }
  }
}

async function executar<T>(caminho: string, opcoes: RequestInit): Promise<T> {
  let res: Response;
  try {
    res = await fetch(`${PREFIXO_API}${caminho}`, { headers: CABECALHOS, ...opcoes });
  } catch {
    throw new ApiError("Não foi possível conectar ao servidor. Tente novamente.", 0);
  }

  if (!res.ok) {
    const corpo = await res.text();
    throw new ApiError(extrairMensagem(corpo) || mensagemPadrao(res.status), res.status);
  }

  if (res.status === 204) {
    return undefined as T;
  }

  const corpo = await res.text();
  return (corpo ? JSON.parse(corpo) : undefined) as T;
}

export function mensagemDeErro(erro: unknown): string {
  return erro instanceof Error ? erro.message : "Ocorreu um erro inesperado.";
}

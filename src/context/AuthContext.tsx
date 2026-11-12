import { createContext, useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import { buscarPerfilPsicologo, cadastrarUsuario, entrar as entrarNaApi } from "../services/hugService";
import type { NovoUsuario, PerfilPsicologo, Usuario } from "../types/hug";

interface Sessao {
  usuario: Usuario;
  psicologo: PerfilPsicologo | null;
}

export interface AuthContextValue {
  usuario: Usuario | null;
  psicologo: PerfilPsicologo | null;
  entrar: (email: string, senha: string) => Promise<void>;
  cadastrar: (dados: NovoUsuario) => Promise<void>;
  sair: () => void;
  atualizarUsuario: (usuario: Usuario) => void;
  recarregarPsicologo: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const CHAVE_STORAGE = "hug:sessao";

// Guarda só o usuário e o perfil de psicólogo. A senha nunca é guardada.
function lerSessao(): Sessao | null {
  try {
    const salvo = localStorage.getItem(CHAVE_STORAGE);
    return salvo ? (JSON.parse(salvo) as Sessao) : null;
  } catch {
    return null;
  }
}

function gravarSessao(sessao: Sessao | null): void {
  if (sessao) localStorage.setItem(CHAVE_STORAGE, JSON.stringify(sessao));
  else localStorage.removeItem(CHAVE_STORAGE);
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [sessao, setSessao] = useState<Sessao | null>(lerSessao);

  const atualizarSessao = useCallback((nova: Sessao | null) => {
    gravarSessao(nova);
    setSessao(nova);
  }, []);

  // O status do psicólogo pode mudar (aprovação pela equipe): refaz a consulta.
  const recarregarPsicologo = useCallback(async () => {
    const atual = lerSessao();
    if (!atual) return;
    const psicologo = await buscarPerfilPsicologo(atual.usuario.id);
    atualizarSessao({ usuario: atual.usuario, psicologo });
  }, [atualizarSessao]);

  // Ao abrir o app, refaz a consulta do perfil de psicólogo.
  useEffect(() => {
    if (lerSessao()) recarregarPsicologo().catch(() => undefined);
  }, [recarregarPsicologo]);

  const entrar = useCallback(
    async (email: string, senha: string) => {
      const usuario = await entrarNaApi(email, senha);
      const psicologo = await buscarPerfilPsicologo(usuario.id);
      atualizarSessao({ usuario, psicologo });
    },
    [atualizarSessao]
  );

  const cadastrar = useCallback(
    async (dados: NovoUsuario) => {
      const usuario = await cadastrarUsuario(dados);
      atualizarSessao({ usuario, psicologo: null });
    },
    [atualizarSessao]
  );

  const sair = useCallback(() => atualizarSessao(null), [atualizarSessao]);

  const atualizarUsuario = useCallback(
    (usuario: Usuario) => {
      const atual = lerSessao();
      atualizarSessao({ usuario, psicologo: atual?.psicologo ?? null });
    },
    [atualizarSessao]
  );

  const valor = useMemo(
    () => ({
      usuario: sessao?.usuario ?? null,
      psicologo: sessao?.psicologo ?? null,
      entrar,
      cadastrar,
      sair,
      atualizarUsuario,
      recarregarPsicologo,
    }),
    [sessao, entrar, cadastrar, sair, atualizarUsuario, recarregarPsicologo]
  );

  return <AuthContext.Provider value={valor}>{children}</AuthContext.Provider>;
}

import { useState } from "react";
import Layout from "../components/layout/Layout";
import ConteudoCard from "../components/conteudos/ConteudoCard";
import { EstadoCarregando, EstadoErro, EstadoVazio } from "../components/ui/Estados";
import { useApi } from "../hooks/useApi";
import { useAuth } from "../hooks/useAuth";
import { usePageTitle } from "../hooks/usePageTitle";
import { listarConteudosUsuario } from "../services/hugService";

export default function Conteudos() {
  usePageTitle("Conteúdos");
  const { usuario } = useAuth();
  const cdUsuario = usuario?.id ?? 0;
  const { estado, recarregar } = useApi(() => listarConteudosUsuario(cdUsuario), [cdUsuario]);
  const [temaFiltro, setTemaFiltro] = useState("todos");

  return (
    <Layout>
      <section className="mx-auto max-w-5xl px-4 py-12">
        <h2 className="mb-3 text-center font-sans text-3xl">Conteúdos</h2>
        <p className="mx-auto mb-8 max-w-2xl text-center font-sans text-sm text-text-footer sm:text-base">
          Materiais educativos de psicólogos sobre sentimentos, autocuidado, respiração e meditação.
        </p>

        {estado.status === "success" && estado.data.length > 0 && (
          <div className="mb-8 flex justify-center">
            <label className="flex items-center gap-3 font-sans text-sm">
              Tema
              <select
                value={temaFiltro}
                onChange={(e) => setTemaFiltro(e.target.value)}
                className="rounded-lg border border-primary bg-secondary px-3 py-2 outline-none"
              >
                <option value="todos">Todos</option>
                {Array.from(new Set(estado.data.map((c) => c.dsTema))).map((tema) => (
                  <option key={tema} value={tema}>{tema}</option>
                ))}
              </select>
            </label>
          </div>
        )}

        {estado.status === "loading" && <EstadoCarregando />}
        {estado.status === "error" && <EstadoErro mensagem={estado.message} onTentar={recarregar} />}
        {estado.status === "success" &&
          (estado.data.length === 0 ? (
            <EstadoVazio texto="Nenhum conteúdo publicado ainda." onTentar={recarregar} />
          ) : (
            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {estado.data
                .filter((c) => temaFiltro === "todos" || c.dsTema === temaFiltro)
                .map((conteudo) => (
                  <li key={conteudo.id} className="flex">
                    <ConteudoCard conteudo={conteudo} />
                  </li>
                ))}
            </ul>
          ))}
      </section>
    </Layout>
  );
}

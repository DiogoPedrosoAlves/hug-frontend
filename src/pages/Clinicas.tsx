import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/layout/Layout";
import Card from "../components/ui/Card";
import { EstadoCarregando, EstadoErro, EstadoVazio } from "../components/ui/Estados";
import { useApi } from "../hooks/useApi";
import { usePageTitle } from "../hooks/usePageTitle";
import { listarClinicas } from "../services/hugService";
import { normalizarTexto } from "../utils/datas";

export default function Clinicas() {
  usePageTitle("Clínicas");
  const { estado, recarregar } = useApi(listarClinicas, []);
  const [cidade, setCidade] = useState("");
  const [bairro, setBairro] = useState("");

  const filtradas = useMemo(() => {
    if (estado.status !== "success") return [];
    const c = normalizarTexto(cidade);
    const b = normalizarTexto(bairro);
    return estado.data.filter(
      (clinica) =>
        normalizarTexto(clinica.nmCidade).includes(c) && normalizarTexto(clinica.nmBairro).includes(b)
    );
  }, [estado, cidade, bairro]);

  const campo = "rounded-lg border border-primary bg-white/5 px-4 py-3 text-text-light outline-none placeholder:text-text-footer";

  return (
    <Layout>
      <section className="mx-auto max-w-5xl px-4 py-12 font-sans">
        <h2 className="mb-3 text-center text-3xl">Clínicas</h2>
        <p className="mx-auto mb-8 max-w-2xl text-center text-sm text-text-footer sm:text-base">
          Procure clínicas cadastradas por cidade ou bairro e entre em contato direto.
        </p>

        <div className="mx-auto mb-10 grid max-w-2xl gap-3 sm:grid-cols-2">
          <input className={campo} placeholder="Cidade" aria-label="Filtrar por cidade" value={cidade} onChange={(e) => setCidade(e.target.value)} />
          <input className={campo} placeholder="Bairro" aria-label="Filtrar por bairro" value={bairro} onChange={(e) => setBairro(e.target.value)} />
        </div>

        {estado.status === "loading" && <EstadoCarregando />}
        {estado.status === "error" && <EstadoErro mensagem={estado.message} onTentar={recarregar} />}
        {estado.status === "success" &&
          (filtradas.length === 0 ? (
            <EstadoVazio texto="Nenhuma clínica encontrada para esta busca." />
          ) : (
            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtradas.map((clinica) => (
                <li key={clinica.id} className="flex">
                  <Link to={`/clinicas/${clinica.id}`} className="flex w-full rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-acento">
                    <Card className="flex w-full flex-col items-start gap-2 text-left text-secondary transition-transform hover:-translate-y-1">
                      <h3 className="font-sans text-lg font-semibold">{clinica.nmClinica}</h3>
                      <p className="font-sans text-sm text-slate-500">{clinica.nmBairro} · {clinica.nmCidade}/{clinica.sgUf}</p>
                    </Card>
                  </Link>
                </li>
              ))}
            </ul>
          ))}
      </section>
    </Layout>
  );
}

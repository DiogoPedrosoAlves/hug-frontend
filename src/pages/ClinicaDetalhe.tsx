import { Link, useParams } from "react-router-dom";
import Layout from "../components/layout/Layout";
import Card from "../components/ui/Card";
import { EstadoCarregando, EstadoErro } from "../components/ui/Estados";
import { useApi } from "../hooks/useApi";
import { usePageTitle } from "../hooks/usePageTitle";
import { buscarClinica } from "../services/hugService";

export default function ClinicaDetalhe() {
  const { id } = useParams<{ id: string }>();
  const numeroId = Number(id);
  const { estado, recarregar } = useApi(() => buscarClinica(numeroId), [numeroId]);
  usePageTitle(estado.status === "success" ? estado.data.nmClinica : "Clínica");

  return (
    <Layout>
      <section className="mx-auto max-w-md px-4 py-12 font-sans">
        {estado.status === "loading" && <EstadoCarregando />}
        {estado.status === "error" && <EstadoErro mensagem={estado.message} onTentar={recarregar} />}
        {estado.status === "success" && (
          <Card className="flex flex-col gap-3 text-left text-secondary">
            <h2 className="text-2xl font-semibold">{estado.data.nmClinica}</h2>
            <p className="text-sm">{estado.data.dsEndereco}</p>
            <p className="text-sm">{estado.data.nmBairro} · {estado.data.nmCidade}/{estado.data.sgUf}</p>
            {estado.data.dsTelefone && (
              <a href={`tel:${estado.data.dsTelefone.replace(/\D/g, "")}`} className="text-sm font-medium text-teal-700 underline">
                Ligar: {estado.data.dsTelefone}
              </a>
            )}
            {estado.data.dsSite && (
              <a href={estado.data.dsSite} target="_blank" rel="noreferrer" className="text-sm font-medium text-teal-700 underline">
                Acessar o site
              </a>
            )}
          </Card>
        )}
        <Link to="/clinicas" className="mt-8 block text-center text-sm text-acento">Voltar para clínicas</Link>
      </section>
    </Layout>
  );
}

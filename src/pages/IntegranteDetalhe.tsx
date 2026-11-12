import { Link, useParams } from "react-router-dom";
import Layout from "../components/layout/Layout";
import Card from "../components/ui/Card";
import { integrantes } from "../data/integrantes";
import { usePageTitle } from "../hooks/usePageTitle";

export default function IntegranteDetalhe() {
  const { id } = useParams<{ id: string }>();
  const integrante = integrantes.find((i) => i.id === id);
  usePageTitle(integrante ? integrante.nome : "Integrante");

  return (
    <Layout>
      <section className="mx-auto max-w-md px-4 py-12">
        {integrante ? (
          <Card className="flex flex-col items-center gap-3 text-secondary">
            <h2 className="font-sans text-2xl font-semibold">{integrante.nome}</h2>
            <p className="font-sans text-sm text-slate-500">RM {integrante.rm} · {integrante.turma}</p>
            <p className="font-sans text-sm text-slate-500">{integrante.funcao}</p>
            <p className="font-sans text-sm">{integrante.bio}</p>
          </Card>
        ) : (
          <p className="text-center font-sans text-text-footer">Integrante não encontrado.</p>
        )}
        <Link to="/integrantes" className="mt-8 block text-center font-sans text-sm text-acento">
          Voltar para integrantes
        </Link>
      </section>
    </Layout>
  );
}

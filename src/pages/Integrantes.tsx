import { Link } from "react-router-dom";
import Layout from "../components/layout/Layout";
import Card from "../components/ui/Card";
import { integrantes } from "../data/integrantes";
import { usePageTitle } from "../hooks/usePageTitle";

export default function Integrantes() {
  usePageTitle("Integrantes");

  return (
    <Layout>
      <section className="mx-auto max-w-5xl px-4 py-12">
        <h2 className="mb-10 text-center font-sans text-3xl">Integrantes</h2>
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {integrantes.map((integrante) => (
            <li key={integrante.id} className="flex">
              <Link to={`/integrantes/${integrante.id}`} className="flex w-full rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-acento">
                <Card className="flex w-full flex-col items-center gap-2 text-secondary transition-transform hover:-translate-y-1">
                  <h3 className="font-sans text-lg font-semibold">{integrante.nome}</h3>
                  <p className="font-sans text-sm text-slate-500">RM {integrante.rm} · {integrante.turma}</p>
                  <p className="font-sans text-sm text-slate-500">{integrante.funcao}</p>
                </Card>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}

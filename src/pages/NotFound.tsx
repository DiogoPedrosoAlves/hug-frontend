import { Link } from "react-router-dom";
import Layout from "../components/layout/Layout";
import { usePageTitle } from "../hooks/usePageTitle";

export default function NotFound() {
  usePageTitle("Página não encontrada");
  return (
    <Layout>
      <section className="mx-auto flex max-w-md flex-col items-center gap-4 px-4 py-24 text-center font-sans">
        <h2 className="text-3xl">Página não encontrada</h2>
        <p className="text-text-footer">O endereço que você acessou não existe.</p>
        <Link to="/" className="text-acento">Voltar para o início</Link>
      </section>
    </Layout>
  );
}

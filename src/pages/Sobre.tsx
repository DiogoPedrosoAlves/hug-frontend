import Layout from "../components/layout/Layout";
import { usePageTitle } from "../hooks/usePageTitle";

const ods = [
  { numero: 3, nome: "Saúde e bem-estar" },
  { numero: 4, nome: "Educação de qualidade" },
  { numero: 10, nome: "Redução das desigualdades" },
];

export default function Sobre() {
  usePageTitle("Sobre");

  return (
    <Layout>
      <section className="mx-auto max-w-3xl px-4 py-12 font-sans">
        <h2 className="mb-6 text-center text-3xl">Sobre o Hug</h2>
        <div className="flex flex-col gap-4 text-base leading-relaxed text-text-light">
          <p>
            O Hug é um site de saúde mental que reúne, em um só lugar, conteúdos de psicólogos, o acompanhamento pessoal do humor e a descoberta de clínicas.
          </p>
          <p>
            A proposta é ampliar o acesso ao conhecimento sobre saúde emocional, principalmente para pessoas que encontram barreiras para buscar apoio profissional. Psicólogos publicam textos e vídeos educativos e cadastram suas clínicas no catálogo.
          </p>
          <p>
            Para a Global Solution, o Hug se posiciona como uma CitizenTech: uma tecnologia que facilita o acesso à informação e aproxima o cidadão de profissionais e serviços de saúde mental. Ele apoia o autocuidado e a busca por atendimento, complementando o acompanhamento profissional.
          </p>
        </div>

        <h3 className="mb-4 mt-12 text-xl">ODS da ONU ligados ao projeto</h3>
        <ul className="grid gap-4 sm:grid-cols-3">
          {ods.map((item) => (
            <li key={item.numero} className="rounded-xl border border-primary p-4">
              <p className="text-sm text-acento">ODS {item.numero}</p>
              <p className="mt-1 text-sm">{item.nome}</p>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}

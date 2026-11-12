import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/layout/Layout";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Feedback from "../components/ui/Feedback";
import { EstadoCarregando, EstadoErro } from "../components/ui/Estados";
import { useApi } from "../hooks/useApi";
import { useAuth } from "../hooks/useAuth";
import { usePageTitle } from "../hooks/usePageTitle";
import { mensagemDeErro } from "../services/apiClient";
import { criarAssinatura, listarAssinaturasUsuario, listarPlanos } from "../services/hugService";
import { dataLocalISO, formatarData, formatarReal, somarDias, temHugPlusAgora } from "../utils/datas";

// Duração padrão da assinatura. Confirmar a regra de negócio com a equipe.
const DIAS_ASSINATURA = 30;

export default function HugPlus() {
  usePageTitle("Hug+");
  const navigate = useNavigate();
  const { usuario } = useAuth();
  const cdUsuario = usuario?.id ?? null;
  const [feedback, setFeedback] = useState<{ tipo: "sucesso" | "erro"; texto: string } | null>(null);
  const [processando, setProcessando] = useState<number | null>(null);

  const { estado, recarregar } = useApi(
    async () => {
      const planos = await listarPlanos();
      const assinaturas = cdUsuario ? await listarAssinaturasUsuario(cdUsuario) : [];
      return { planos, assinaturas };
    },
    [cdUsuario]
  );

  async function handleAssinar(cdPlano: number) {
    if (!usuario) {
      navigate("/login", { state: { from: "/hug-plus", mensagem: "Entre para assinar o Hug+." } });
      return;
    }
    setProcessando(cdPlano);
    setFeedback(null);
    try {
      const hoje = dataLocalISO();
      await criarAssinatura(usuario.id, cdPlano, hoje, somarDias(hoje, DIAS_ASSINATURA));
      setFeedback({ tipo: "sucesso", texto: "Assinatura criada. Seus conteúdos exclusivos já estão liberados." });
      recarregar();
    } catch (erro) {
      setFeedback({ tipo: "erro", texto: mensagemDeErro(erro) });
    } finally {
      setProcessando(null);
    }
  }

  return (
    <Layout>
      <section className="mx-auto max-w-5xl px-4 py-12 font-sans">
        <h2 className="mb-3 text-center text-3xl">Hug+</h2>
        <p className="mx-auto mb-10 max-w-2xl text-center text-sm text-text-footer sm:text-base">
          Conteúdos exclusivos dos psicólogos, com assinatura de valor acessível. O acesso básico continua gratuito.
        </p>

        {estado.status === "loading" && <EstadoCarregando />}
        {estado.status === "error" && <EstadoErro mensagem={estado.message} onTentar={recarregar} />}

        {estado.status === "success" && (
          <>
            {usuario && temHugPlusAgora(estado.data.assinaturas, estado.data.planos) && (
              <p className="mb-8 text-center text-green-400">Você tem o Hug+ ativo.</p>
            )}
            {usuario && estado.data.assinaturas.length > 0 && (
              <p className="mb-8 text-center text-sm text-text-footer">
                Última assinatura: de {formatarData(estado.data.assinaturas[estado.data.assinaturas.length - 1].dtInicio)} até{" "}
                {formatarData(estado.data.assinaturas[estado.data.assinaturas.length - 1].dtFim)}.
              </p>
            )}

            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {estado.data.planos.map((plano) => (
                <li key={plano.id} className="flex">
                  <Card className="flex w-full flex-col items-center gap-3 text-secondary">
                    <h3 className="font-sans text-lg font-semibold">{plano.nmPlano}</h3>
                    <p className="font-sans text-2xl font-bold">
                      {formatarReal(plano.vlMensal)}
                      <span className="text-sm font-normal text-slate-500"> / mês</span>
                    </p>
                    <p className="text-sm text-slate-500">
                      {plano.flExclusivo === "S" ? "Inclui conteúdos exclusivos" : "Plano sem conteúdo exclusivo"}
                    </p>
                    {plano.flExclusivo === "S" && (
                      <Button onClick={() => handleAssinar(plano.id)} disabled={processando === plano.id} className="mt-2">
                        {processando === plano.id ? "Assinando..." : "Assinar"}
                      </Button>
                    )}
                  </Card>
                </li>
              ))}
            </ul>
            {feedback && <div className="mt-8 flex justify-center"><Feedback tipo={feedback.tipo} texto={feedback.texto} /></div>}
          </>
        )}
      </section>
    </Layout>
  );
}

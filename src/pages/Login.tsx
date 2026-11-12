import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Layout from "../components/layout/Layout";
import Button from "../components/ui/Button";
import Feedback from "../components/ui/Feedback";
import { useAuth } from "../hooks/useAuth";
import { usePageTitle } from "../hooks/usePageTitle";
import { mensagemDeErro } from "../services/apiClient";

interface Dados {
  email: string;
  senha: string;
}

export default function Login() {
  usePageTitle("Entrar");
  const navigate = useNavigate();
  const location = useLocation();
  const { entrar } = useAuth();
  const estadoRota = location.state as { from?: string; mensagem?: string } | null;
  const [erro, setErro] = useState("");
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<Dados>();

  async function enviar(dados: Dados) {
    setErro("");
    try {
      await entrar(dados.email.trim(), dados.senha);
      navigate(estadoRota?.from ?? "/", { replace: true });
    } catch (err) {
      setErro(mensagemDeErro(err));
    }
  }

  const campo = "rounded-lg border bg-white/5 px-4 py-3 text-text-light outline-none placeholder:text-text-footer";

  return (
    <Layout>
      <section className="mx-auto max-w-md px-4 py-12 font-sans">
        <h2 className="mb-6 text-center text-3xl">Entrar</h2>
        {estadoRota?.mensagem && <p className="mb-6 text-center text-sm text-acento">{estadoRota.mensagem}</p>}
        <form onSubmit={handleSubmit(enviar)} noValidate className="flex flex-col gap-4">
          <label className="flex flex-col gap-1 text-sm">
            E-mail*
            <input type="email" className={`${campo} ${errors.email ? "border-red-500" : "border-primary"}`}
              {...register("email", { required: "Informe seu e-mail.", pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Informe um e-mail válido." } })} />
            {errors.email && <span className="text-xs text-red-400">{errors.email.message}</span>}
          </label>
          <label className="flex flex-col gap-1 text-sm">
            Senha*
            <input type="password" className={`${campo} ${errors.senha ? "border-red-500" : "border-primary"}`}
              {...register("senha", { required: "Informe sua senha." })} />
            {errors.senha && <span className="text-xs text-red-400">{errors.senha.message}</span>}
          </label>
          <Button type="submit" disabled={isSubmitting}>{isSubmitting ? "Entrando..." : "Entrar"}</Button>
          {erro && <Feedback tipo="erro" texto={erro} />}
        </form>
        <p className="mt-6 text-center text-sm text-text-footer">
          Ainda não tem conta? <Link to="/cadastro" className="text-acento">Criar conta</Link>
        </p>
      </section>
    </Layout>
  );
}

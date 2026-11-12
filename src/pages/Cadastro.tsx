import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../components/layout/Layout";
import Button from "../components/ui/Button";
import Feedback from "../components/ui/Feedback";
import { useAuth } from "../hooks/useAuth";
import { usePageTitle } from "../hooks/usePageTitle";
import { mensagemDeErro } from "../services/apiClient";

interface Dados {
  nome: string;
  email: string;
  senha: string;
  confirmarSenha: string;
}

export default function Cadastro() {
  usePageTitle("Criar conta");
  const navigate = useNavigate();
  const { cadastrar } = useAuth();
  const [erro, setErro] = useState("");
  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm<Dados>();
  const senha = watch("senha");

  async function enviar(dados: Dados) {
    setErro("");
    try {
      await cadastrar({ nmUsuario: dados.nome.trim(), dsEmail: dados.email.trim(), dsSenhaHash: dados.senha });
      navigate("/", { replace: true });
    } catch (err) {
      setErro(mensagemDeErro(err));
    }
  }

  const campo = "rounded-lg border bg-white/5 px-4 py-3 text-text-light outline-none placeholder:text-text-footer";

  return (
    <Layout>
      <section className="mx-auto max-w-md px-4 py-12 font-sans">
        <h2 className="mb-6 text-center text-3xl">Criar conta</h2>
        <form onSubmit={handleSubmit(enviar)} noValidate className="flex flex-col gap-4">
          <label className="flex flex-col gap-1 text-sm">
            Nome*
            <input maxLength={120} className={`${campo} ${errors.nome ? "border-red-500" : "border-primary"}`}
              {...register("nome", { required: "Informe seu nome.", minLength: { value: 2, message: "Nome muito curto." } })} />
            {errors.nome && <span className="text-xs text-red-400">{errors.nome.message}</span>}
          </label>
          <label className="flex flex-col gap-1 text-sm">
            E-mail*
            <input type="email" maxLength={254} className={`${campo} ${errors.email ? "border-red-500" : "border-primary"}`}
              {...register("email", { required: "Informe seu e-mail.", pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Informe um e-mail válido." } })} />
            {errors.email && <span className="text-xs text-red-400">{errors.email.message}</span>}
          </label>
          <label className="flex flex-col gap-1 text-sm">
            Senha*
            <input type="password" maxLength={255} className={`${campo} ${errors.senha ? "border-red-500" : "border-primary"}`}
              {...register("senha", { required: "Crie uma senha." })} />
            {errors.senha && <span className="text-xs text-red-400">{errors.senha.message}</span>}
          </label>
          <label className="flex flex-col gap-1 text-sm">
            Confirmar senha*
            <input type="password" maxLength={255} className={`${campo} ${errors.confirmarSenha ? "border-red-500" : "border-primary"}`}
              {...register("confirmarSenha", { required: "Confirme a senha.", validate: (v) => v === senha || "As senhas não coincidem." })} />
            {errors.confirmarSenha && <span className="text-xs text-red-400">{errors.confirmarSenha.message}</span>}
          </label>
          <Button type="submit" disabled={isSubmitting}>{isSubmitting ? "Criando conta..." : "Criar conta"}</Button>
          {erro && <Feedback tipo="erro" texto={erro} />}
        </form>
        <p className="mt-6 text-center text-sm text-text-footer">
          Já tem conta? <Link to="/login" className="text-acento">Entrar</Link>
        </p>
      </section>
    </Layout>
  );
}

import { useForm } from "react-hook-form";
import Layout from "../components/layout/Layout";
import Button from "../components/ui/Button";
import { EMAIL_CONTATO } from "../data/contato";
import { usePageTitle } from "../hooks/usePageTitle";

interface Dados {
  nome: string;
  email: string;
  assunto: string;
  mensagem: string;
}

// O guia da API não tem rota de contato: o formulário abre o e-mail do usuário já preenchido.
export default function Contato() {
  usePageTitle("Contato");
  const { register, handleSubmit, formState: { errors } } = useForm<Dados>();

  function enviar(dados: Dados) {
    const assunto = encodeURIComponent(dados.assunto || "Contato pelo site Hug");
    const corpo = encodeURIComponent(`Nome: ${dados.nome}\nE-mail: ${dados.email}\n\n${dados.mensagem}`);
    window.location.href = `mailto:${EMAIL_CONTATO}?subject=${assunto}&body=${corpo}`;
  }

  const campo = "rounded-lg border bg-white/5 px-4 py-3 text-text-light outline-none placeholder:text-text-footer";

  return (
    <Layout>
      <section className="mx-auto max-w-md px-4 py-12 font-sans">
        <h2 className="mb-4 text-center text-3xl">Contato</h2>
        <p className="mb-8 text-center text-sm text-text-footer">
          Dúvidas sobre o site? Escreva para nós. Para apoio emocional imediato, ligue 188 (CVV).
        </p>
        <form onSubmit={handleSubmit(enviar)} noValidate className="flex flex-col gap-4">
          <label className="flex flex-col gap-1 text-sm">
            Nome*
            <input className={`${campo} ${errors.nome ? "border-red-500" : "border-primary"}`}
              {...register("nome", { required: "Informe seu nome.", minLength: { value: 2, message: "Nome muito curto." } })} />
            {errors.nome && <span className="text-xs text-red-400">{errors.nome.message}</span>}
          </label>
          <label className="flex flex-col gap-1 text-sm">
            E-mail*
            <input type="email" className={`${campo} ${errors.email ? "border-red-500" : "border-primary"}`}
              {...register("email", {
                required: "Informe seu e-mail.",
                pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Informe um e-mail válido." },
              })} />
            {errors.email && <span className="text-xs text-red-400">{errors.email.message}</span>}
          </label>
          <label className="flex flex-col gap-1 text-sm">
            Assunto
            <input className={`${campo} border-primary`} {...register("assunto")} />
          </label>
          <label className="flex flex-col gap-1 text-sm">
            Mensagem*
            <textarea rows={4} className={`${campo} ${errors.mensagem ? "border-red-500" : "border-primary"}`}
              {...register("mensagem", { required: "Escreva sua mensagem.", minLength: { value: 10, message: "Mensagem muito curta." } })} />
            {errors.mensagem && <span className="text-xs text-red-400">{errors.mensagem.message}</span>}
          </label>
          <Button type="submit">Abrir e-mail</Button>
        </form>
      </section>
    </Layout>
  );
}

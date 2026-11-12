import { useState } from "react";
import { useForm } from "react-hook-form";
import { cadastrarPsicologo } from "../../services/hugService";
import { mensagemDeErro } from "../../services/apiClient";
import Button from "../ui/Button";
import Feedback from "../ui/Feedback";

interface Dados {
  dsCrp: string;
  dsBiografia: string;
}

export default function CadastroPsicologo({
  cdUsuario,
  onCriado,
}: {
  cdUsuario: number;
  onCriado: () => Promise<void>;
}) {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<Dados>();
  const [erro, setErro] = useState("");

  async function enviar(dados: Dados) {
    setErro("");
    try {
      await cadastrarPsicologo({
        cdUsuario,
        dsCrp: dados.dsCrp.trim(),
        dsBiografia: dados.dsBiografia.trim() || null,
      });
      await onCriado();
    } catch (err) {
      setErro(mensagemDeErro(err));
    }
  }

  return (
    <form onSubmit={handleSubmit(enviar)} noValidate className="mx-auto flex w-full max-w-md flex-col gap-4">
      <p className="font-sans text-sm text-text-footer">
        Cadastre seu CRP para pedir acesso à área do psicólogo. A equipe analisa o cadastro antes de liberar a publicação.
      </p>
      <label className="flex flex-col gap-1 font-sans text-sm">
        CRP*
        <input
          type="text"
          maxLength={20}
          placeholder="Ex.: 06/123456"
          className={`rounded-lg border bg-white/5 px-4 py-3 outline-none ${errors.dsCrp ? "border-red-500" : "border-primary"}`}
          {...register("dsCrp", { required: "Informe o CRP.", maxLength: { value: 20, message: "CRP muito longo." } })}
        />
        {errors.dsCrp && <span className="text-xs text-red-400">{errors.dsCrp.message}</span>}
      </label>
      <label className="flex flex-col gap-1 font-sans text-sm">
        Biografia (opcional)
        <textarea
          rows={4}
          maxLength={1000}
          className="rounded-lg border border-primary bg-white/5 px-4 py-3 outline-none"
          {...register("dsBiografia")}
        />
      </label>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Enviando..." : "Enviar cadastro"}
      </Button>
      {erro && <Feedback tipo="erro" texto={erro} />}
    </form>
  );
}

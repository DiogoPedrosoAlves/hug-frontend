// Mensagem de resultado de uma operação (sucesso ou erro), anunciada por leitores de tela.
interface FeedbackProps {
  tipo: "sucesso" | "erro";
  texto: string;
}

export default function Feedback({ tipo, texto }: FeedbackProps) {
  return (
    <p
      role={tipo === "erro" ? "alert" : "status"}
      className={`font-sans text-sm ${tipo === "sucesso" ? "text-green-400" : "text-red-400"}`}
    >
      {texto}
    </p>
  );
}

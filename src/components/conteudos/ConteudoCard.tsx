import { Link } from "react-router-dom";
import type { Conteudo } from "../../types/hug";
import { formatarData } from "../../utils/datas";
import Card from "../ui/Card";

export default function ConteudoCard({ conteudo }: { conteudo: Conteudo }) {
  return (
    <Link to={`/conteudos/${conteudo.id}`} className="flex w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-acento rounded-2xl">
      <Card className="flex w-full flex-col items-start gap-3 text-left text-secondary transition-transform hover:-translate-y-1">
        <div className="flex w-full flex-wrap items-center gap-2">
          <span className="rounded-full bg-slate-100 px-3 py-1 font-sans text-xs text-slate-600">{conteudo.dsTema}</span>
          <span className="rounded-full bg-slate-100 px-3 py-1 font-sans text-xs text-slate-600">
            {conteudo.dsTipo === "VIDEO" ? "Vídeo" : "Texto"}
          </span>
          {conteudo.flExclusivo === "S" && (
            <span className="rounded-full bg-acento/20 px-3 py-1 font-sans text-xs font-semibold text-teal-700">Hug+</span>
          )}
        </div>
        <h3 className="font-sans text-lg font-semibold">{conteudo.nmTitulo}</h3>
        <p className="font-sans text-xs text-slate-500">Publicado em {formatarData(conteudo.dtPublicacao)}</p>
      </Card>
    </Link>
  );
}

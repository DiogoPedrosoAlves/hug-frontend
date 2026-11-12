import type { NrHumor, RegistroHumor } from "../../types/hug";
import { dataLocalISO, formatarData, HUMOR, somarDias } from "../../utils/datas";

// Gráfico simples dos últimos 14 dias: uma barra por dia, altura pelo humor registrado.
export default function GraficoHumor({ registros }: { registros: RegistroHumor[] }) {
  const hoje = dataLocalISO();
  const porDia = new Map<string, NrHumor>(registros.map((r) => [r.dtRegistro, r.nrHumor]));
  const dias = Array.from({ length: 14 }, (_, i) => somarDias(hoje, i - 13));

  return (
    <div className="flex h-44 items-end gap-1 sm:gap-2" role="img" aria-label="Humor dos últimos 14 dias">
      {dias.map((dia) => {
        const nr = porDia.get(dia);
        const titulo = nr ? `${formatarData(dia)}: ${HUMOR[nr].rotulo}` : `${formatarData(dia)}: sem registro`;
        return (
          <div key={dia} className="flex h-full flex-1 flex-col items-center gap-1">
            <div className="flex w-full flex-1 items-end">
              <div
                title={titulo}
                className={`w-full rounded-t ${nr ? "bg-acento" : "bg-white/10"}`}
                style={{ height: nr ? `${nr * 20}%` : "4%" }}
              />
            </div>
            <span className="text-[10px] text-text-footer">{dia.slice(8)}</span>
          </div>
        );
      })}
    </div>
  );
}

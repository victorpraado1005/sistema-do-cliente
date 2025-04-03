import {
  CalendarDays,
  CirclePercent,
  CirclePlay,
  History,
  MapPin,
  Smartphone,
} from "lucide-react";
import { useSimulador } from "../context/SimuladorContext";

export default function CardBonificacao() {
  const { resultados, valores, selectedPontosBonificados } = useSimulador();

  return (
    <div className="w-[270px] border border-rzk_ligth rounded-2xl">
      <h2 className="mt-2 mb-2 text-center text-lg font-extrabold text-rzk_darker">
        Bonificação:
      </h2>
      <div className="w-36 flex flex-col space-y-1 m-auto text-rzk_regular">
        <div className="flex items-center justify-between w-36">
          <CalendarDays className="size-6" />
          <div className="flex flex-col">
            <span className="text-lg font-ligth w-full text-right">
              Período (dias)
            </span>
            <span className="font-extrabold text-lg text-rzk_green text-right">
              {valores.dias_bonificados}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between w-36">
          <MapPin className="size-6" />
          <div className="flex flex-col">
            <span className="text-lg font-ligth w-full text-right">Pontos</span>
            <span className="font-extrabold text-lg text-rzk_green text-right">
              {selectedPontosBonificados.length}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between w-36">
          <Smartphone className="size-6" />
          <div className="flex flex-col">
            <span className="text-lg font-ligth w-full text-right">Faces</span>
            <span className="font-extrabold text-lg text-rzk_green text-right">
              {resultados.faces_totais_bonificadas}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between w-36">
          <CirclePlay className="size-6" />
          <div className="flex flex-col">
            <span className="text-lg font-ligth w-full text-right">
              Inserções
            </span>
            <span className="font-extrabold text-lg text-rzk_green text-right">
              {resultados.insercoes_bonificadas?.toLocaleString("pt-br", {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              })}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between w-36">
          <History className="size-6" />
          <div className="flex flex-col">
            <span className="text-lg font-ligth w-full text-right">
              Saturação
            </span>
            <span className="font-extrabold text-lg text-rzk_green text-right">
              {valores.saturacao_bonificada}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between w-36">
          <CirclePercent className="size-6" />
          <div className="flex flex-col">
            <span className="text-lg font-ligth w-full text-right">
              Desconto
            </span>
            <span className="font-extrabold text-lg text-rzk_green text-right">
              100%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

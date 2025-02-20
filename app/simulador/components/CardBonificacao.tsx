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
  const { resultados, valores } = useSimulador();

  return (
    <div className="w-[270px] border border-rzk_ligth rounded-2xl">
      <h2 className="mt-2 mb-2 text-center text-lg font-extrabold text-rzk_darker">
        Bonificação:
      </h2>
      <div className="w-32 flex flex-col space-y-2 m-auto text-rzk_regular">
        <div className="flex flex-col">
          <div className="flex gap-2 items-center">
            <CalendarDays className="size-5" />
            <span className="text-base font-semibold">Período (dias)</span>
          </div>
          <span className="font-extrabold text-rzk_green text-center">
            {valores.dias_bonificados}
          </span>
        </div>

        <div className="flex flex-col">
          <div className="flex gap-2 items-center">
            <MapPin className="size-5" />
            <span className="text-base font-semibold">Pontos</span>
          </div>
          <span className="font-extrabold text-rzk_green text-center">
            {valores.pontos_bonificados.length}
          </span>
        </div>

        <div className="flex flex-col">
          <div className="flex gap-2 items-center">
            <Smartphone className="size-5" />
            <span className="text-base font-semibold">Faces</span>
          </div>
          <span className="font-extrabold text-rzk_green text-center">
            {resultados.faces_totais_bonificadas}
          </span>
        </div>

        <div className="flex flex-col">
          <div className="flex gap-2 items-center">
            <CirclePlay className="size-5" />
            <span className="text-base font-semibold">Inserções</span>
          </div>
          <span className="font-extrabold text-rzk_green text-center">
            {resultados.investimento}
          </span>
        </div>

        <div className="flex flex-col">
          <div className="flex gap-2 items-center">
            <History className="size-5" />
            <span className="text-base font-semibold">Saturação</span>
          </div>
          <span className="font-extrabold text-rzk_green text-center">
            {valores.saturacao_bonificada}
          </span>
        </div>

        <div className="flex flex-col">
          <div className="flex gap-2 items-center">
            <CirclePercent className="size-5" />
            <span className="text-base font-semibold">Desconto</span>
          </div>
          <span className="font-extrabold text-rzk_green text-center">
            100%
          </span>
        </div>
      </div>
    </div>
  );
}

import {
  BadgeDollarSign, ChartLine, CircleDollarSign, CirclePercent,
  CirclePlay, DollarSign, Map, Smartphone,
  SquareUser, Target, UserRoundCheck, UsersRound, View
} from "lucide-react";
import { useSimulador } from "../context/SimuladorContext";

export default function CardNumerosCampanhaPagaEBonificada() {
  const { resultados } = useSimulador();

  return (
    <div className="w-[700px] border border-rzk_ligth rounded-2xl flex flex-col py-4 px-6 justify-evenly">
      <div className="grid grid-cols-3 gap-5 text-rzk_regular items-start justify-items-center">
        <div className="space-y-4">
          <div className="flex flex-col">
            <div className="flex gap-2 items-center">
              <Smartphone className="size-5" />
              <span className="text-lg font-semibold">Faces Totais</span>
            </div>
            <span className="font-extrabold text-lg text-rzk_green text-center">{resultados.investimento}</span>
          </div>

          <div className="flex flex-col">
            <div className="flex gap-2 items-center">
              <Map className="size-5" />
              <span className="text-lg font-semibold">Praças</span>
            </div>
            <span className="font-extrabold text-lg text-rzk_green text-center">{resultados.investimento}</span>
          </div>

          <div className="flex flex-col">
            <div className="flex gap-2 items-center">
              <CirclePlay className="size-5" />
              <span className="text-lg font-semibold">Inserções</span>
            </div>
            <span className="font-extrabold text-lg text-rzk_green text-center">{resultados.investimento}</span>
          </div>

          <div className="flex flex-col">
            <div className="flex gap-2 items-center">
              <Target className="size-5" />
              <span className="text-lg font-semibold">Impactos</span>
            </div>
            <span className="font-extrabold text-lg text-rzk_green text-center">{resultados.investimento}</span>
          </div>

          <div className="flex flex-col">
            <div className="flex gap-2 items-center">
              <SquareUser className="size-5" />
              <span className="text-lg font-semibold">Freq. Média</span>
            </div>
            <span className="font-extrabold text-lg text-rzk_green text-center">{resultados.investimento}</span>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex flex-col">
            <div className="flex gap-2 items-center">
              <UserRoundCheck className="size-5" />
              <span className="text-lg font-semibold">Usuários únicos</span>
            </div>
            <span className="font-extrabold text-lg text-rzk_green text-center">{resultados.investimento}</span>
          </div>

          <div className="flex flex-col">
            <div className="flex gap-2 items-center">
              <UsersRound className="size-5" />
              <span className="text-lg font-semibold">Alcance</span>
            </div>
            <span className="font-extrabold text-lg text-rzk_green text-center">{resultados.investimento}</span>
          </div>

          <div className="flex flex-col">
            <div className="flex gap-2 items-center">
              <View className="size-5" />
              <span className="text-lg font-semibold">Visitas</span>
            </div>
            <span className="font-extrabold text-lg text-rzk_green text-center">{resultados.investimento}</span>
          </div>

          <div className="flex flex-col">
            <div className="flex gap-2 items-center">
              <ChartLine className="size-5" />
              <span className="text-lg font-semibold">TRP</span>
            </div>
            <span className="font-extrabold text-lg text-rzk_green text-center">{resultados.investimento}</span>
          </div>

          <div className="flex flex-col">
            <div className="flex gap-2 items-center">
              <SquareUser className="size-5" />
              <span className="text-lg font-semibold">Pop. 12+ (IBGE)</span>
            </div>
            <span className="font-extrabold text-lg text-rzk_green text-center">{resultados.investimento}</span>
          </div>
        </div>

        <div className="space-y-8">
          <div className="flex flex-col">
            <div className="flex gap-2 items-center">
              <CircleDollarSign className="size-5" />
              <span className="text-lg font-semibold">Preço de Tabela</span>
            </div>
            <span className="font-extrabold text-lg text-rzk_green text-center">R$ {resultados.investimento}</span>
          </div>

          <div className="flex flex-col">
            <div className="flex gap-2 items-center">
              <CirclePercent className="size-5" />
              <span className="text-lg font-semibold">Desconto</span>
            </div>
            <span className="font-extrabold text-lg text-rzk_green text-center">{resultados.investimento}%</span>
          </div>

          <div className="flex flex-col">
            <div className="flex gap-2 items-center">
              <DollarSign className="size-5" />
              <span className="text-lg font-semibold">Investimento</span>
            </div>
            <span className="font-extrabold text-lg text-rzk_green text-center">R$ {resultados.investimento}</span>
          </div>

          <div className="flex flex-col">
            <div className="flex gap-2 items-center">
              <BadgeDollarSign className="size-5" />
              <span className="text-lg font-semibold">CPM Médio</span>
            </div>
            <span className="font-extrabold text-lg text-rzk_green text-center">R$ {resultados.investimento}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
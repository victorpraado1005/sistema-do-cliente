import {
  BadgeDollarSign,
  ChartLine,
  CircleDollarSign,
  CirclePercent,
  CirclePlay,
  DollarSign,
  Map,
  Smartphone,
  SquareUser,
  Target,
  UserRoundCheck,
  Users,
  UsersRound,
  View,
} from "lucide-react";
import { useSimulador } from "../context/SimuladorContext";

export default function CardNumerosCampanhaPagaEBonificada() {
  const { resultados } = useSimulador();

  return (
    <div className="w-[700px] border border-rzk_ligth rounded-2xl flex flex-col py-4 px-6 justify-evenly">
      <div className="grid grid-cols-3 gap-5 text-rzk_regular items-start justify-items-center">
        <div className="space-y-4">
          <div className="flex items-center justify-between w-36">
            <Smartphone className="size-6" />
            <div className="flex flex-col">
              <span className="text-lg font-ligth w-full text-right">
                Faces Totais
              </span>
              <span className="font-extrabold text-lg text-rzk_green text-right">
                {resultados.faces_totais}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between w-36">
            <Map className="size-6" />
            <div className="flex flex-col">
              <span className="text-lg font-ligth w-full text-right">
                Praças
              </span>
              <span className="font-extrabold text-lg text-rzk_green text-right">
                {resultados.faces_totais}
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
                {resultados.investimento.toFixed()}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between w-36">
            <Target className="size-6" />
            <div className="flex flex-col">
              <span className="text-lg font-ligth w-full text-right">
                Impactos
              </span>
              <span className="font-extrabold text-lg text-rzk_green text-right">
                {resultados.investimento.toFixed()}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between w-36">
            <SquareUser className="size-6" />
            <div className="flex flex-col">
              <span className="text-lg font-ligth w-full text-right">
                Freq. Média
              </span>
              <span className="font-extrabold text-lg text-rzk_green text-right">
                {resultados.investimento.toFixed()}
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between w-40">
            <UserRoundCheck className="size-6" />
            <div className="flex flex-col">
              <span className="text-lg font-ligth w-full text-right">
                Usuários únicos
              </span>
              <span className="font-extrabold text-lg text-rzk_green text-right">
                {resultados.investimento.toFixed()}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between w-40">
            <UsersRound className="size-6" />
            <div className="flex flex-col">
              <span className="text-lg font-ligth w-full text-right">
                Alcance
              </span>
              <span className="font-extrabold text-lg text-rzk_green text-right">
                {resultados.investimento.toFixed()}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between w-40">
            <View className="size-6" />
            <div className="flex flex-col">
              <span className="text-lg font-ligth w-full text-right">
                Visitas
              </span>
              <span className="font-extrabold text-lg text-rzk_green text-right">
                {resultados.investimento.toFixed()}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between w-40">
            <ChartLine className="size-6" />
            <div className="flex flex-col">
              <span className="text-lg font-ligth w-full text-right">TRP</span>
              <span className="font-extrabold text-lg text-rzk_green text-right">
                {resultados.investimento.toFixed()}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between w-40">
            <Users className="size-6" />
            <div className="flex flex-col">
              <span className="text-lg font-ligth w-full text-right">
                Pop. 12+ (IBGE)
              </span>
              <span className="font-extrabold text-lg text-rzk_green text-right">
                {resultados.investimento.toFixed()}
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="flex items-center justify-between w-40">
            <CircleDollarSign className="size-6" />
            <div className="flex flex-col">
              <span className="text-lg font-ligth w-full text-right">
                Preço de Tabela
              </span>
              <span className="font-extrabold text-lg text-rzk_green text-right">
                {resultados.investimento.toFixed()}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between w-40">
            <CirclePercent className="size-6" />
            <div className="flex flex-col">
              <span className="text-lg font-ligth w-full text-right">
                Desconto Médio
              </span>
              <span className="font-extrabold text-lg text-rzk_green text-right">
                {resultados.investimento.toFixed()}%
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between w-40">
            <DollarSign className="size-6" />
            <div className="flex flex-col">
              <span className="text-lg font-ligth w-full text-right">
                Investimento
              </span>
              <span className="font-extrabold text-lg text-rzk_green text-right">
                {resultados.investimento.toFixed()}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between w-40">
            <DollarSign className="size-6" />
            <div className="flex flex-col">
              <span className="text-lg font-ligth w-full text-right">
                CPM Médio
              </span>
              <span className="font-extrabold text-lg text-rzk_green text-right">
                R$ {resultados.investimento.toFixed()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

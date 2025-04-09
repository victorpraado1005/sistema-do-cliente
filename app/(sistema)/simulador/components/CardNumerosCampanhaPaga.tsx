import {
  BadgeDollarSign,
  CalendarDays,
  ChartLine,
  CircleDollarSign,
  CirclePercent,
  CirclePlay,
  DollarSign,
  History,
  Map,
  MapPin,
  Smartphone,
  SquareUser,
  Target,
  UserRoundCheck,
  Users,
  UsersRound,
  View,
} from "lucide-react";
import { useSimulador } from "../context/SimuladorContext";

export default function CardNumerosCampanhaPaga() {
  const { resultados, valores, pracas, nomeSimulacao } = useSimulador();

  return (
    <div className="w-[850px] border border-rzk_ligth rounded-2xl flex flex-col mt-2 py-4 px-6 gap-4">
      <div className="flex items-center gap-2">
        <h2 className="text-lg text-rzk_darker font-bold">Campanha:</h2>
        <span className="text-lg text-rzk_regular font-bold">
          {nomeSimulacao}
        </span>
      </div>
      <div className="grid grid-cols-4 gap-5 text-rzk_regular">
        <div className="space-y-4">
          <div className="flex items-center justify-between w-36">
            <CalendarDays className="size-6" />
            <div className="flex flex-col">
              <span className="text-lg font-ligth w-full text-right">
                Período (dias)
              </span>
              <span className="font-extrabold text-lg text-rzk_green text-right">
                {valores.dias}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between w-36">
            <MapPin className="size-6" />
            <div className="flex flex-col">
              <span className="text-lg font-ligth w-full text-right">
                Pontos
              </span>
              <span className="font-extrabold text-lg text-rzk_green text-right">
                {valores.pontos.length}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between w-36">
            <Smartphone className="size-6" />
            <div className="flex flex-col">
              <span className="text-lg font-ligth w-full text-right">
                Faces
              </span>
              <span className="font-extrabold text-lg text-rzk_green text-right">
                {resultados.faces_totais_pagas}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between w-36">
            <Map className="size-7" />
            <div className="flex flex-col w-full justify-between">
              <span className="text-lg font-ligth w-full text-right">
                Praças
              </span>
              <span className="font-extrabold text-xs text-rzk_green text-right">
                {pracas.join(", ")}
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
                {valores.saturacao}
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="flex items-center justify-between w-36">
            <CirclePlay className="size-6" />
            <div className="flex flex-col">
              <span className="text-lg font-ligth w-full text-right">
                Inserções
              </span>
              <span className="font-extrabold text-lg text-rzk_green text-right">
                {resultados.insercoes?.toLocaleString("pt-br", {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })}
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
                {resultados.impactos?.toLocaleString("pt-br", {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })}
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
                {resultados.frequencia_media
                  ? resultados.frequencia_media.toFixed(0)
                  : 0}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between w-36">
            <ChartLine className="size-6" />
            <div className="flex flex-col">
              <span className="text-lg font-ligth w-full text-right">TRP</span>
              <span className="font-extrabold text-lg text-rzk_green text-right">
                {resultados.trp ? resultados.trp.toFixed(0) : 0}
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="flex items-center justify-between w-40">
            <View className="size-6" />
            <div className="flex flex-col">
              <span className="text-lg font-ligth w-full text-right">
                Visitas
              </span>
              <span className="font-extrabold text-lg text-rzk_green text-right">
                {resultados.visitas?.toLocaleString("pt-br")}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between w-40">
            <UserRoundCheck className="size-6" />
            <div className="flex flex-col">
              <span className="text-lg font-ligth w-full text-right">
                Usuários únicos
              </span>
              <span className="font-extrabold text-lg text-rzk_green text-right">
                {resultados.usuarios_unicos?.toLocaleString("pt-br", {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })}
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
                {resultados.populacao_12_mais?.toLocaleString("pt-br", {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })}
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
                {resultados.alcance ? resultados.alcance.toFixed(2) : 0}%
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
                {" "}
                {resultados.preco_tabela?.toLocaleString("pt-br", {
                  style: "currency",
                  currency: "brl",
                })}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between w-40">
            <CirclePercent className="size-6" />
            <div className="flex flex-col">
              <span className="text-lg font-ligth w-full text-right">
                Desconto
              </span>
              <span className="font-extrabold text-lg text-rzk_green text-right">
                {valores.desconto}%
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
                {" "}
                {resultados.investimento?.toLocaleString("pt-br", {
                  style: "currency",
                  currency: "brl",
                })}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between w-40">
            <BadgeDollarSign className="size-6" />
            <div className="flex flex-col">
              <span className="text-lg font-ligth w-full text-right">
                CPM Médio
              </span>
              <span className="font-extrabold text-lg text-rzk_green text-right">
                R${" "}
                {resultados.cpm_medio
                  ? resultados.cpm_medio.toLocaleString("pt-br", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })
                  : 0}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

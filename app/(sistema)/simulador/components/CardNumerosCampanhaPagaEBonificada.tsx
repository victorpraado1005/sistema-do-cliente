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
  const { resultados, pracas, nomeSimulacao } = useSimulador();

  return (
    <div className="w-[700px] border border-rzk_ligth rounded-2xl">
      <div className="flex items-center gap-2 pt-2 px-6">
        <h1 className="text-lg font-extrabold text-rzk_darker">Campanha:</h1>
        <span className="text-lg text-rzk_regular font-bold">
          {nomeSimulacao}
        </span>
      </div>
      <div className=" flex flex-col py-4 px-6 justify-evenly">
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

            <div className="flex flex-col justify-between w-36">
              <div className="flex w-full justify-between">
                <Map className="size-6" />
                <span className="text-lg font-ligth w-full text-right">
                  Praças
                </span>
              </div>
              <span className="font-extrabold text-rzk_green text-right text-xs mt-1">
                {pracas.join(", ")}
              </span>
            </div>

            <div className="flex items-center justify-between w-36">
              <CirclePlay className="size-6" />
              <div className="flex flex-col">
                <span className="text-lg font-ligth w-full text-right">
                  Inserções
                </span>
                <span className="font-extrabold text-lg text-rzk_green text-right">
                  {resultados.insercoes_totais?.toLocaleString("pt-br", {
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
                  {resultados.impactos_totais?.toLocaleString("pt-br", {
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
                    ? resultados.frequencia_media?.toLocaleString("pt-br", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })
                    : 0}
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
                  {resultados.usuarios_unicos?.toLocaleString("pt-br", {
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
              <ChartLine className="size-6" />
              <div className="flex flex-col">
                <span className="text-lg font-ligth w-full text-right">
                  TRP
                </span>
                <span className="font-extrabold text-lg text-rzk_green text-right">
                  {resultados.trp
                    ? resultados.trp?.toLocaleString("pt-br", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })
                    : 0}
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
          </div>

          <div className="space-y-8">
            <div className="flex items-center justify-between w-40">
              <CircleDollarSign className="size-6" />
              <div className="flex flex-col">
                <span className="text-lg font-ligth w-full text-right">
                  Preço de Tabela
                </span>
                <span className="font-extrabold text-lg text-rzk_green text-right">
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
                  Desconto Médio
                </span>
                <span className="font-extrabold text-lg text-rzk_green text-right">
                  {resultados.desconto_medio.toFixed()}%
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
                  {resultados.investimento?.toLocaleString("pt-br", {
                    style: "currency",
                    currency: "brl",
                  })}
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
                  R${" "}
                  {resultados.cpm_medio.toLocaleString("pt-br", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

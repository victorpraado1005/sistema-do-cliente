import { useSimulador } from "../context/SimuladorContext";

export default function fnResetFormSimulacao() {
  const { setValue, setSelectedPontos, setSelectedPontosBonificados } =
    useSimulador();

  setValue("dias", 0);
  setValue("saturacao", 1);
  setValue("desconto", 0);
  setSelectedPontos([]);
  setValue("dias_bonificados", 1);
  setValue("saturacao_bonificada", 1);
  return setSelectedPontosBonificados([]);
}

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { MonitorCog } from "lucide-react";
import { useSimulador } from "../context/SimuladorContext";

export default function DialogEditarProduto() {
  const {
    pontos,
    produtos,
    selectedPontos,
    selectedProducts,
    setSelectedProducts
  } = useSimulador();

  const pontosComProdutos = pontos
    .filter((ponto) => selectedPontos.includes(ponto.id_ponto))
    .map((ponto) => {
      const idsConcessao = ponto.concessoes.map(
        (concessao: any) => concessao.id_concessao_ponto
      );

      const produtosEncontrados = produtos.filter((produto) =>
        idsConcessao.includes(produto.id_concessao_ponto)
      );

      return { ...ponto, produtos: produtosEncontrados };
    });

  const products = selectedProducts?.map((produto) => produto.id_produto);

  const handleEditarProduto = (id_produto: number) => {
    const new_product = produtos.filter(produto => produto.id_produto === id_produto)[0]

    const novoArray = [
      ...selectedProducts.filter(
        (objeto) => objeto.id_concessao_ponto !== new_product.id_concessao_ponto
      ),
      new_product,
    ];
    setSelectedProducts(novoArray)
    console.log(novoArray);
  }

  return (
    <Dialog>
      <DialogTrigger className="w-full text-white flex items-center justify-center font-bold gap-2 outline-none">
        <MonitorCog className="size-4" />
        Editar Produtos
      </DialogTrigger>
      <DialogContent className="w-full max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex flex-col">
            <DialogTitle className="text-2xl text-rzk_darker font-extrabold">
              Editar Produtos
            </DialogTitle>
          </div>
        </DialogHeader>
        <div className="flex flex-col gap-2">
          {pontosComProdutos.map(
            (ponto) =>
              ponto.produtos.length > 1 && (
                <div key={ponto.id_ponto}>
                  <div className="border border-rzk_extra_ligth p-2 rounded-md text-rzk_darker font-medium flex gap-4">
                    <div>{ponto.nome}</div>
                    <div>
                      <RadioGroup
                        defaultValue={String(
                          ponto.produtos.filter((item: any) =>
                            products.includes(item.id_produto)
                          )[0]?.id_produto || ""
                        )}
                        onValueChange={(value) => {
                          const idProduto = Number(value);
                          handleEditarProduto(idProduto);
                        }}
                      >
                        {ponto.produtos.map((produto: any) => (
                          <div key={produto.id_produto}>
                            <RadioGroupItem
                              value={produto.id_produto.toString()}
                              id={produto.id_produto}
                            />
                            <label
                              htmlFor={String(produto.id_produto)}
                              className="ml-2"
                            >
                              {produto.qtd_faces +
                                " Telas - Status: " +
                                produto.fase}
                            </label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>
                  </div>
                </div>
              )
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
import { toast } from "sonner";

export default async function fnCaptureScreenshot(
  element: HTMLDivElement | null
): Promise<string> {
  if (!element) {
    toast.error("Elemento não encontrado para captura!", {
      description: "Verifique se a referência está correta.",
    });
    return "";
  }

  const html2canvas = (await import("html2canvas")).default;

  try {
    const canvas = await html2canvas(element, { useCORS: true, scale: 2 });
    const image = canvas.toDataURL("image/png", 1);
    return image;
  } catch (error) {
    toast.error("Houve um erro ao capturar o print!", {
      description: "Tente novamente.",
    });
    console.error("Erro ao capturar o print:", error);
    return "";
  }
}

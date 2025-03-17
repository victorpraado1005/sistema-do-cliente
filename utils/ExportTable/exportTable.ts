import * as XLSX from "xlsx";
import { IDadosTabela } from "@/app/types/IDadosTabela";

export const exportTableToExcel = (data: IDadosTabela[]) => {
  const worksheet = XLSX.utils.json_to_sheet(data);

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Período Pago");

  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });

  const dataBlob = new Blob([excelBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
  });

  return dataBlob;
};

export const exportAllTablesToExcel = (
  dadosTabelaPaga: IDadosTabela[],
  dadosTabelaBonificada: IDadosTabela[]
) => {
  let worksheetCombined = XLSX.utils.aoa_to_sheet([]);

  XLSX.utils.sheet_add_aoa(worksheetCombined, [["Período Pago"]], {
    origin: "A1",
  });

  XLSX.utils.sheet_add_json(worksheetCombined, dadosTabelaPaga, {
    origin: { r: 1, c: 0 },
    skipHeader: false,
  });

  const rowsTable1 = dadosTabelaPaga.length + 1;
  const rowForPeriodoBonificado = rowsTable1 + 2;

  XLSX.utils.sheet_add_aoa(worksheetCombined, [["Período Bonificado"]], {
    origin: { r: rowForPeriodoBonificado, c: 0 },
  });

  XLSX.utils.sheet_add_json(worksheetCombined, dadosTabelaBonificada, {
    origin: { r: rowForPeriodoBonificado + 1, c: 0 },
    skipHeader: false,
  });

  const worksheet1 = XLSX.utils.json_to_sheet(dadosTabelaPaga);
  const worksheet2 = XLSX.utils.json_to_sheet(dadosTabelaBonificada);

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet1, "Período Pago");
  XLSX.utils.book_append_sheet(workbook, worksheet2, "Período Bonificado");
  XLSX.utils.book_append_sheet(workbook, worksheetCombined, "Consolidado");

  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });

  const dataBlob = new Blob([excelBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
  });

  return dataBlob;
};

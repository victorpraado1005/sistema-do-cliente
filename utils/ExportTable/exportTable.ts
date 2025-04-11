import * as XLSX from "xlsx";
import { IDadosTabela } from "@/app/types/IDadosTabela";

export const exportTableToExcel = (data: IDadosTabela[]) => {
  const worksheet = XLSX.utils.json_to_sheet(data);

  const dataLength = data.length + 1;
  const noteRow = dataLength + 2;

  const noteText = "*Usuários únicos e alcance não são somáveis entre pontos devido à sobreposição de usuários";

  const noteCellAddress = `A${noteRow}`;
  worksheet[noteCellAddress] = { t: "s", v: noteText };

  const range = XLSX.utils.decode_range(worksheet["!ref"]!);
  range.e.r = noteRow;
  worksheet["!ref"] = XLSX.utils.encode_range(range);

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
  const noteText = "*Usuários únicos e alcance não são somáveis entre pontos devido à sobreposição de usuários";

  const worksheet1 = XLSX.utils.json_to_sheet(dadosTabelaPaga);
  const noteRow1 = dadosTabelaPaga.length + 3;
  worksheet1[`A${noteRow1}`] = { t: "s", v: noteText };
  worksheet1["!ref"] = updateSheetRange(worksheet1, noteRow1);

  const worksheet2 = XLSX.utils.json_to_sheet(dadosTabelaBonificada);
  const noteRow2 = dadosTabelaBonificada.length + 3;
  worksheet2[`A${noteRow2}`] = { t: "s", v: noteText };
  worksheet2["!ref"] = updateSheetRange(worksheet2, noteRow2);

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

  const finalRow = rowForPeriodoBonificado + dadosTabelaBonificada.length + 3;
  worksheetCombined[`A${finalRow}`] = { t: "s", v: noteText };
  worksheetCombined["!ref"] = updateSheetRange(worksheetCombined, finalRow);

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

function updateSheetRange(sheet: XLSX.WorkSheet, lastRow: number): string {
  const range = XLSX.utils.decode_range(sheet["!ref"] ?? "A1:A1");
  range.e.r = Math.max(range.e.r, lastRow);
  return XLSX.utils.encode_range(range);
}

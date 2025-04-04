"use client";

import React from "react";
import {
  useReactTable,
  getCoreRowModel,
  ColumnDef,
  flexRender,
} from "@tanstack/react-table";
import { IDadosTabela } from "@/app/types/IDadosTabela";

const columns: ColumnDef<IDadosTabela>[] = [
  {
    accessorKey: "nome_ponto",
    header: "Ponto",
  },
  {
    accessorKey: "dias",
    header: "Dias",
  },
  {
    accessorKey: "faces",
    header: "Faces",
  },
  {
    accessorKey: "insercoes",
    header: "Inserções",
  },
  {
    accessorKey: "visitas",
    header: "Visitas",
  },
  {
    accessorKey: "impactos",
    header: "Impactos",
  },
  {
    accessorKey: "usuarios_unicos",
    header: "Únicos",
  },
  {
    accessorKey: "alcance",
    header: "Alcance",
  },
  {
    accessorKey: "freq_media",
    header: "Freq. Média",
  },
  {
    accessorKey: "trp",
    header: "TRP",
  },
  {
    accessorKey: "preco_tabela",
    header: "Valor de Tabela",
  },
  {
    accessorKey: "investimento",
    header: "Investimento",
  },
];

interface TableDataCampaignProps {
  data: IDadosTabela[];
}

export default function TableDataCampaign({ data }: TableDataCampaignProps) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="overflow-x-auto max-h-[250px] overflow-y-auto mt-4">
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="border border-gray-300 p-2 text-rzk_darker font-extrabold"
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="border border-gray-300 p-2 text-center"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

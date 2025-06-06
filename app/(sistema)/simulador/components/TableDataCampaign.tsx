"use client";

import React from "react";
import {
  useReactTable,
  getCoreRowModel,
  ColumnDef,
  flexRender,
} from "@tanstack/react-table";
import { IDadosTabela } from "@/app/types/IDadosTabela";

interface IDadosTabelaFormatado {
  nome_ponto: string;
  dias: number;
  faces: number;
  visitas: string;
  insercoes: string;
  impactos: string;
  usuarios_unicos: string;
  alcance: string;
  freq_media: string;
  trp: number;
  cpm: string;
  preco_tabela: string;
  desconto: string;
  investimento: string;
}

const columns: ColumnDef<IDadosTabelaFormatado>[] = [
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
    header: "Únicos*",
  },
  {
    accessorKey: "alcance",
    header: "Alcance*",
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
    accessorKey: "cpm",
    header: "CPM",
  },
  {
    accessorKey: "preco_tabela",
    header: "Valor de Tabela",
  },
  {
    accessorKey: "desconto",
    header: "Desconto",
  },
  {
    accessorKey: "investimento",
    header: "Investimento",
  },
];

interface TableDataCampaignProps {
  data: IDadosTabelaFormatado[];
}

export default function TableDataCampaign({ data }: TableDataCampaignProps) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="overflow-x-auto max-h-[350px] overflow-y-aut">
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

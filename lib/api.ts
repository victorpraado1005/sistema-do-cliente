import { IProposta } from "@/app/types/IProposta";
import { ISimulacao } from "@/app/types/ISimulacao";

export async function apiFetch(endpoint: string, options: RequestInit = {}) {
  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
    "X-User-Email": "victor.prado@rzkdigital.com.br",
    "X-User-Name": "Victor Prado",
    ...options.headers,
  };

  const res = await fetch(`${apiUrl}/${endpoint}`, {
    ...options,
    headers,
  });

  if (!res.ok) {
    throw new Error(`Erro na requisição: ${res.status}`);
  }

  return res.json();
}

export async function fetchPontos() {
  return apiFetch("ponto");
}

export async function fetchConcessoes() {
  return apiFetch("concessao");
}

export async function fetchConcessoesPonto() {
  return apiFetch("concessao/concessao_ponto");
}

export async function fetchProdutos() {
  return apiFetch("produto");
}

export async function fetchUser(params: Record<string, any>) {
  const queryString = new URLSearchParams(params).toString();
  return apiFetch(`colaborador?${queryString}`);
}

export async function fetchUserData(params: Record<string, any>) {
  const queryString = new URLSearchParams(params).toString();
  return apiFetch(`colaborador?${queryString}`);
}

export async function postProposta(proposta: IProposta) {
  return apiFetch("proposta", {
    method: "POST",
    body: JSON.stringify(proposta),
  });
}

export async function postSimulacao(simulacao: ISimulacao) {
  return apiFetch("simulacao", {
    method: "POST",
    body: JSON.stringify(simulacao),
  });
}

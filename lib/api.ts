export async function apiFetch(endpoint: string, options: RequestInit = {}) {
  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
    "X-User-Email": "victor.prado@rzkdigital.com.br",
    "X-User-Name": "Victor Prado",
    ...options.headers,
  };

  const res = await fetch(`${apiUrl}/${endpoint}/`, {
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

export async function fetchProdutos() {
  return apiFetch("produto");
}

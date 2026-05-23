// src/lib/abacus.ts
export type AbacusResponse = {
  value: number;
};

const BASE_URL = "https://abacus.jasoncameron.dev";
const NAMESPACE = "your-site-name"; // use your domain later, ex: "austinchanorsini.com"

export async function hitCounter(key: string): Promise<number> {
  const res = await fetch(`${BASE_URL}/hit/${NAMESPACE}/${key}`);

  if (!res.ok) {
    throw new Error("Failed to hit counter");
  }

  const data: AbacusResponse = await res.json();
  return data.value;
}

export async function getCounter(key: string): Promise<number> {
  const res = await fetch(`${BASE_URL}/get/${NAMESPACE}/${key}`);

  if (!res.ok) {
    throw new Error("Failed to get counter");
  }

  const data: AbacusResponse = await res.json();
  return data.value;
}
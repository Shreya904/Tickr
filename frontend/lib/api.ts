const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getTasks() {
  const res = await fetch(`${BASE_URL}/tasks`);
  return res.json();
}

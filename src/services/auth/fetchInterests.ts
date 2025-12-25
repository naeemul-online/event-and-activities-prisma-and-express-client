import { serverFetch } from "@/lib/server-fetch";

export async function fetchInterests() {
  const res = await serverFetch.get("/user/all-interests");
  if (!res.ok) {
    throw new Error("Failed to fetch interests");
  }
  return await res.json();
}

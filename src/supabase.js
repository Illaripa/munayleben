import { createClient } from "@supabase/supabase-js";

const URL = import.meta.env.VITE_SUPABASE_URL;
const KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = URL && KEY ? createClient(URL, KEY) : null;

/* ── Generic get/set for key-value storage ── */
export async function dbGet(key) {
  if (!supabase) return null;
  try {
    const { data } = await supabase.from("munay_data").select("value").eq("key", key).single();
    return data?.value ?? null;
  } catch { return null; }
}

export async function dbSet(key, value) {
  if (!supabase) return;
  try {
    await supabase.from("munay_data").upsert({ key, value, updated_at: new Date().toISOString() });
  } catch (e) { console.warn("Supabase save failed:", e.message); }
}

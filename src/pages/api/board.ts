export const prerender = false;
import type { APIRoute } from "astro";
import { db, BoardPost, desc } from "astro:db";

// ─── 定数 ───────────────────────────────────────────────────
const MAX_NAME   = 50;
const MAX_BODY   = 400;
const PAGE_LIMIT = 50;

// ─── GET /api/board ─────────────────────────────────────────
// クエリパラメータ: ?page=0（0始まり）
export const GET: APIRoute = async ({ url }) => {
  const page   = Math.max(0, Number(url.searchParams.get("page") ?? 0));
  const offset = page * PAGE_LIMIT;

  try {
    const posts = await db
      .select()
      .from(BoardPost)
      .orderBy(desc(BoardPost.postedAt))
      .limit(PAGE_LIMIT)
      .offset(offset);

    return json({ posts }, 200);
  } catch (err) {
    console.error("[board GET]", err);
    return json({ error: "投稿の取得に失敗しました" }, 500);
  }
};

// ─── POST /api/board ────────────────────────────────────────
// リクエストボディ: { name?: string, body: string }
export const POST: APIRoute = async ({ request }) => {
  // Content-Type チェック
  const ct = request.headers.get("content-type") ?? "";
  if (!ct.includes("application/json")) {
    return json({ error: "Content-Type は application/json が必要です" }, 415);
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return json({ error: "不正な JSON です" }, 400);
  }

  if (!isRecord(payload)) {
    return json({ error: "リクエストボディが不正です" }, 400);
  }

  const name = sanitize(payload.name, "Anonymous", MAX_NAME);
  const body = sanitize(payload.body, "", MAX_BODY);

  if (!body) {
    return json({ error: "メッセージは必須です" }, 422);
  }

  try {
    // Astro DB の Drizzle insert — returning() で挿入行を返す
    const inserted = await db
      .insert(BoardPost)
      .values({ name, body })
      .returning();

    return json({ post: inserted[0] }, 201);
  } catch (err) {
    console.error("[board POST]", err);
    return json({ error: "投稿の保存に失敗しました" }, 500);
  }
};

// ─── ヘルパー ────────────────────────────────────────────────
function json(data: unknown, status: number): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

/** 文字列を trim し、空なら fallback、maxLen でクリップして返す */
function sanitize(
  val: unknown,
  fallback: string,
  maxLen: number
): string {
  const s = typeof val === "string" ? val.trim() : "";
  return (s || fallback).slice(0, maxLen);
}

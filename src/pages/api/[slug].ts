// src/pages/api/comments/[slug].ts
export const prerender = false;  // ← 追加
import type { APIRoute } from "astro";
import { db, Comment, eq, desc } from "astro:db";

// ── GET: 指定スラッグのコメント一覧を取得 ──────────────────────────────
export const GET: APIRoute = async ({ params }) => {
  const { slug } = params;

  if (!slug) {
    return new Response(JSON.stringify({ error: "slug is required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const comments = await db
      .select()
      .from(Comment)
      .where(eq(Comment.postSlug, slug))
      .orderBy(desc(Comment.createdAt));

    return new Response(JSON.stringify(comments), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("[GET /api/comments]", err);
    return new Response(JSON.stringify({ error: "Failed to fetch comments" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};

// ── POST: 新規コメント投稿 ───────────────────────────────────────────────
export const POST: APIRoute = async ({ params, request }) => {
  const { slug } = params;

  if (!slug) {
    return new Response(JSON.stringify({ error: "slug is required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  let body: { author?: string; email?: string; body?: string };

  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  // ── バリデーション ───────────────────────────────────────────────────
  const author = body.author?.trim();
  const commentBody = body.body?.trim();
  const email = body.email?.trim() || null;

  if (!author || author.length < 1 || author.length > 50) {
    return new Response(
      JSON.stringify({ error: "名前は1〜50文字で入力してください" }),
      { status: 422, headers: { "Content-Type": "application/json" } }
    );
  }

  if (!commentBody || commentBody.length < 2 || commentBody.length > 1000) {
    return new Response(
      JSON.stringify({ error: "コメントは2〜1000文字で入力してください" }),
      { status: 422, headers: { "Content-Type": "application/json" } }
    );
  }

  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return new Response(
      JSON.stringify({ error: "メールアドレスの形式が正しくありません" }),
      { status: 422, headers: { "Content-Type": "application/json" } }
    );
  }

  try {
    const [newComment] = await db
      .insert(Comment)
      .values({
        postSlug: slug,
        author,
        email,
        body: commentBody,
        createdAt: new Date(),
        approved: true,
      })
      .returning();

    return new Response(JSON.stringify(newComment), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("[POST /api/comments]", err);
    return new Response(
      JSON.stringify({ error: "コメントの投稿に失敗しました" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};

export const prerender = false;  
import type { APIRoute } from 'astro';
import { db, boardComment } from 'astro:db';

// データの取得 (GET)
export const GET: APIRoute = async () => {
  try {
    const comments = await db.select().from(boardComment).orderBy(desc(boardComment.publishedAt));
    return new Response(JSON.stringify(comments), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: "Failed to fetch" }), { status: 500 });
  }
};

// データの投稿 (POST)
export const POST: APIRoute = async ({ request, redirect }) => {
  const formData = await request.formData();
  const author = formData.get('author')?.toString();
  const content = formData.get('content')?.toString();

  if (!author || !content) {
    return new Response('Missing fields', { status: 400 });
  }

  try {
    await db.insert(boardComment).values({
      author,
      content,
      publishedAt: new Date(),
    });

    // 投稿に成功したら掲示板ページへ戻る
    // (静的ページでもリダイレクト後にJSが最新データを再取得します)
    return redirect('/bbs', 303);
  } catch (e) {
    return new Response('Database Error', { status: 500 });
  }
};


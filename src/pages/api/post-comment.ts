import type { APIRoute } from 'astro';
import { db, boardComment } from 'astro:db';

export const POST: APIRoute = async ({ request, redirect }) => {
  const formData = await request.formData();
  const author = formData.get('author')?.toString();
  const content = formData.get('content')?.toString();

  // 簡易バリデーション
  if (!author || !content) {
    return new Response('Missing fields', { status: 400 });
  }

  try {
    // データベースに保存
    await db.insert(boardComment).values({
      author,
      content,
      publishedAt: new Date(),
    });

    // 投稿後、掲示板ページにリダイレクト
    return redirect('/bbs', 303);
  } catch (e) {
    return new Response('Database Error', { status: 500 });
  }
};

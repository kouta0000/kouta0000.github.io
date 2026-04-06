import { defineAction } from 'astro:actions';
import { z } from 'astro:schema';
import { db, Comment } from 'astro:db';

export const server = {
  postComment: defineAction({
    // 入力データのバリデーション（チェック）
    input: z.object({
      author: z.string().min(1, "名前を入力してください"),
      content: z.string().min(1, "内容を入力してください"),
    }),
    handler: async (input) => {
      // データベースに保存
      const result = await db.insert(Comment).values({
        author: input.author,
        content: input.content,
        publishedAt: new Date(),
      });
      return { success: true };
    },
  }),
};

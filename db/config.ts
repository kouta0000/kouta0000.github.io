// db/config.ts
import { defineDb, defineTable, column, NOW } from "astro:db";

export const Comment = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    postSlug: column.text(),
    author: column.text(),
    email: column.text({ optional: true }),
    body: column.text(),
    createdAt: column.date({ default: NOW }),
    approved: column.boolean({ default: true }),
  },
  indexes: [
    { on: ["postSlug"] },
  ],
});
export const BoardPost = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    name: column.text({ default: "Anonymous" }),
    body: column.text(),
    postedAt: column.date({ default: NOW}),
  },
});
export default defineDb({
  tables: { Comment, BoardPost },
});

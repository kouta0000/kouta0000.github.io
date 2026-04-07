// db/config.ts
import { defineDb, defineTable, column } from "astro:db";

const Comment = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    postSlug: column.text(),
    author: column.text(),
    email: column.text({ optional: true }),
    body: column.text(),
    createdAt: column.date({ default: new Date() }),
    approved: column.boolean({ default: true }),
  },
  indexes: [
    { on: ["postSlug"] },
  ],
});
const BoardPost = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    name: column.text({ default: "Anonymous" }),
    body: column.text(),
    postedAt: column.date({ default: NOW }),
  },
});
export default defineDb({
  tables: { Comment, BoardPost },
});

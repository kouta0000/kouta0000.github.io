// src/lib/commentUtils.ts

/**
 * 名前から決定論的なアバターカラーを生成
 */
export function avatarColor(name: string): string {
  const colors = [
    "#6366f1", "#8b5cf6", "#ec4899", "#f43f5e",
    "#f97316", "#eab308", "#22c55e", "#14b8a6", "#0ea5e9",
  ];
  let hash = 0;
  for (const ch of name) {
    hash = (hash * 31 + ch.charCodeAt(0)) & 0xffffffff;
  }
  return colors[Math.abs(hash) % colors.length];
}

/**
 * 日付を日本語フォーマットに変換
 */
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

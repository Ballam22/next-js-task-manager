// utils/formatTaskDate.ts
export function formatTaskDate(date: string) {
  return new Date(date).toLocaleDateString('en-GB'); // e.g., 06/04/2025
}

export function distributeEqually(items, n = 5) {
  const result = Array.from({ length: n }, () => []);
  const base = Math.floor(items.length / n);
  let remainder = items.length % n;
  let idx = 0;

  for (let i = 0; i < n; i++) {
    const count = base + (remainder > 0 ? 1 : 0);
    remainder = Math.max(0, remainder - 1);
    for (let j = 0; j < count; j++) {
      result[i].push(items[idx++]);
    }
  }
  return result;
}

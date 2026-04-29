export function sumBy<T>(arr: T[], selector: (item: T) => number): number {
  return arr.reduce((sum, item) => sum + selector(item), 0);
}

export function avgBy<T>(arr: T[], selector: (item: T) => number): number {
  if (arr.length === 0) return 0;
  return sumBy(arr, selector) / arr.length;
}

export function maxBy<T>(arr: T[], selector: (item: T) => number): T | null {
  if (arr.length === 0) return null;
  return arr.reduce((prev, current) => 
    selector(current) > selector(prev) ? current : prev
  );
}

export function reportCountsByCategory<T>(
  arr: T[],
  categoryFn: (item: T) => string
): Record<string, number> {
  return arr.reduce((acc, item) => {
    const key = categoryFn(item);
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
}

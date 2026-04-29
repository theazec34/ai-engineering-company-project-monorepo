/**
 * Utility functions para trabajar con colecciones
 */

export function groupBy<T, K extends string | number | symbol>(
  arr: T[],
  keyFn: (item: T) => K
): Record<K, T[]> {
  return arr.reduce((acc, item) => {
    const key = keyFn(item);
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {} as Record<K, T[]>);
}

export function filterBy<T>(
  arr: T[],
  predicate: (item: T) => boolean
): T[] {
  return arr.filter(predicate);
}

export function mapBy<T, U>(
  arr: T[],
  mapper: (item: T) => U
): U[] {
  return arr.map(mapper);
}

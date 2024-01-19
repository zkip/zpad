export function first<T>(list: T[]): T | undefined { return list[0] ?? undefined }
export function last<T>(list: T[]): T | undefined { return list[list.length - 1] ?? undefined }

export function firstMust<T>(list: (T | NonNullable<T>)[]): T { return list[0] }
export function lastMust<T>(list: (T | NonNullable<T>)[]): T { return list[list.length - 1] }

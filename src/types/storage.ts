export interface SetGetter<T> {
	fallback?: T;
	get: (value: string | undefined) => T | undefined;
	set: (data: T) => string | undefined;
}

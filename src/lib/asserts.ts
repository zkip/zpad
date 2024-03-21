import type { Falsy, NonZeroFalsy, ThenFn } from '../types/asserts';

export function isHTMLElement<T>(v: T | HTMLElement): v is HTMLElement {
	return v instanceof HTMLElement;
}
export function isHTMLDivElement<T>(v: T | HTMLDivElement): v is HTMLDivElement {
	return v instanceof HTMLDivElement;
}

export function isFalsy<T>(v: T | Falsy): v is Falsy {
	return !v;
}

export function isTruthy<T>(v: T | Falsy): v is Exclude<T, Falsy> {
	return Boolean(v);
}

export function isNum<T>(v: T | number): v is number {
	return typeof v === 'number';
}

export function isNil<T>(v: T | undefined): v is undefined {
	return typeof v === 'undefined';
}

export function notNil<T>(v: T | undefined): v is T {
	return typeof v !== 'undefined';
}

export function isTruthyOrZero<T>(v: T | Falsy): v is Exclude<T, Falsy> {
	return Boolean(v) || v === 0;
}

export function notFalse<T>(v: T | false): v is T {
	return v !== false;
}

// isFalsy exclude zero
export function isFalsyExZero<T>(v: T | 0 | NonZeroFalsy): v is NonZeroFalsy {
	return !v && v !== 0;
}

// isNum exclude zero
export function isNumExZero<T>(v: T | 0 | number): v is number {
	return isNum(v) && v !== 0;
}

export function isTruthyExBool<T>(v: T | boolean | Falsy): v is T {
	return Boolean(v) && [true, false].every((b) => b !== v);
}

export function isNumStr(v: string) {
	return isNaN(Number(v));
}

export function isThenable<T, V extends ThenFn<unknown>>(v: T | V): v is V {
	return notNil(v) && typeof (v as ThenFn<unknown>).then === 'function';
}
import { isNil } from "$lib/asserts";
import { onlyBrowser } from "$lib/browser";
import { tryToNum } from "$lib/transformer";
import { writable } from "svelte/store";

export const StrSeralizer = {
	get: (value: string) => value,
	set: (data: string) => data.toString(),
}
export const NumSeralizer = {
	get: (value: string | null) => tryToNum(value),
	set: (data: number | undefined) => data?.toString(),
}

export const toolsIcons = storagable<string[]>('tools', {
	fallback: [],
	get: (value) => value?.split(","),
	set: (data) => data.join(",")
});
export const focusToolIndex = storagable<number>('tool-focus-index', NumSeralizer);

function storagable<T>(key: string, sg: { fallback?: T, get: (value: string | null) => T | undefined, set: (data: T) => string | undefined }) {
	const { get, set, fallback } = sg;
	const result = writable(onlyBrowser(() => get(localStorage.getItem(key))) ?? fallback)
	result.subscribe((value) => onlyBrowser(() => {
		const seralized = set(value);
		isNil(seralized) ? localStorage.removeItem(key) : localStorage.setItem(key, seralized)
	}))
	return result;
}

import { isNil } from '$lib/asserts';
import { onlyBrowser } from '$lib/browser';
import { tryToNum } from '$lib/transform';
import { writable } from 'svelte/store';
import type { SetGetter } from '../types/storage';
import { storageItemGet, storageItemRemove, storageItemSet } from '$lib/storage';

export const StrSerializer: SetGetter<string | undefined> = {
	get: (value: string | undefined) => value,
	set: (data: string | undefined) => data?.toString()
};
export const NumSerializer: SetGetter<number | undefined> = {
	get: (value: string | undefined) => tryToNum(value),
	set: (data: number | undefined) => data?.toString()
};

export function storable<T>(key: string, sg: SetGetter<T>) {
	const { get, set, fallback } = sg;
	const result = writable(onlyBrowser(() => get(storageItemGet(key))) ?? fallback);
	result.subscribe((value) =>
		onlyBrowser(() => {
			const serialized = set(value);
			isNil(serialized) ? storageItemRemove(key) : storageItemSet(key, serialized);
		})
	);
	return result;
}


export let viewNode: HTMLDivElement;
export function setViewNode(node: HTMLDivElement) {
	viewNode = node;
}

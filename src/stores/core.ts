import { isNil } from '$lib/asserts';
import { onlyBrowser } from '$lib/browser';
import { tryToNum } from '$lib/transformer';
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

export const toolsIcons = storable<string[]>('tools', {
	fallback: [],
	get: (value) => value?.split(','),
	set: (data) => (data.length > 0 ? data.join(',') : undefined)
});
export const focusToolIndex = storable<number | undefined>('tool-focus-index', NumSerializer);

function storable<T>(key: string, sg: SetGetter<T>) {
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

export function inactivate() {
	focusToolIndex.update(() => undefined);
}

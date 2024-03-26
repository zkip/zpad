import { get } from 'svelte/store';
import { NumSerializer, storable } from './core';
import { isNil } from '$lib/asserts';

export const toolIcons = storable<string[]>('tools', {
	fallback: [],
	get: (value) => value?.split(','),
	set: (data) => (data.length > 0 ? data.join(',') : undefined)
});
export const focusToolIndex = storable<number | undefined>('tool-focus-index', NumSerializer);

export function removeTools(index: number) {
	if (get(focusToolIndex) === index) inactivate();
	toolIcons.update((icons) => (icons.splice(index, 1), [...icons]));
}

export function inactivate() {
	focusToolIndex.update(() => undefined);
}

export function upsertTool(icon: string) {
	const focusIndex = get(focusToolIndex);
	toolIcons.update((icons) =>
		isNil(focusIndex) ? [...icons, icon] : ((icons[focusIndex] = icon), icons)
	);
}

export function setFocusIndex(index?: number) {
	focusToolIndex.update(() => index);
}

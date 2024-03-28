import { get } from 'svelte/store';
import { NumSerializer, storable } from './core';
import { isNil } from '$lib/asserts';
import type { ITool } from '$types/tools';
import { tryJSONParse } from '$lib/transform';

export const tools = storable<ITool[]>('tools', {
	fallback: [],
	get: value => tryJSONParse(value),
	set: value => JSON.stringify(value),
});

export const focusToolIndex = storable<number | undefined>('tool-focus-index', NumSerializer);

export function inactivate() {
	focusToolIndex.update(() => undefined);
}

export function upsertTool(icon: string) {
	const focusIndex = get(focusToolIndex);
	tools.update((list) =>
		isNil(focusIndex) ? [...list, { icon }] : ((list[focusIndex].icon = icon), list.slice())
	);
}

export function setFocusIndex(index?: number) {
	focusToolIndex.update(() => index);
}

export function removeTool(index: number) {
	if (get(focusToolIndex) === index) inactivate();
	tools.update((list) => (list.splice(index, 1), [...list]));
}

export function updateToolType(index: number, type: string) {
	tools.update((list) => (list[index].type = type, [...list]));
}	

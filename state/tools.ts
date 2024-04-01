import { get } from 'svelte/store';
import { NumSerializer, storable } from './core';
import { isNil, notNil } from '$lib/asserts';
import type { ITool, IToolAction } from '$types/tools';
import { tryJSONParse } from '$lib/transform';
import { RectTool } from './tools/rect';
import { MoveTool, tryToActivateMoveTool } from './tools/move';

export const tools = storable<ITool[]>('tools', {
	fallback: [],
	get: value => tryJSONParse(value),
	set: value => JSON.stringify(value),
});

export const focusToolIndex = storable<number | undefined>('tool-focus-index', NumSerializer);

export function inactivate() {
	const currentFocusIndex = get(focusToolIndex);
	if (notNil(currentFocusIndex)) {
		const { type } = get(tools)[currentFocusIndex];
		if (notNil(type)) {
			toolActions[type].inactivate()
		};
	}
	focusToolIndex.update(() => undefined);
}

export function setFocusIndex2Side(index?: number) {
	const currentFocusIndex = get(focusToolIndex);
	if (notNil(currentFocusIndex)) {
		const { type } = get(tools)[currentFocusIndex];
		if (notNil(type)) toolActions[type].inactivate();
	}

	if (notNil(index)) {
		const { type } = get(tools)[index];
		if (notNil(type)) toolActions[type].activate();
	}
	focusToolIndex.update(() => index);
}

export function setFocusIndex1Side(index?: number) {
	if (notNil(index)) {
		const { type } = get(tools)[index];
		if (notNil(type)) toolActions[type].activate();
	}
	focusToolIndex.update(() => index);
}

export function upsertTool(icon: string) {
	const focusIndex = get(focusToolIndex);
	tools.update((list) =>
		isNil(focusIndex) ? [...list, { icon }] : ((list[focusIndex].icon = icon), list.slice())
	);
}

export function removeTool(index: number) {
	if (get(focusToolIndex) === index) inactivate();
	tools.update((list) => (list.splice(index, 1), [...list]));
}

export function updateToolType(index: number, type: string) {
	tools.update((list) => (list[index].type = type, [...list]));
}

const toolPools: Tool[] = [];
const toolPoolMap = new Set();
export const toolActions: Record<string, IToolAction> = { rect: new RectTool(tryToActivateMoveTool), move: new MoveTool() };

export function registerTool(tool: Tool) {
	if (toolPoolMap.has(tool.name)) return;

	toolPools.push(tool);
	toolPoolMap.add(tool.name);
}

type Tool = {
	name: string;
	viewNode: HTMLElement;
	onEntry: (viewNode: Tool['viewNode']) => void;
	onExit: (viewNode: Tool['viewNode']) => void;
}

let globalCleaners: (() => void)[] = []
export function setGlobalCleaners(cleaners: (() => void)[]) {
	globalCleaners = cleaners;
}
export function cleanGlobalTool() {
	globalCleaners.map((fn) => fn())
}
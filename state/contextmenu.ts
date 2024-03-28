import { get, writable } from 'svelte/store';
import { removeTool, updateToolType } from './tools';
import type { ArgsType } from '$types/function';
import { last } from '$lib/list';

export const context = writable<string>();

export interface Context {
	type: string;
}

export const isToolManipulatorContext = <T extends Context>(
	v: T | ToolManipulator
): v is ToolManipulator => v.type === 'tool-manipulator';

export interface ToolManipulator extends Context {
	index: number;
}

export const ContextDataMap = {
	removeTool,
	updateToolType,
};

export const defaultContextData = writable<DefaultContextActionOption>({
	removeTool: { show: true, disabled: false },
	updateToolType: { show: false, disabled: false },
});

export type ContextDataType = typeof ContextDataMap;
export type ContextAction<K extends keyof ContextDataType = keyof ContextDataType> = {
	action: K;
	disabled?: boolean;
	show?: boolean;
	args: ArgsType<ContextDataType[keyof ContextDataType]>;
};

export const contextVisible = writable(false);
export const contextmenuPosition = writable({ x: 0, y: 0 });
export const contextData = writable<ContextAction[]>([]);
export const focusLayers = writable<EventLayer[]>([]);
export const layerEvent = writable<{ blur?: Event; focus?: Event }>({});

export type EventLayer = 'contextmenu';
export type DefaultContextActionOption = { [K in keyof ContextDataType]?: Partial<ContextAction<K>> };

export function showContextmenu(data: ContextAction[], event: MouseEvent) {
	const showCount = data.filter(({ show }) => show).length;
	const defaultShowCount = Object.values(get(defaultContextData)).filter(({ show }) => show).length;

	if (showCount + defaultShowCount <= 0) return;

	toggleContextmenu(true);

	contextmenuPosition.update(() => ({ x: event.clientX, y: event.clientY }));
	layerEvent.update(() => ({ focus: event }));
	contextData.update(() => data);

	if (last(get(focusLayers)) === 'contextmenu') return;
	focusLayers.update((layers) => (layers.push('contextmenu'), layers));
}

export function hiddenContextmenu(event?: Event) {
	if (last(get(focusLayers)) !== 'contextmenu') return;

	toggleContextmenu(false);
	layerEvent.update(() => ({ blur: event }));
	focusLayers.update((layers) => (layers.pop(), layers));
}

export function toggleContextmenu(visible?: boolean) {
	contextVisible.update((nowVisible) => visible ?? !nowVisible);
}

export function setDefaultContextAction(data: DefaultContextActionOption) {
	defaultContextData.update(() => data);
}

export function runWithoutFocusLayer<A extends unknown[], R>(
	event: Event,
	fn: (...args: A) => R,
	...args: A
) {
	if (hasFocusLayer(event)) return;
	return fn(...args);
}

export function hasFocusLayer(event: Event) {
	return get(focusLayers).length > 0 || Object.values(get(layerEvent))
		.some((layer?: Event) => layer?.timeStamp === event.timeStamp);
}

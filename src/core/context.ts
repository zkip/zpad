import { writable } from 'svelte/store';
import { removeTools } from './tools';
import type { ArgsType } from '../types/function';

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
	removeTools
};

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
export const defaultContextData = writable<ContextAction[]>([]);

export function showContextmenu(data: ContextAction[], event: MouseEvent) {
	toggleContextmenu(true);

	contextData.update(() => data);
	contextmenuPosition.update(() => ({ x: event.clientX, y: event.clientY }));
}

export function toggleContextmenu(visible?: boolean) {
	contextVisible.update((nowVisible) => visible ?? !nowVisible);
}

export function setDefaultContextAction(data: ContextAction[]) {
	defaultContextData.update(() => data);
}

import { listen } from '$lib/event';
import type { ActionReturn } from 'svelte/action';
import { showContextmenu, type ContextAction } from '../core/contextmenu';

export const contextmenu = directive((node, actions: ContextAction[]) => {
	node.addEventListener('contextmenu', () => {});
	const clean = listen([node, 'contextmenu'], (event) => {
		showContextmenu(actions, event);
	});
	return { destroy: clean };
});

export function directive<
	Node extends Element = HTMLElement,
	Parameter = undefined,
	Attributes extends Record<string, unknown> = Record<never, unknown>
>(fn: (node: Node, parameter: Parameter) => void | ActionReturn<Parameter, Attributes>) {
	return fn;
}

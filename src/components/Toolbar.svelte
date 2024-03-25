<script lang="ts">
	import { onMount } from 'svelte';
	import { focusToolIndex, inactivate, toolsIcons } from '../core/core';
	import type { HTMLAttributes } from 'svelte/elements';
	import { isHTMLElement } from '$lib/asserts';
	import { onlyBrowser } from '$lib/browser';
	import { contextmenu } from '../directives/contextmenu';
	import type { ActionReturn } from 'svelte/action';

	function directive<
		Node extends Element = HTMLElement,
		Parameter = undefined,
		Attributes extends Record<string, unknown> = Record<never, unknown>
	>(fn: (node: Node, parameter: Parameter) => void | ActionReturn<Parameter, Attributes>) {
		return fn;
	}

	if (typeof window !== 'undefined') {
		document.oncontextmenu = () => false;
	}

	onMount(() => {});

	function click({ target }: MouseEvent) {
		if (isHTMLElement(target)) {
			const index = Number(target.getAttribute('data-index'));
			$focusToolIndex = index;
		}
	}

	onlyBrowser(() => addEventListener('keydown', ({ key }) => key === 'Escape' && inactivate()));

	interface $$Props extends HTMLAttributes<HTMLDivElement> {}

</script>

<div {...$$restProps} class="flex bg-slate-500 {$$restProps.class}">
	{#each $toolsIcons as icon, index}
		<div
			class="flex item justify-center items-center"
			class:activate={index === $focusToolIndex}
			data-index={index}
			on:click|stopPropagation={click}
			use:contextmenu={[{ action: 'removeTools', args: [index] }]}
		>
			<i class="{icon} text-2xl pointer-events-none" />
		</div>
	{/each}
</div>

<style lang="postcss">
	.item {
		box-sizing: border-box;
		width: 24px;
		height: 24px;
	}
	.item.activate {
		@apply bg-slate-700;
		@apply text-white;
	}

	#context-menu {
		display: none;
		position: absolute;
		background-color: #f9f9f9;
		min-width: 150px;
		box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
		z-index: 1;
	}
	#context-menu > * {
		color: black;
		padding: 12px 16px;
		text-decoration: none;
		display: block;
	}
	#context-menu > :hover {
		background-color: #f1f1f1;
	}
</style>

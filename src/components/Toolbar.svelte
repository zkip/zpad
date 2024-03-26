<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { isHTMLElement } from '$lib/asserts';
	import { onlyBrowser } from '$lib/browser';
	import { contextmenu } from '../directives/contextmenu';
	import { focusToolIndex, inactivate, setFocusIndex, toolIcons } from '../core/tools';
	import { hasFocusLayer } from '../core/contextmenu';
	import { listen } from '$lib/event';

	function click(event: MouseEvent) {
		if (hasFocusLayer(event)) return;

		const { target } = event;

		if (isHTMLElement(target)) {
			const index = Number(target.getAttribute('data-index'));
			$focusToolIndex === index ? inactivate() : setFocusIndex(index);
			event.stopPropagation();
		}
	}

	onlyBrowser(() =>
		listen(['keydown'], (event) => {
			if (hasFocusLayer(event)) return;
			event.key === 'Escape' && inactivate();
		})
	);

	interface $$Props extends HTMLAttributes<HTMLDivElement> {}
</script>

<div {...$$restProps} class="tools flex bg-slate-500 {$$restProps.class}">
	{#each $toolIcons as icon, index}
		<div
			class="flex item justify-center items-center"
			class:activate={index === $focusToolIndex}
			data-index={index}
			on:click={click}
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

	.tools {
		
	}
	.tools > :hover {
		
	}
</style>

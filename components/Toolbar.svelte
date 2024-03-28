<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { isHTMLElement } from '$lib/asserts';
	import { onlyBrowser } from '$lib/browser';
	import { contextmenu } from '$directives/contextmenu';
	import { focusToolIndex, inactivate, setFocusIndex,  tools } from '$state/tools';
	import { hasFocusLayer } from '$state/contextmenu';
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

<div {...$$restProps} class="tools flex bg-slate-500 z-10 {$$restProps.class}">
	<div class="w-12 pointer-events-none"></div>
	{#each $tools as {icon}, index}
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
		@apply w-8 h-8 box-border;
	}
	.item.activate {
		@apply bg-slate-700 text-white;
	}

	.tools {
	}
	.tools > :hover {
	}
</style>

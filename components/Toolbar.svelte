<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { isHTMLElement, isNil, notNil } from '$lib/asserts';
	import { contextmenu } from '$directives/contextmenu';
	import {
		cleanGlobalTool,
		focusToolIndex,
		inactivate,
		setFocusIndex2Side,
		setGlobalCleaners,
		toolActions,
		tools
	} from '$state/tools';
	import { hasFocusLayer } from '$state/contextmenu';
	import { listen } from '$lib/event';
	import { viewNode } from '$state/core';
	import { onDestroy, onMount } from 'svelte';

	function mousedown(event: MouseEvent) {
		const { target } = event;
		const isSecondryKey = event.button === 2;

		if (!isHTMLElement(target)) return;

		if (hasFocusLayer(event) && !isSecondryKey) return;

		const index = Number(target.getAttribute('data-index'));

		// allow relocated index
		if (isSecondryKey) setFocusIndex2Side(index);
		if (!isSecondryKey) $focusToolIndex === index ? inactivate() : setFocusIndex2Side(index);
		if (!isSecondryKey) event.stopPropagation();
	}

	onMount(()=>{
		listen(['keydown'], (event) => {
			if (hasFocusLayer(event)) return;
			event.key === 'Escape' && inactivate();
		});
	})

	interface $$Props extends HTMLAttributes<HTMLDivElement> {}
</script>

<div {...$$restProps} class="tools flex bg-slate-500 z-10 {$$restProps.class}">
	<div class="w-12 pointer-events-none"></div>
	{#each $tools as { icon }, index}
		<div
			class="flex item justify-center items-center"
			class:activate={index === $focusToolIndex}
			data-index={index}
			use:contextmenu={[
				{ action: 'removeTool', args: [index] },
				{ action: 'updateToolType', args: [index] }
			]}
			on:mousedown={mousedown}
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

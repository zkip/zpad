<script lang="ts">
	import Toolbar from '$components/Toolbar.svelte';
	import { hasFocusLayer, setDefaultContextAction } from '$state/contextmenu';
	import { createRectangle, world } from '$state/world';
	import { listen } from '$lib/event';
	import { Size, Vector2 } from '$lib/vector';
	import { onDestroy, onMount } from 'svelte';
	import { RectShape, castRectShape, isRectShape } from '$core/Rectangle';

	setDefaultContextAction({ removeTool: { show: false } });

	let editorNode: HTMLDivElement;

	let activating = false;

	let start = new Vector2();
	let end = new Vector2();

	$: position = new Vector2(Math.min(start.x, end.x), Math.min(start.y, end.y));
	$: size = new Size(Math.abs(end.x - start.x), Math.abs(end.y - start.y));

	let clean: () => void;

	function activateRectTool() {
		const cleanMousedown = listen([editorNode, 'mousedown'], (event) => {
			if (hasFocusLayer(event)) return;

			const { clientX, clientY } = event;

			start = end = new Vector2(clientX, clientY);

			activating = true;
		});
		const cleanMousemove = listen(['mousemove'], (event) => {
			if (!activating) return;

			const { clientX, clientY } = event;

			end = new Vector2(clientX, clientY);
		});
		const cleanMouseup = listen(['mouseup'], (event) => {
			activating = false;

			const { clientX, clientY } = event;
			end = new Vector2(clientX, clientY);

			const rect = new RectShape(position, size);

			if (rect.area() > 0) createRectangle(rect);
		});

		return () => {
			cleanMousedown(), cleanMousemove(), cleanMouseup();
		};
	}

	onMount(() => {
		
	});

	onDestroy(() => {
		clean?.();
	});
</script>

<div
	class="rectangle preview"
	class:activating
	style="left: {position.x}px; top: {position.y}px; width: {size.width}px; height: {size.height}px;"
></div>

<div class="flex flex-col bg-red-50">
	<Toolbar />
	<div class="flex-1"></div>
</div>

<div class="editor flex-1" bind:this={editorNode}>
	{#each $world as entity}
		{#if isRectShape(entity)}
			{@const { id, position, size } = castRectShape(entity)}
			<div
				data-uid={id}
				style:left={`${position.x}px`}
				style:top={`${position.y}px`}
				style:width={`${size.width}px`}
				style:height={`${size.height}px`}
			></div>
		{/if}
	{/each}
</div>

<style lang="postcss">
	:global(body) {
		@apply overflow-hidden;
	}
	.preview {
		border: 1px solid rebeccapurple;
		@apply absolute pointer-events-none;
	}
	.preview:not(.activating) {
		display: none;
	}

	.editor {
		@apply absolute left-0 right-0 top-0 bottom-0 overflow-hidden;
		@apply select-none;
	}

	.editor > :global(*) {
		border: 1px solid rebeccapurple;
		@apply absolute;
	}
</style>

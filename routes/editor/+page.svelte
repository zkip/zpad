<script lang="ts">
	import Toolbar from '$components/Toolbar.svelte';
	import { hasFocusLayer, setDefaultContextAction } from '$core/contextmenu';
	import { createRectangle } from '$core/world';
	import { onlyBrowser } from '$lib/browser';
	import { listen } from '$lib/event';
	import { uuid } from '$lib/generator';
	import { Vector2 } from '$lib/vector';
	import { onDestroy, onMount } from 'svelte';

	setDefaultContextAction({ removeTools: { show: false } });

	let editorNode: HTMLDivElement;

	let activating = false;

	let start = new Vector2();
	let end = new Vector2();

	$: position = new Vector2(Math.min(start.x, end.x), Math.min(start.y, end.y));
	$: size = new Vector2(Math.abs(end.x - start.x), Math.abs(end.y - start.y));

	let clean: () => void;

	onMount(() => {
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

			// createRectangle({id: uuid(), position: })
		});

		clean = () => {
			cleanMousedown();
			cleanMousemove();
			cleanMouseup();
		};
	});

	onDestroy(() => {
		clean?.();
	});
</script>

<div
	class="rectangle preview"
	class:activating
	style="left: {position.x}px; top: {position.y}px; width: {size.x}px; height: {size.y}px;"
></div>

<div class="flex flex-col bg-red-50">
	<Toolbar />
	<div class="flex-1"></div>
</div>

<div class="editor flex-1" bind:this={editorNode}></div>

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
	}
</style>

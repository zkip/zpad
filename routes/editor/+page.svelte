<script lang="ts">
	import Toolbar from '$components/Toolbar.svelte';
	import { setDefaultContextAction } from '$state/contextmenu';
	import { properties } from '$state/world';
	import { onDestroy, onMount } from 'svelte';
	import { castRectShape } from '$core/Rectangle';
	import { first, firstMust } from '$lib/list';
	import { setViewNode } from '$state/core';
	import RectPreview from '$state/tools/RectPreview.svelte';
	import { preview, selection } from '$state/tools/move';
	import { notNil } from '$lib/asserts';
	import { toolActions, setGlobalCleaners, cleanGlobalTool } from '$state/tools';

	setDefaultContextAction({ removeTool: { show: false } });

	let viewNode: HTMLDivElement;

	onMount(() => {
		setViewNode(viewNode);

		const cleaners = Object.values(toolActions)
			.map((toolAction) => toolAction.global?.())
			.filter(notNil);

		setGlobalCleaners(cleaners);
	});

	onDestroy(() => {
		cleanGlobalTool();
	});
</script>

<RectPreview />

<div class="editor flex-1">
	<div class="flex flex-col bg-red-50 w-full col-start-1 col-end-3">
		<Toolbar />
		<div class="flex-1"></div>
	</div>

	<div class="view col-start-1 col-end-2 row-start-2" bind:this={viewNode}>
		{#each Object.entries($properties) as [id, property]}
			{@const { position, size } = castRectShape(property)}
			<div
				class:focusing={$selection.has(id)}
				class:previewing={$preview === id}
				data-uid={id}
				style:left={`${position.x}px`}
				style:top={`${position.y}px`}
				style:width={`${size.x}px`}
				style:height={`${size.y}px`}
				style:background-color={$properties[id].color}
			></div>
		{/each}
	</div>

	<div class="inspector col-start-2 col-end-3 row-start-2">
		{#if first(Array.from($selection)) && $properties[firstMust(Array.from($selection))]}
			<div>
				<label
					>color: <input bind:value={$properties[firstMust(Array.from($selection))].color} /></label
				>
			</div>
		{/if}
	</div>
</div>

<style lang="postcss">
	.inspector {
		box-shadow: 0 0 5px black;
	}

	:global(body) {
		@apply overflow-hidden select-none;
	}
	.editor {
		grid-template-columns: 1fr auto;
		grid-template-rows: auto 1fr;
		@apply grid;
	}

	.view > :global(*) {
		border: 1px solid rebeccapurple;
		@apply absolute;
		@apply select-none overflow-hidden;
	}

	.view .focusing {
		background-color: red;
	}

	.view .previewing {
		box-shadow: 0 0 2px black;
	}
</style>

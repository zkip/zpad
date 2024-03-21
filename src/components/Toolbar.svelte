<script lang="ts">
	import { onMount } from 'svelte';
	import { focusToolIndex, toolsIcons } from '../stores/core';
	import type { HTMLAttributes } from 'svelte/elements';
	import { isHTMLElement } from '$lib/asserts';

	function remove() {
		if (!currentContext) return;
		const { index } = currentContext;
		toolsIcons.update((icons) => (icons.splice(index, 1), icons));
	}

	let contextDOM: HTMLDivElement;

	if (typeof window !== 'undefined') {
		document.oncontextmenu = () => false;
	}

	if (typeof window !== 'undefined') {
		addEventListener('click', () => {
			contextDOM.style.display = 'none';
			currentContext = undefined;
		});
	}

	onMount(() => {});

	function contextmenu(context: { icon: string; index: number }) {
		contextDOM.style.display = 'block';
		currentContext = context;
	}

	function click({ target }: MouseEvent) {
		if (isHTMLElement(target)) {
			const index = Number(target.getAttribute('data-index'));
			$focusToolIndex = index;
		}
	}

	let currentContext: { icon: string; index: number } | undefined;

	function inactivate() {
		$focusToolIndex = undefined;
	}

	interface $$Props extends HTMLAttributes<HTMLDivElement> {}
</script>

<div {...$$restProps} class="flex bg-slate-500 {$$restProps.class}" on:click={inactivate}>
	{#each $toolsIcons as icon, index}
		<div
			class="flex item justify-center items-center"
			class:activate={index === $focusToolIndex}
			data-index={index}
			on:click|stopPropagation={click}
			on:contextmenu={() => contextmenu({ icon, index })}
		>
			<i class="{icon} text-2xl pointer-events-none" />
		</div>
	{/each}
</div>

<div id="context-menu" bind:this={contextDOM} class="select-none">
	<div on:click={remove}>Remove</div>
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

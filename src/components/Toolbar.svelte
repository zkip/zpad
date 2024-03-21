<script lang="ts">
	import { onMount } from 'svelte';
	import { focusToolIndex, inactivate, toolsIcons } from '../stores/core';
	import type { HTMLAttributes } from 'svelte/elements';
	import { isHTMLElement } from '$lib/asserts';
	import { onlyBrowser } from '$lib/browser';

	function remove() {
		if (!currentContext) return;
		console.log(currentContext, '>>');

		const { index } = currentContext;
		$toolsIcons.splice(index, 1);
		$toolsIcons = $toolsIcons.slice();

		if (index === $focusToolIndex) inactivate();
		
		clearContext();
	}

	let contextNode: HTMLDivElement;

	if (typeof window !== 'undefined') {
		document.oncontextmenu = () => false;
	}

	if (typeof window !== 'undefined') {
		addEventListener(
			'click',
			(event) => {
				const target = event.target as HTMLElement;
				if (target.parentElement === contextNode || target === contextNode) {
					return;
				}
				clearContext();
			},
			{ capture: true }
		);
	}

	onMount(() => {});

	function contextmenu(event: MouseEvent & { currentTarget: EventTarget & HTMLDivElement }) {
		const { currentTarget } = event;
		const index = Number(currentTarget.getAttribute('data-index')) as number;
		const icon = $toolsIcons[index];
		const x = event.clientX,
			y = event.clientY;

		contextNode.style.display = 'block';
		contextNode.style.left = `${x}px`;
		contextNode.style.top = `${y}px`;
		currentContext = { icon, index, position: { x, y } };
	}

	function click({ target }: MouseEvent) {
		if (isHTMLElement(target)) {
			const index = Number(target.getAttribute('data-index'));
			$focusToolIndex = index;
		}
	}

	function clearContext() {
		contextNode.style.display = 'none';
		currentContext = undefined;
	}

	let currentContext:
		| { icon: string; index: number; position?: { x: number; y: number } }
		| undefined;

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
			on:contextmenu={contextmenu}
		>
			<i class="{icon} text-2xl pointer-events-none" />
		</div>
	{/each}
</div>

<div id="context-menu" bind:this={contextNode} class="select-none">
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

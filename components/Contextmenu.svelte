<script lang="ts">
	import { listen } from '$lib/event';
	import {
		ContextDataMap,
		contextData,
		contextVisible,
		contextmenuPosition,
		hiddenContextmenu,
		defaultContextData,
		type ContextDataType
	} from '$state/contextmenu';
	import type { ArgsType, FillMaxArgs } from '$types/function';
	import type { Valueof } from '$types/mapped';
	import { tools } from '$state/tools';
	import { browser } from '$app/environment';
	import { isSameElement } from '$lib/asserts';

	let contextmenuNode: HTMLDivElement;

	if (browser) {
		document.oncontextmenu = () => false;

		// composedPath: [ target, ..., div(svelte special contents block), body, html, document, window ]
		listen(['mousedown'], (event) => {
			const list = event.composedPath().slice(0, -5);
			const inMenu = list.reduceRight<EventTarget | undefined>(
				(result, target) => result || (isSameElement(target, contextmenuNode) ? target : undefined),
				undefined
			);

			!inMenu && hiddenContextmenu(event);
		});

		listen(['keydown'], (event) => event.key === 'Escape' && hiddenContextmenu(event));
	}

	$: left = $contextmenuPosition.x;
	$: top = $contextmenuPosition.y;

	function hiddenAndCall<K extends keyof ContextDataType>(
		action: K,
		...args: ArgsType<ContextDataType[keyof ContextDataType]>
	) {
		hiddenContextmenu();
		ContextDataMap[action](...(args as FillMaxArgs<ArgsType<Valueof<ContextDataType>>>));
	}

	function hiddenIfEnter(event: KeyboardEvent) {
		if (event.key === 'Enter') hiddenContextmenu();
	}

</script>

<div
	class="flex flex-col context-menu activate fixed"
	class:activate={$contextVisible}
	style="left: {left}px; top: {top}px;"
	bind:this={contextmenuNode}
>
	{#each $contextData as { args, action, show = $defaultContextData[action]?.show, disabled = $defaultContextData[action]?.disabled }}
		{#if show && action === 'removeTool'}
			<div class:disabled on:click={() => hiddenAndCall('removeTool', ...args)}>
				<div>Remove tool</div>
			</div>
		{/if}
		{#if show && action === 'updateToolType'}
			{@const [index] = args}
			{#if $tools[index]}
				<div class:disabled>
					<input
						placeholder="type"
						class="bg-transparent outline-none mx-[-12px] px-3"
						bind:value={$tools[index].type}
						on:keydown={hiddenIfEnter}
					/>
				</div>
			{/if}
		{/if}
	{/each}
</div>

<style lang="postcss">
	.disabled {
		color: rebeccapurple;
		font-weight: bold;
	}

	.context-menu {
		box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
		z-index: 10;
		background: white;
		@apply rounded-[5px];
		@apply overflow-hidden;
	}

	.context-menu:not(.activate) {
		display: none;
	}

	.context-menu {
	}

	.context-menu > * {
		@apply px-3 py-0.5;
	}

	.context-menu > :hover {
		@apply bg-slate-400;
	}
</style>

<script lang="ts">
	import { onlyBrowser } from '$lib/browser';
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

	$: finalData = $contextData.map(({ action, args, disabled, show }, index) => ({
		action,
		args,
		show: show ?? $defaultContextData[action]?.show,
		disabled: disabled ?? $defaultContextData[action]?.disabled
	}));

	onlyBrowser(() => (document.oncontextmenu = () => false));
	onlyBrowser(() => listen(['click'], (event) => hiddenContextmenu(event)));
	onlyBrowser(() =>
		listen(['keydown'], (event) => event.key === 'Escape' && hiddenContextmenu(event))
	);

	$: left = $contextmenuPosition.x;
	$: top = $contextmenuPosition.y;

	function callAndHidden<K extends keyof ContextDataType>(
		action: K,
		...args: ArgsType<ContextDataType[keyof ContextDataType]>
	) {
		ContextDataMap[action](...(args as FillMaxArgs<ArgsType<Valueof<ContextDataType>>>));
		hiddenContextmenu();
	}

	function updateToolType() {
		// ContextDataMap.updateToolType();
		hiddenContextmenu();
	}
</script>

<div
	class="flex flex-col gap-2 context-menu activate fixed"
	class:activate={$contextVisible}
	style="left: {left}px; top: {top}px;"
>
	{#each finalData as { args, action, show, disabled }}
		{#if show && action === 'removeTool'}
			<div class:disabled on:click={() => callAndHidden('removeTool', ...args)}>
				<div>Remove tool</div>
			</div>
		{/if}
		{#if show && action === 'updateToolType'}
			{@const [index] = args}
			<div class:disabled>
				<input bind:value={$tools[index].type} />
			</div>
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

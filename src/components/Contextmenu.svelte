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
	} from '../core/contextmenu';
	import type { ArgsType } from '../types/function';

	$: finalData = $contextData.map(({ action, args, disabled, show }, index) => ({
		action,
		args,
		show: show ?? $defaultContextData[index]?.show ?? true,
		disabled: disabled ?? $defaultContextData[index]?.disabled ?? false
	}));

	onlyBrowser(() => (document.oncontextmenu = () => false));
	onlyBrowser(() => listen(['click'], (event) => hiddenContextmenu(event)));
	onlyBrowser(() =>
		listen(['keydown'], (event) => event.key === 'Escape' && hiddenContextmenu(event))
	);

	$: left = $contextmenuPosition.x;
	$: top = $contextmenuPosition.y;

	function callAnHidden<K extends keyof ContextDataType>(
		action: K,
		...args: ArgsType<ContextDataType[keyof ContextDataType]>
	) {
		ContextDataMap[action](...args);
		hiddenContextmenu();
	}
</script>

<div
	class="flex flex-col gap-2 context-menu activate"
	class:activate={$contextVisible}
	style="left: {left}px; top: {top}px;"
>
	{#each finalData as { args, action, show, disabled }}
		{#if show && action === 'removeTools'}
			<div id="context-menu" class="select-none" class:disabled>
				<div on:click={() => callAnHidden('removeTools', ...args)}>Remove tool</div>
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
		display: block;
		/* max-width: 360px; */
		position: absolute;
	}

	.context-menu > * {
		@apply px-3 py-0.5;
	}

	.context-menu > :hover {
		@apply bg-slate-400;
	}
</style>

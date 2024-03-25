<script>
	import { ContextDataMap, contextData, contextVisible, contextmenuPosition, defaultContextData } from '../core/context';

	$: finalData = $contextData.map(({ action, args, disabled, show }, index) => ({
		action,
		args,
		show: show ?? $defaultContextData[index]?.show ?? true,
		disabled: disabled ?? $defaultContextData[index]?.disabled ?? false
	}));

	$: left = $contextmenuPosition.x;
	$: top = $contextmenuPosition.y;
</script>

<div class="flex flex-col gap-2 context-menu activate" class:activate={$contextVisible} style="left: {left}px; top: {top}px;">
	{#each finalData as { args, action, show, disabled }}
		{#if show && action === 'removeTools'}
			<div id="context-menu" class="select-none" class:show class:disabled>
				<div on:click={() => ContextDataMap.removeTools(...args)}>Remove tool</div>
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
		background: rebeccapurple;
	}

	.context-menu:not(.activate) {
		display: none;
	}

	.context-menu {
		display: block;
		/* max-width: 360px; */
		position: absolute;
	}

	.context-menu>:not(.show){
		display: none;
	}
</style>

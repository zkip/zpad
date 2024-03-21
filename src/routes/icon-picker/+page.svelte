<script lang="ts">
	import { onMount } from 'svelte';
	import Toolbar from '../../components/Toolbar.svelte';
	import { focusToolIndex, toolsIcons } from '../../stores/core';

	let surface: HTMLDivElement;

	async function f() {
		const parser = new DOMParser();
		const f = await fetch('icomoon/demo.html');
		const text = await f.text();
		const doc = parser.parseFromString(text, 'text/html');
		const ds = doc.querySelector('body')!;
		const glyphs_fs1 = doc.querySelectorAll('.glyph.fs1>:first-child>:first-child');
		const glyphs_fs2 = doc.querySelectorAll('.glyph.fs2>:first-child>:first-child');
		const fragment = new DocumentFragment();
		fragment.append(...glyphs_fs1);
		fragment.append(...glyphs_fs2);

		const target = document.querySelector('.target')!;
		target.replaceWith(...glyphs_fs1, ...glyphs_fs2);

		surface.addEventListener('click', (e) => {
			if (e.target !== surface) {
				const d = e.target as HTMLSpanElement;
				const icon = d.getAttribute('class')!;
				upsertTool(icon);
			}
		});
	}

	function upsertTool(icon: string) {
		if ($focusToolIndex === undefined) {
			$toolsIcons = [...$toolsIcons, icon];
		} else {
			$toolsIcons[$focusToolIndex] = icon;
		}
	}

	onMount(() => {
		f();
	});
</script>

<div class="flex flex-col">
	<Toolbar class="sticky top-0" />
	<div class="flex flex-wrap gap-2 text-[24px] p-4 surface" bind:this={surface}>
		<div class="target"></div>
	</div>
</div>

<style lang="postcss">
	:global(.surface > :hover) {
		@apply scale-125;
		@apply rounded;

		/* font-size: 12px; */

		/* @apply text-white; */
		/* background: rgb(100 116 139 / 1); */
	}
	:global(.surface > :hover::before) {
		/* @apply scale-50; */
	}
</style>

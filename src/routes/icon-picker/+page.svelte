<script lang="ts">
	import { onMount } from 'svelte';

	let current = 0;
	const tools = [{ class: '' }];

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
	}
	if (typeof window !== 'undefined') {
	}

	onMount(() => {
		f();
	});
</script>

<div class="flex flex-col">
	<div class="flex bg-red-50">
		<div class="flex">
			<i class="icon-chevron-right text-4xl" />
		</div>
	</div>
	<div class="flex flex-wrap gap-2 text-[24px] p-4">
		<div class="target"></div>
	</div>
</div>

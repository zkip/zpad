<script lang="ts">
	import { onMount } from 'svelte';
	import Toolbar from '../../components/Toolbar.svelte';
	import Contextmenu from '../../components/Contextmenu.svelte';
	import { showContextmenu } from '../../core/contextmenu';
	import { upsertTool } from '../../core/tools';

	let surface: HTMLDivElement;

	function showTips(text: string, position: { x: number; y: number }) {
		const template = document.querySelector('.lite-tips') as HTMLDivElement;
		const liveNode = template.cloneNode(true) as HTMLDivElement;
		liveNode.style.display = 'block';

		const cameraLayerNode = document.querySelector('.camera-layer') as HTMLDivElement;

		liveNode.addEventListener('animationend', () => cameraLayerNode.removeChild(liveNode));
		const { x, y } = position;
		liveNode.style.top = `${y}px`;
		liveNode.style.left = `${x}px`;

		cameraLayerNode.appendChild(liveNode);
	}

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

		surface.addEventListener('mousedown', (e) => {
			if (e.target !== surface && e.buttons === 1) {
				const d = e.target as HTMLSpanElement;
				const icon = d.getAttribute('class')!;
				upsertTool(icon);
			}
			if (e.target !== surface && e.buttons === 2) {
				const d = e.target as HTMLSpanElement;
				const icon = d.getAttribute('class')!;
				navigator.clipboard.writeText(icon);
				showTips('已复制', { x: e.clientX, y: e.clientY });
			}
		});
	}

	onMount(() => {
		f();
	});
</script>

<div class="camera-layer absolute"></div>
<div class="lite-tips absolute" style="display: none;">已复制</div>

<div class="flex flex-col">
	<Toolbar class="sticky top-0" />
	<div class="flex flex-wrap gap-2 text-[24px] p-4 surface" bind:this={surface}>
		<div class="target"></div>
	</div>
</div>

<Contextmenu />

<style lang="postcss">
	:global(.surface > :hover) {
		@apply scale-125;
	}

	.camera-layer {
		@apply fixed left-0 right-0 top-0 bottom-0 z-10 pointer-events-none select-none;
	}

	.lite-tips {
		animation: fade-out 0.8s ease-out forwards;
	}

	@keyframes fade-out {
		0% {
			opacity: 1;
			transform: translateY(0);
		}
		100% {
			opacity: 0;
			transform: translateY(-100%);
		}
	}
</style>

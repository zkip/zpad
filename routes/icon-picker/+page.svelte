<script lang="ts">
	import Toolbar from '$components/Toolbar.svelte';
	import { hasFocusLayer, setDefaultContextAction } from '$state/contextmenu';
	import { listen } from '$lib/event';
	import { onlyBrowser } from '$lib/browser';
	import { repeat } from '$lib/list';
	import { upsertTool } from '$state/tools';
	let surface: HTMLDivElement;
	setDefaultContextAction({ removeTool: { show: true }, updateToolType: { show: true } });

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

	async function parseIcomoonDoc(setCounts: number = 0) {
		const parser = new DOMParser();
		const f = await fetch('icomoon/demo.html');
		const text = await f.text();
		const doc = parser.parseFromString(text, 'text/html');
		const ds = doc.querySelector('body')!;
		const glyphs_fs = repeat(setCounts, (i) => `.glyph.fs${i + 1}>:first-child>:first-child`).map(
			(selector) => doc.querySelectorAll(selector)
		);
		const target = document.querySelector('.target')!;
		const fragment = new DocumentFragment();

		for (const glyphs of glyphs_fs) fragment.append(...glyphs);

		target.replaceWith(...fragment.children);

		listen([surface, 'mousedown'], (event) => {
			if (hasFocusLayer(event)) return;
			if (event.target !== surface && event.buttons === 1) {
				const d = event.target as HTMLSpanElement;
				const icon = d.getAttribute('class')!;
				upsertTool(icon);
			}
			if (event.target !== surface && event.buttons === 2) {
				const d = event.target as HTMLSpanElement;
				const icon = d.getAttribute('class')!;
				navigator.clipboard.writeText(icon);
				showTips('已复制', { x: event.clientX, y: event.clientY });
			}
		});
	}

	onlyBrowser(parseIcomoonDoc, 2);
</script>

<div class="camera-layer absolute"></div>
<div class="lite-tips absolute" style="display: none;">已复制</div>

<div class="flex flex-col">
	<Toolbar class="sticky top-0" />
	<div class="flex flex-wrap gap-2 text-[24px] p-4 surface" bind:this={surface}>
		<div class="target"></div>
	</div>
</div>

<style lang="postcss">
	:global(.surface > :hover) {
		@apply scale-125;
	}

	.camera-layer {
		@apply fixed left-0 right-0 top-0 bottom-0 z-[100] pointer-events-none select-none;
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

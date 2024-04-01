<script>
	import { Vector2 } from '$lib/vector';
	import { previewEnd, previewShow, previewStart } from './rect';

	$: position = new Vector2(
		Math.min($previewStart.x, $previewEnd.x),
		Math.min($previewStart.y, $previewEnd.y)
	);
	$: size = new Vector2(
		Math.abs($previewEnd.x - $previewStart.x),
		Math.abs($previewEnd.y - $previewStart.y)
	);
</script>

<div
	class="rectangle preview"
	class:show={$previewShow}
	style="left: {position.x}px; top: {position.y}px; width: {size.x}px; height: {size.y}px;"
></div>

<style>
	.preview {
		border: 1px solid rebeccapurple;
		@apply absolute pointer-events-none;
	}
	.preview:not(.show) {
		display: none;
	}
</style>

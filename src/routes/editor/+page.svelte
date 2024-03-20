<script lang="ts">
	let current = 0;
	const tools = [{ class: '' }];

	async function f() {
		const parser = new DOMParser();
		const f = await fetch('icomoon/demo.html');
		const text = await f.text();
	}
</script>

<div class="flex flex-col bg-red-50">
	<div class="flex">
		<div class="flex">
			<i class="icon-chevron-right text-4xl" />
		</div>
	</div>
	<div class="flex-1"></div>
</div>

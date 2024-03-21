<script lang="ts">
	import Toolbar from '../../components/Toolbar.svelte';

	async function f() {
		const parser = new DOMParser();
		const f = await fetch('icomoon/demo.html');
		const text = await f.text();
	}
</script>

<div class="flex flex-col bg-red-50">
	<Toolbar />
	<div class="flex-1"></div>
</div>

<script lang="ts">
	import {sidePanelRight} from '$lib/stores';
</script>

<div
	bind:clientWidth={$sidePanelRight.width}
	class="grid grid-cols-[auto_1fr] h-full border-l border-surface-500/30 lg:grid w-[300px] overflow-hidden"
	style="margin-right: -{$sidePanelRight.offset}px;"
>
	<section class="p-4 space-y-4 overflow-y-auto">
		<p class="font-bold pl-4 text-2xl">Filter Parameters</p>
	</section>
</div>

<script lang="ts">
	import '../app.postcss';
	import 'svooltip/styles.css'; // Include default styling for svooltip
	import {AppShell, storePopup} from '@skeletonlabs/skeleton';

	// Floating UI for Popups
	import {arrow, autoUpdate, computePosition, flip, offset, shift} from '@floating-ui/dom';
	import RightPanel from '$lib/components/layout/RightPanel.svelte';
	import HeaderBar from '$lib/components/layout/HeaderBar.svelte';

	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
</script>

<AppShell slotSidebarRight="bg-surface-100-800-token lg:w-auto">
	<svelte:fragment slot="header">
		<HeaderBar />
	</svelte:fragment>

	<svelte:fragment slot="sidebarRight">
		<RightPanel />
	</svelte:fragment>

	<!-- Router Slot -->
	<slot />
	<!-- ---- / ---- -->
	<svelte:fragment slot="pageFooter">Page Footer</svelte:fragment>
</AppShell>

<script lang="ts">
	import '../app.postcss';
	import 'svooltip/styles.css'; // Include default styling for svooltip
	import {AppShell, storePopup} from '@skeletonlabs/skeleton';
	import PhGithubLogoFill from '~icons/ph/github-logo-fill';

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
	<svelte:fragment slot="pageFooter">
		<hr class="opacity-20" />
		<div class="w-full max-w-7xl mx-auto p-4 md:py-12 py-4 md:py-8 space-y-4">
			<section
				class="flex flex-col md:flex-row justify-between items-center space-y-5 md:space-y-0 content-center"
			>
				<div
					class="grid grid-cols-1 gap-2 place-content-center place-items-center md:place-items-start"
				>
					<p class="!text-sm opacity-80 font-bold">huggingface-llm-filtering</p>
					<p class="!text-sm opacity-80">
						Tool to quickly view and filter LLM models from a specific user.
					</p>
				</div>
				<a
					class="anchor m-4"
					href="https://github.com/NetroScript/huggingface-llm-filtering/blob/master/LICENSE.md"
					rel="noreferrer"
					target="_blank">MIT License</a
				>
				<a
					class="btn variant-soft m-4"
					href="https://github.com/NetroScript/huggingface-llm-filtering"
					rel="noreferrer"
					target="_blank"
				>
					<span class=""><PhGithubLogoFill class="inline-block mr-2" /> Github</span></a
				>
			</section>
		</div>
	</svelte:fragment>
</AppShell>

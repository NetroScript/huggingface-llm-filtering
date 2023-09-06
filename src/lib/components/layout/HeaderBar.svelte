<script lang="ts">
	import {filterText} from '$lib/stores.js';
	import {AppBar} from '@skeletonlabs/skeleton';
	import PhGearFill from '~icons/ph/gear-fill';
	import PhMagnifyingGlass from '~icons/ph/magnifying-glass';
	import {tooltip} from 'svooltip';

	import {sidePanelRight} from '$lib/stores';
	import type {SidePanel} from '$lib/common';
	import {defaultTooltipOptions} from '$lib/common';

	const ANIMATION_DURATION = 200; // 0.2 seconds in milliseconds

	function animateSidebar(sidepanel: SidePanel, targetOffset: number): void {
		const startTime = performance.now();

		function animate(currentTime: number) {
			const elapsed = currentTime - startTime;
			const fraction = Math.min(1, elapsed / ANIMATION_DURATION);

			// Linearly interpolate between the current and target offsets
			sidepanel.offset = sidepanel.offset + fraction * (targetOffset - sidepanel.offset);

			// Cause svelte reactivity to kick in
			if (sidepanel.side == 'left') {
				// $sidePanelLeft = sidepanel;
			} else {
				$sidePanelRight = sidepanel;
			}

			if (fraction < 1) {
				requestAnimationFrame(animate);
			}
		}

		requestAnimationFrame(animate);
	}

	function toggleSidebarRight(): void {
		const targetOffset = $sidePanelRight.visible ? $sidePanelRight.width : 0;
		animateSidebar($sidePanelRight, targetOffset);

		$sidePanelRight.visible = !$sidePanelRight.visible;
	}
</script>

<AppBar gridColumns="!flex" slotDefault="place-self-center" slotTrail="place-content-end">
	<div class="input-group input-group-divider grid-cols-[auto_1fr_auto] w-full">
		<div class="input-group-shim">
			<PhMagnifyingGlass />
		</div>
		<input bind:value={$filterText} placeholder="Filter by Name" type="search" />
	</div>
	<svelte:fragment slot="trail">
		<button
			class="btn-icon variant-soft-primary variant-soft{$sidePanelRight.visible ? '-primary' : ''}"
			on:click={toggleSidebarRight}
			type="button"
			use:tooltip={Object.assign({}, defaultTooltipOptions, {
				content: 'Toggle Filtering Panel'
			})}
		>
			<PhGearFill />
		</button>
	</svelte:fragment>
</AppBar>

<script lang="ts">
	import { availableLicences, availableModelSizes, forceRefresh, sidePanelRight, state } from '$lib/stores';
	import { ModelTypes, SortingModes } from '$lib/common';
	import PhUserBold from '~icons/ph/user-bold';
	import PhSortAscendingBold from '~icons/ph/sort-ascending-bold';
	import PhSortDescendingBold from '~icons/ph/sort-descending-bold';
	import { ListBox, ListBoxItem } from '@skeletonlabs/skeleton';

	const toggleModelSize = (size: string) => {
		if ($state.filters.allowedModelSizes.includes(size)) {
			$state.filters.allowedModelSizes = $state.filters.allowedModelSizes.filter(
				(s: String) => s !== size
			);
		} else {
			$state.filters.allowedModelSizes = [...$state.filters.allowedModelSizes, size];
		}
	};

	const toggleLicense = (license: string) => {
		if ($state.filters.allowedLicenses.includes(license)) {
			$state.filters.allowedLicenses = $state.filters.allowedLicenses.filter(
				(s: String) => s !== license
			);
		} else {
			$state.filters.allowedLicenses = [...$state.filters.allowedLicenses, license];
		}
	};

	const sortingModeStrings: string[] = Object.values(SortingModes);

</script>

<div
	bind:clientWidth={$sidePanelRight.width}
	class="grid grid-cols-[auto_1fr] h-full border-l border-surface-500/30 lg:grid w-[300px] overflow-hidden"
	style="margin-right: -{$sidePanelRight.offset}px;"
>
	<section class="p-4 space-y-4 overflow-y-auto w-[300px]">
		<p class="font-bold pl-4 text-xl">Model Type</p>
		<select
			bind:value={$state.filters.allowedModelTypes}
			class="select h-[38px] overflow-hidden text-center px-0 py-2 hide-scrollbar space-x-1"
			multiple
			size="1"
		>
			{#each Object.values(ModelTypes) as type}
				<option class="inline !px-2 my-auto" value={type}>{type}</option>
			{/each}
		</select>
		<p class="font-bold pl-4 text-xl">Allowed Model Sizes</p>
		<div class="flex flex-wrap gap-1">
			{#each $availableModelSizes as size, i}
				<span
					class="chip uppercase {$state.filters.allowedModelSizes.includes(size)
						? 'variant-filled'
						: 'variant-soft'}"
					on:click={() => {
						toggleModelSize(size);
					}}
					on:keypress
					aria-label={size}
					role="button"
					tabindex={i}
				>
					{size}
				</span>
			{/each}
		</div>
		<p class="font-bold pl-4 text-xl">Allowed Licenses</p>
		<div class="flex flex-wrap gap-1">
			{#each $availableLicences as license, i}
				<span
					class="chip uppercase {$state.filters.allowedLicences.includes(license)
						? 'variant-filled'
						: 'variant-soft'}"
					on:click={() => {
						toggleModelSize(license);
					}}
					on:keypress
					aria-label={license}
					role="button"
					tabindex={i}
				>
					{license}
				</span>
				{/each}
		</div>
		<p class="font-bold pl-4 text-xl">Utilized Namespace</p>
		<div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
			<div class="input-group-shim"><PhUserBold/></div>
			<input bind:value={$state.author} placeholder="Username or Organisation" type="text" />
		</div>
		<p class="font-bold pl-4 text-xl">Sort results by:</p>

		<ListBox class='grid grid-cols-2 gap-2' spacing=''>
			{#each sortingModeStrings as type}
				<ListBoxItem bind:group={$state.filters.filterMode} value={type} name='sorting' padding='px-2 py-2'>
					<span class='capitalize text-center'>
												{#if type.split("_")[1] == "ASC"}
						<PhSortAscendingBold class='inline'/>
					{:else}
						<PhSortDescendingBold class='inline'/>
					{/if}
						{type.split("_")[0].toLowerCase()}
					</span>

				</ListBoxItem>
			{/each}
		</ListBox>

		<div class='flex items-center'>
			<button class="btn variant-filled-primary text-center mx-auto" disabled='{$forceRefresh}'
							on:click={() => {$forceRefresh = true}} type="button">Force refresh</button>
		</div>

	</section>
</div>

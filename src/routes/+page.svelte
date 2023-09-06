<script lang="ts">
	import { availableLicences, availableModelSizes, filteredModels, forceRefresh, state } from '$lib/stores';
	import { onMount } from 'svelte';
	import type { Model } from '$lib/huggingfaceAPI';
	import { ModelSchema } from '$lib/huggingfaceAPI';
	import ModelCard from '$lib/components/ModelCard.svelte';
	import { ProgressRadial } from '@skeletonlabs/skeleton';
	import InfiniteLoading, { type StateChanger } from 'svelte-infinite-loading';
	import type { LocalStorageValue } from '$lib/common';


	let usedName = $state.author;
	let isLoading = true;

	const updateModels = async () => {
		const res = await fetch('https://huggingface.co/api/models?full=1&author=' + usedName);
		const data = (await res.json()) as any[];

		let models: Model[] = [];

		data.forEach((model) => {
			try {
				const parsed = ModelSchema.safeParse(model);
				if (parsed.success) {
					models.push(parsed.data);
				} else {
					console.error(parsed.error);
				}
			} catch (e) {
				console.error(e);
			}
		});

		// Sort data by newest date by default
		models = models.sort((a, b) => {
			return b.lastModified.getTime() - a.lastModified.getTime();
		});

		$state.models = models;

		isLoading = false;

		$state.lastUpdate = new Date();
	};

	onMount(async () => {
		// Check if our state is newer than 30 minutes
		if (Date.now() - $state.lastUpdate.getTime() > 1000 * 60 * 30) {
			await updateModels();
		} else {
			isLoading = false;
		}

		console.log($state);
		console.log($state.models);
		console.log($availableLicences);
		console.log($availableModelSizes);
	});

	let shownModelCount = 50;
	let loadingIdentifier = 0;

	let updateTimeout: NodeJS.Timeout | undefined;


	// Check if the author changes, if so debounce the change and then update the models
	state.subscribe((newState: LocalStorageValue) => {
		if (newState.author !== usedName) {
			isLoading = true;
			usedName = newState.author;
			if (updateTimeout) {
				clearTimeout(updateTimeout);
			}
			updateTimeout = setTimeout(updateModels, 1000);
		}
	});

	filteredModels.subscribe(() => {
		shownModelCount = 50;
		loadingIdentifier++;
	});

	forceRefresh.subscribe(async (state: boolean) => {
		if (state){
			isLoading = true;
			await updateModels();
			$forceRefresh = false;
		}
	});


	$: currentShownModels = $filteredModels.slice(0, shownModelCount);

	$: canShowMore = $filteredModels.length > shownModelCount;


	const loadMore = async ({detail: {loaded, complete}} : ({detail: StateChanger}) )  => {

		shownModelCount += 50;


		if (shownModelCount >= $filteredModels.length) {
			complete();
		} else {
			loaded();
		}

	}

</script>

<svelte:head>
	<title>Filter HF-LLMs | {$state.author}</title>
	<meta
		content="This website allows you to use more advanced filter options specific to LLaMa-CPP models for LLMs on Huggingface."
		name="description"
	/>
	<meta content="hugginface, llm, llama-cpp, utility" name="keywords" />
</svelte:head>

<div class="py-2 md:p-4 h-full mx-auto justify-center items-center">
	{#if $state.models.length === 0 || isLoading}
		<div class="flex flex-col items-center justify-center w-full m-6 space-y-2">
			<h1 class="text-2xl font-bold">Loading...</h1>
			<p class="text-gray-500">This might take a while</p>
			<ProgressRadial width="w-8 mx-auto" meter="stroke-surface-50" stroke="{150}"/>
		</div>
	{:else}
		<div class="text-center w-full opacity-50">
			{$filteredModels.length} models found.
		</div>
	<div  class="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4 w-full my-6">

			{#each currentShownModels as model, i}
					<ModelCard {model} />
			{/each}

	</div>
	{/if}

	{#if canShowMore && !isLoading}
		<InfiniteLoading on:infinite={loadMore} distance={400} identifier={loadingIdentifier}>
			<div slot="noMore"></div>
		</InfiniteLoading>
		<ProgressRadial width="w-8 mx-auto" meter="stroke-surface-50" stroke="{150}"/>
	{/if}
</div>

import { derived, type Writable, writable } from 'svelte/store';
import type { LocalStorageValue, SidePanel } from './common';
import { getModelSize, getModelType, SortingModes } from './common';

import { localStorageStore } from '@skeletonlabs/skeleton';
import * as devalue from 'devalue';

export const sidePanelRight = writable<SidePanel>({
	width: 300,
	offset: 0,
	visible: true,
	side: 'right'
});

export const state: Writable<LocalStorageValue> = localStorageStore<LocalStorageValue>(
	'state',
	{
		lastUpdate: new Date(0),
		author: 'TheBloke',
		models: [],
		filters: {
			name: '',
			allowedLicences: [],
			allowedModelSizes: [],
			allowedModelTypes: [],
			filterMode: SortingModes.TIME_DESC
		}
	},
	{
		serializer: devalue
	}
);

// Derivative stores

// Extract all possible licences from the models
export const availableLicences = derived(state, ($state) => {
	const licences = new Set<string>();
	$state.models.forEach((model) => {
		model.tags.forEach((tag) => {
			if (tag.startsWith('license:')) {
				licences.add(tag.substring(8));
			}
		});
	});
	// Sort the array based on string length (shortest first)
	return Array.from(licences).sort((a, b) => {
		return a.length - b.length;
	});
});

// Available Model Sizes
export const availableModelSizes = derived(state, ($state) => {
	const modelSizes = new Set<string>();
	$state.models.forEach((model) => {
		modelSizes.add(getModelSize(model));
	});

	// Order the array by size (extract the number from the string)
	return Array.from(modelSizes).sort((a, b) => {
		// If it is not a number, assume infinity
		const aSize = parseInt(a.substring(0, a.length - 1)) || Infinity;
		const bSize = parseInt(b.substring(0, b.length - 1)) || Infinity;
		return aSize - bSize;
	});
});

export const filteredModels = derived(state, ($state) => {
	let filtered = $state.models.filter((model) => {
		// Check the name of the model
		if (
			$state.filters.name !== '' &&
			!model.id.toLowerCase().includes($state.filters.name.toLowerCase())
		) {
			return false;
		}

		// Check the model type
		if ($state.filters.allowedModelTypes.length > 0) {
			if (!$state.filters.allowedModelTypes.includes(getModelType(model))) {
				return false;
			}
		}

		// Check the model size
		if ($state.filters.allowedModelSizes.length > 0) {
			if (!$state.filters.allowedModelSizes.includes(getModelSize(model))) {
				return false;
			}
		}

		return true;
	});

	switch ($state.filters.filterMode) {
		case SortingModes.TIME_ASC:
			filtered = filtered.sort((a, b) => {
				return a.lastModified.getTime() - b.lastModified.getTime();
			});
			break;
		case SortingModes.TIME_DESC:
			filtered = filtered.sort((a, b) => {
				return b.lastModified.getTime() - a.lastModified.getTime();
			});
			break;
		case SortingModes.LIKES_ASC:
			filtered = filtered.sort((a, b) => {
				return a.likes - b.likes;
			});
			break;
		case SortingModes.LIKES_DESC:
			filtered = filtered.sort((a, b) => {
				return b.likes - a.likes;
			});
			break;
		case SortingModes.DOWNLOADS_ASC:
			filtered = filtered.sort((a, b) => {
				return a.downloads - b.downloads;
			});
			break;
		case SortingModes.DOWNLOADS_DESC:
			filtered = filtered.sort((a, b) => {
				return b.downloads - a.downloads;
			});
			break;
	}

	return filtered;
});

export const forceRefresh = writable<boolean>(false);

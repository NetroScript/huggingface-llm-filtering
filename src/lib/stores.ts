import { derived, type Writable, writable } from 'svelte/store';
import type { LocalStorageValue, SidePanel } from './common';
import { FilterModes, getModelSize } from './common';

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
			filterMode: FilterModes.TIME_DESC
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
	return Array.from(licences);
});

// Available Model Sizes
export const availableModelSizes = derived(state, ($state) => {
	const modelSizes = new Set<string>();
	$state.models.forEach((model) => {
		modelSizes.add(getModelSize(model));
	});
	return Array.from(modelSizes);
});

export const filteredModels = derived(state, ($state) => {
	let filtered = $state.models.filter((model) => {
		if (
			$state.filters.name !== '' &&
			!model.id.toLowerCase().includes($state.filters.name.toLowerCase())
		) {
			return false;
		}

		return true;
	});

	switch ($state.filters.filterMode) {
		case FilterModes.TIME_ASC:
			filtered = filtered.sort((a, b) => {
				return a.lastModified.getTime() - b.lastModified.getTime();
			});
			break;
		case FilterModes.TIME_DESC:
			filtered = filtered.sort((a, b) => {
				return b.lastModified.getTime() - a.lastModified.getTime();
			});
			break;
		case FilterModes.LIKES_ASC:
			filtered = filtered.sort((a, b) => {
				return a.likes - b.likes;
			});
			break;
		case FilterModes.LIKES_DESC:
			filtered = filtered.sort((a, b) => {
				return b.likes - a.likes;
			});
			break;
		case FilterModes.DOWNLOADS_ASC:
			filtered = filtered.sort((a, b) => {
				return a.downloads - b.downloads;
			});
			break;
		case FilterModes.DOWNLOADS_DESC:
			filtered = filtered.sort((a, b) => {
				return b.downloads - a.downloads;
			});
			break;
	}

	return filtered;
});

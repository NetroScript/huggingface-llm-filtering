import { type Writable, writable } from 'svelte/store';
import type { LocalStorageValue, SidePanel } from './common';

import { localStorageStore } from '@skeletonlabs/skeleton';
import * as devalue from 'devalue';

export const filterText = writable('');

export const sidePanelRight = writable<SidePanel>({
	width: 300,
	offset: 0,
	visible: true,
	side: 'right'
});

export const state: Writable<LocalStorageValue> = localStorageStore(
	'state',
	{
		lastUpdate: new Date(0),
		author: 'TheBloke',
		models: []
	},
	{
		serializer: devalue
	}
);

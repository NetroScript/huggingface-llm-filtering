import { writable } from 'svelte/store';
import type { SidePanel } from './common';

export const filterText = writable('');

export const sidePanelRight = writable<SidePanel>({
	width: 300,
	offset: 0,
	visible: true,
	side: 'right'
});

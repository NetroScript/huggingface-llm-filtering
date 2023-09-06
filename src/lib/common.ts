import type { Options } from 'svooltip/types';
import type { Model } from '$lib/huggingfaceAPI';

export type SidePanel = {
	width: number;
	offset: number;
	visible: boolean;
	side: 'left' | 'right';
};

export const defaultTooltipOptions: Options = {
	content: 'Tooltip content',
	placement: 'top-start',
	offset: 5,
	classes: {
		container: 'card p-4 variant-filled-secondary absolute tooltip drop-shadow-lg z-50',
		arrow: 'arrow variant-filled-secondary z-40',
		animationEnter: 'svooltip-entering',
		animationLeave: 'svooltip-leaving',
		content: ''
	},
	target: '#tooltips',
	delay: [1000, 0]
};

export type LocalStorageValue = {
	lastUpdate: Date;
	author: string;
	models: Model[];
};

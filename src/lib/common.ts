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

export enum FilterModes {
	TIME_ASC = 'TIME_ASC',
	TIME_DESC = 'TIME_DESC',
	LIKES_ASC = 'LIKES_ASC',
	LIKES_DESC = 'LIKES_DESC',
	DOWNLOADS_ASC = 'DOWNLOADS_ASC',
	DOWNLOADS_DESC = 'DOWNLOADS_DESC'
}

export interface LocalStorageValue {
	lastUpdate: Date;
	author: string;
	models: Model[];
	filters: {
		name: string;
		allowedLicences: string[];
		allowedModelSizes: string[];
		allowedModelTypes: ModelTypes[];
		filterMode: FilterModes;
	};
}

export enum ModelTypes {
	GGML = 'GGML',
	GPTQ = 'GPTQ',
	GGUF = 'GGUF',
	OTHER = 'OTHER'
}

export const getModelType = (model: Model): ModelTypes => {
	// First iterate the siblings to check the files as a main indicator
	// of the model type

	for (const sibling of model.siblings) {
		if (sibling.rfilename.toLowerCase().includes('.ggml')) {
			return ModelTypes.GGML;
		} else if (sibling.rfilename.toLowerCase().includes('.gguf')) {
			return ModelTypes.GGUF;
		}
	}

	// If none of the filenames matched, try the model name instead
	if (model.id.toLowerCase().includes('ggml')) {
		return ModelTypes.GGML;
	} else if (model.id.toLowerCase().includes('gguf')) {
		return ModelTypes.GGUF;
	} else if (model.id.toLowerCase().includes('gptq')) {
		return ModelTypes.GPTQ;
	}

	return ModelTypes.OTHER;
};

export interface QuestionsState {
	createDraft: () => Promise<any>;
	isInitializingDraft: boolean;
	updateDraft: (dto: any) => Promise<any>;
	isUpdatingDraft: boolean;
	publishDraft: (id: string) => Promise<any>;
	isPublishingDraft: boolean;
}

export enum PersonalityDichotomy {
	Energy = 'energy',
	Information = 'information',
	Decisions = 'decisions',
	Lifestyle = 'lifestyle',
}

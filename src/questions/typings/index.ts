export interface QuestionsState {
	createDraft: () => Promise<any>;
	isInitializingDraft: boolean;
}

export enum PersonalityDichotomy {
	Energy = 'energy',
	Information = 'information',
	Decisions = 'decisions',
	Lifestyle = 'lifestyle',
}

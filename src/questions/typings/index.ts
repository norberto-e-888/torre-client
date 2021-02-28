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

export type PersonalityDichotomyPreferencesMap = {
	[Key: string]: PersonalityPreference;
	[PersonalityDichotomy.Energy]: 'e' | 'i';
	[PersonalityDichotomy.Information]: 's' | 'n';
	[PersonalityDichotomy.Decisions]: 't' | 'f';
	[PersonalityDichotomy.Lifestyle]: 'j' | 'p';
};

export type PersonalityPreference =
	| 'e'
	| 'i'
	| 's'
	| 'n'
	| 't'
	| 'f'
	| 'j'
	| 'p';

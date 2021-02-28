export interface QuestionsState {
	createDraft: () => Promise<any>;
	isInitializingDraft: boolean;
}

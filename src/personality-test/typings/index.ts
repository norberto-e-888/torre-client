export interface TestsState {
	createDraft: () => Promise<any>;
	isInitializingDraft: boolean;
	updateDraft: (dto: any) => Promise<any>;
	isUpdatingDraft: boolean;
	publishDraft: (id: string) => Promise<any>;
	isPublishingDraft: boolean;
}

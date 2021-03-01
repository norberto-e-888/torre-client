import React from 'react';
import { createContext, useContext } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import { TestsState } from '../typings';

const TestsContext = createContext<TestsState | undefined>(undefined);

export const TestsProvider: React.FC = ({ children }) => {
	const queryClient = useQueryClient();
	const createDraftMutation = useMutation(() =>
		axios.post('/personality-test')
	);

	const createDraft = async () => {
		const { data } = await createDraftMutation.mutateAsync();
		queryClient.setQueryData(['test', data.id], data);
		return data;
	};

	const updateDraftMutation = useMutation((dto: any) =>
		axios.patch(`/personality-test/${dto.id}/update`, dto.updates)
	);

	const updateDraft = async (dto: any) => {
		const { data } = await updateDraftMutation.mutateAsync(dto);
		queryClient.setQueryData(['test', data.id], data);
		return data;
	};

	const publishDraftMutation = useMutation((id: string) =>
		axios.patch(`/personality-test/${id}/publish`)
	);

	const publishDraft = async (id: string) => {
		const { data } = await publishDraftMutation.mutateAsync(id);
		queryClient.setQueryData(['test', data.id], data);
		return data;
	};

	return (
		<TestsContext.Provider
			value={{
				createDraft,
				isInitializingDraft: createDraftMutation.isLoading,
				updateDraft,
				isUpdatingDraft: updateDraftMutation.isLoading,
				publishDraft,
				isPublishingDraft: publishDraftMutation.isLoading,
			}}
		>
			{children}
		</TestsContext.Provider>
	);
};

export const useTests = () => useContext(TestsContext) as TestsState;

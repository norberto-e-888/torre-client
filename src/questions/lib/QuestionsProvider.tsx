import React from 'react';
import { createContext, useContext } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import { QuestionsState } from '../typings';

const QuestionsContext = createContext<QuestionsState | undefined>(undefined);

export const QuestionsProvider: React.FC = ({ children }) => {
	const queryClient = useQueryClient();
	const createDraftMutation = useMutation(() =>
		axios.post('/personality-test-question')
	);

	const createDraft = async () => {
		const { data } = await createDraftMutation.mutateAsync();
		queryClient.setQueryData(['question', data.id], data);
		return data;
	};

	const updateDraftMutation = useMutation((dto: any) =>
		axios.patch(`/personality-test-question/${dto.id}/update`, dto.updates)
	);

	const updateDraft = async (dto: any) => {
		const { data } = await updateDraftMutation.mutateAsync(dto);
		queryClient.setQueryData(['question', data.id], data);
		return data;
	};

	const publishDraftMutation = useMutation((id: string) =>
		axios.patch(`/personality-test-question/${id}/publish`)
	);

	const publishDraft = async (id: string) => {
		try {
			const { data } = await publishDraftMutation.mutateAsync(id);
			queryClient.setQueryData(['question', data.id], data);
			return data;
		} catch (error) {
			throw error;
		}
	};

	return (
		<QuestionsContext.Provider
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
		</QuestionsContext.Provider>
	);
};

export const useQuestions = () =>
	useContext(QuestionsContext) as QuestionsState;

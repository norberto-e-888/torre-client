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

	return (
		<QuestionsContext.Provider
			value={{
				createDraft,
				isInitializingDraft: createDraftMutation.isLoading,
			}}
		>
			{children}
		</QuestionsContext.Provider>
	);
};

export const useQuestions = () =>
	useContext(QuestionsContext) as QuestionsState;

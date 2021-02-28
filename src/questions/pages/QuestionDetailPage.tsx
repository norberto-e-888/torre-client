import React from 'react';
import { useQuery } from 'react-query';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import Page from '../../lib/components/Page';
import QuestionForm from '../components/QuestionForm';
import { Heading, Spinner } from '@chakra-ui/react';
import { useQuestions } from '../lib/QuestionsProvider';

const QuestionDetailPage: React.FC = () => {
	const history = useHistory();
	const questions = useQuestions();
	const params = useParams() as any;
	const { data, isLoading } = useQuery(
		['question', params.questionId],
		async () => {
			try {
				const response = await axios.get(
					`/personality-test-question/${params.questionId}`
				);

				return response.data;
			} catch (error) {
				history.replace('/questions');
				return null;
			}
		}
	);

	return (
		<Page>
			{isLoading ? (
				<Spinner />
			) : (
				<>
					<Heading>
						Question Draft{' '}
						{(questions.isUpdatingDraft || questions.isPublishingDraft) && (
							<Spinner />
						)}
					</Heading>
					{data.isDraft ? (
						<QuestionForm question={data} />
					) : (
						<p>Display {data.prompt}</p>
					)}
				</>
			)}
		</Page>
	);
};

export default QuestionDetailPage;

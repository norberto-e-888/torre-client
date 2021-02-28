import React from 'react';
import { useQuery } from 'react-query';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import Page from '../../lib/components/Page';
import QuestionForm from '../components/QuestionForm';
import { Spinner } from '@chakra-ui/react';

const QuestionCollaborationPage: React.FC = () => {
	const history = useHistory();
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
				history.push('/questions');
				return null;
			}
		}
	);

	console.log(data.id);
	return <Page>{isLoading ? <Spinner /> : <QuestionForm />}</Page>;
};

export default QuestionCollaborationPage;

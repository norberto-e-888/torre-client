import React from 'react';
import { useQuery } from 'react-query';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import Page from '../../lib/components/Page';
import Test from '../components/Test';
import { Heading } from '@chakra-ui/react';
import { useAuth } from '../../auth/lib/AuthProvider';

const TakeTestPage: React.FC = () => {
	const params = useParams() as any;
	const history = useHistory();
	const { user } = useAuth();
	const { data: test, isLoading } = useQuery(
		['isTestAssignedToUser', params.testId],
		async () => {
			try {
				const response = await axios.get(
					'/assignment/assigned-test/' + params.testId
				);
				return response.data;
			} catch (error) {
				history.replace('/assignments');
				return null;
			}
		}
	);

	const testId = test?._id;
	const userId = user?.id;
	const {
		data: wasItAlreadyTaken,
		isLoading: isLoadingWasTestAlreadyTaken,
	} = useQuery(
		['hasUserTakenTest', testId],
		async () => {
			try {
				const response = await axios.get(
					`/personality-test/${test._id}/has-it-been-taken-by-me`
				);

				return response.data;
			} catch (error) {
				history.replace('/assignments');
			}
		},
		{ enabled: !!testId }
	);

	const { data: results } = useQuery(
		['results', testId, userId],
		async () => {
			try {
				const response = await axios.get(
					`/personality-test-result/get-user-results/${testId}/${userId}`
				);

				return response.data;
			} catch (error) {
				return null;
			}
		},
		{
			enabled: !!testId && !!userId,
		}
	);

	return (
		<Page>
			<Heading fontWeight="medium">{test?.alias}</Heading>
			{!isLoading &&
				!isLoadingWasTestAlreadyTaken &&
				test &&
				(!wasItAlreadyTaken ? (
					<Test test={test} />
				) : (
					results && (
						<a
							target="_blank"
							href={`https://www.16personalities.com/${results.personalityType}-personality`}
							rel="noreferrer"
						>
							Personality Type:{' '}
							<strong>{results.personalityType.toUpperCase()}</strong>
						</a>
					)
				))}
		</Page>
	);
};

export default TakeTestPage;

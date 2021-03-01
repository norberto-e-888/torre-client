import React from 'react';
import { useQuery } from 'react-query';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import Page from '../../lib/components/Page';
import { Heading, Spinner } from '@chakra-ui/react';
import { useTests } from '../lib/TestsProvider';

const TestDetailPage: React.FC = () => {
	const history = useHistory();
	const test = useTests();
	const params = useParams() as any;
	const { data, isLoading } = useQuery(['test', params.testId], async () => {
		try {
			const response = await axios.get(`/personality-test/${params.testId}`);

			return response.data;
		} catch (error) {
			history.replace('/testt');
			return null;
		}
	});

	return (
		<Page>
			{isLoading ? (
				<Spinner />
			) : (
				<>
					{data.isDraft ? (
						<>
							<Heading>
								Test Draft{' '}
								{(test.isUpdatingDraft || test.isPublishingDraft) && (
									<Spinner />
								)}
							</Heading>
							test form for {data.createdBy}
						</>
					) : (
						<>
							<Heading>Published Test</Heading>
							test display
						</>
					)}
				</>
			)}
		</Page>
	);
};

export default TestDetailPage;

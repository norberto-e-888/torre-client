import React from 'react';
import { useQuery } from 'react-query';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import Page from '../../lib/components/Page';
import Test from '../components/Test';
import { Heading } from '@chakra-ui/react';

const TakeTestPage: React.FC = () => {
	const params = useParams() as any;
	const history = useHistory();
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

	return (
		<Page>
			<Heading fontWeight="medium">{test?.alias}</Heading>
			{!isLoading && test && <Test test={test} />}
		</Page>
	);
};

export default TakeTestPage;

import React from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import Page from '../../lib/components/Page';
import Assignment from '../components/Assignment';

const AssignmentsListPage: React.FC = () => {
	const { data, isLoading } = useQuery('assignments', async function () {
		try {
			const response = await axios.get('/assignment');
			return response.data;
		} catch (error) {
			return null;
		}
	});

	return (
		<Page>
			{!isLoading &&
				data &&
				(data.data as any[]).map((assignment) => (
					<Assignment assignment={assignment} key={assignment._id} />
				))}
		</Page>
	);
};

export default AssignmentsListPage;

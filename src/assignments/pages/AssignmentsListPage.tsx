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
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					gap: '0.5rem',
				}}
			>
				{!isLoading && data ? (
					(data.data as any[]).map((assignment) => (
						<Assignment assignment={assignment} key={assignment._id} />
					))
				) : (
					<p>No assignments yet</p>
				)}
			</div>
		</Page>
	);
};

export default AssignmentsListPage;

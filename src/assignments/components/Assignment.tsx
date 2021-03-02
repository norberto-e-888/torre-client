import React from 'react';
import { Heading, Text } from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';

interface Props {
	assignment: any;
}

const Assignment: React.FC<Props> = ({ assignment }) => {
	const history = useHistory();
	const adminName = `${assignment.assignedBy?.name?.first} ${assignment.assignedBy?.name?.last}`;
	const isAnonymus = adminName.trim().length === 8;
	return (
		<div>
			<Heading fontWeight="medium" fontSize="1.5rem">
				{!isAnonymus ? 'Anonymus admin' : adminName}
			</Heading>
			<Text>
				{' '}
				has assigned to you:{' '}
				<strong
					style={{ cursor: 'pointer' }}
					onClick={(e) => {
						e.preventDefault();
						history.push(`/tests/${assignment.test._id}/take`);
					}}
				>
					{assignment.test.alias}
				</strong>
			</Text>
		</div>
	);
};

export default Assignment;

import { IconButton } from '@chakra-ui/react';
import React from 'react';
import { CgRemove } from 'react-icons/cg';

interface Props {
	question: any;
	remove: any;
	index: number;
}

const QuestionOption: React.FC<Props> = ({
	remove,
	index,
	question: { id, answer, points, dichotomyPreference },
}) => (
	<div
		key={id}
		style={{
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'space-between',
			marginTop: '0.5rem',
		}}
	>
		<p>{answer}</p>
		<p>Points: {points}</p>
		<p>Preference: {dichotomyPreference}</p>
		<IconButton
			icon={<CgRemove />}
			aria-label="remove option"
			onClick={() => {
				remove(index);
			}}
		></IconButton>
	</div>
);

export default QuestionOption;

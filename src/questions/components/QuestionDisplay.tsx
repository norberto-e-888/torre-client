import { Box, Heading, Select } from '@chakra-ui/react';
import React from 'react';

interface Props {
	question: any;
}

const QuestionDisplay: React.FC<Props> = ({ question }) => {
	return (
		<Box>
			<Heading>{question.prompt}</Heading>
			<Select style={{ marginTop: '0.5rem' }}>
				{(question.options as any[]).map(({ answer, id }) => (
					<option key={id} value={id}>
						{answer}
					</option>
				))}
			</Select>
		</Box>
	);
};

export default QuestionDisplay;

import { Box, Heading, Select, Text } from '@chakra-ui/react';
import React from 'react';

interface Props {
	question: any;
}

const QuestionDisplay: React.FC<Props> = ({ question }) => {
	return (
		<Box>
			<Heading fontSize="1.5rem" fontWeight="medium">
				Dichotomy: {question.dichotomy}
			</Heading>
			<Text>{question.prompt}</Text>
			<Select style={{ marginTop: '0.5rem' }}>
				{(question.options as any[]).map(
					({ answer, id, points, dichotomyPreference }) => (
						<option key={id} value={id}>
							{answer} ({points} points for {dichotomyPreference})
						</option>
					)
				)}
			</Select>
		</Box>
	);
};

export default QuestionDisplay;

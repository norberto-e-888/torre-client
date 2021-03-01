import {
	Accordion,
	AccordionButton,
	AccordionIcon,
	AccordionItem,
	AccordionPanel,
	Box,
	Heading,
} from '@chakra-ui/react';
import React, { useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { capitalize } from '../../lib/util';

interface Props {
	test: any;
}

const TestDetail: React.FC<Props> = ({ test }) => {
	const history = useHistory();
	const groupedQuestions = useMemo(() => {
		return (test.questions as any[]).reduce((groups, question) => {
			groups[question.dichotomy] = groups[question.dichotomy] || [];
			groups[question.dichotomy].push(question);
			return groups;
		}, {});
	}, [test.questions]);

	return (
		<>
			<Heading fontSize="2rem" fontWeight="medium">
				{test.alias}
			</Heading>
			<Accordion allowToggle width="35rem">
				{Object.entries(groupedQuestions).map(([dichotomy, questions]) => (
					<AccordionItem key={dichotomy}>
						<h2>
							<AccordionButton>
								<Box
									flex="1"
									textAlign="left"
									style={{
										fontWeight: 'bold',
									}}
								>
									{capitalize(dichotomy)}
								</Box>
								<AccordionIcon />
							</AccordionButton>
						</h2>
						<AccordionPanel pb={4}>
							<ul>
								{(questions as any[]).map((q) => (
									<li
										style={{
											cursor: 'pointer',
											marginLeft: '0.5rem',
										}}
										onClick={(e) => {
											e.preventDefault();
											history.push(`/questions/${q.id}`);
										}}
									>
										{q.prompt}
									</li>
								))}
							</ul>
						</AccordionPanel>
					</AccordionItem>
				))}
			</Accordion>
		</>
	);
};

export default TestDetail;

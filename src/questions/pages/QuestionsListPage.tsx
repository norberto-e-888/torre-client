import React from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import {
	Accordion,
	AccordionButton,
	AccordionIcon,
	AccordionItem,
	AccordionPanel,
	Box,
	Heading,
} from '@chakra-ui/react';
import Page from '../../lib/components/Page';
import { useHistory } from 'react-router-dom';

const QuestionsListPage: React.FC = () => {
	const history = useHistory();
	const { data, isLoading } = useQuery('questions', async () => {
		try {
			const response = await axios.get('/personality-test-question');
			const groupedQuestions = (response.data.data as any[]).reduce(
				(groups, test) => {
					if (test.isDraft) {
						groups.drafts.push(test);
					} else {
						groups.published.push(test);
					}

					return groups;
				},
				{
					drafts: [],
					published: [],
				}
			);

			return {
				groupedQuestions,
				total: response.data.total,
			};
		} catch (error) {
			return null;
		}
	});

	return (
		<Page>
			<Heading fontWeight="medium">Questions</Heading>
			<div style={{ gap: 0 }}>
				{!isLoading &&
					data &&
					Object.entries(data.groupedQuestions).map(([category, questions]) => (
						<Accordion allowToggle width="30rem" key={category}>
							<AccordionItem>
								<h2>
									<AccordionButton>
										<Box
											flex="1"
											textAlign="left"
											style={{
												fontWeight: 'bold',
											}}
										>
											{category}
										</Box>
										<AccordionIcon />
									</AccordionButton>
								</h2>
								<AccordionPanel pb={4}>
									<ul>
										{(questions as any[])
											.sort((a, b) => (a.dichotomy > b.dichotomy ? 1 : -1))
											.map(
												({
													_id,
													prompt = 'No prompt',
													dichotomy = 'No dichotomy',
													options = [],
												}) => (
													<li
														onClick={(e) => {
															e.preventDefault();
															history.push(`/questions/${_id}`);
														}}
														style={{ marginLeft: '0.5rem', cursor: 'pointer' }}
														key={_id}
													>
														{prompt} (<strong>{dichotomy}</strong>,{' '}
														{options.length}{' '}
														{options.length === 1 ? 'option' : 'options'})
													</li>
												)
											)}
									</ul>
								</AccordionPanel>
							</AccordionItem>
						</Accordion>
					))}
			</div>
		</Page>
	);
};

export default QuestionsListPage;

import React from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
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
import { capitalize } from '../../lib/util';

const TestsListPage: React.FC = () => {
	const history = useHistory();
	const { data: testsData, isLoading } = useQuery('tests', async () => {
		try {
			const response = await axios.get('/personality-test');
			const groupedTests = (response.data.data as any[]).reduce(
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
				groupedTests,
				total: response.data.total,
			};
		} catch (error) {
			return null;
		}
	});

	return (
		<Page>
			{testsData && <Heading fontWeight="medium">Tests</Heading>}
			<div style={{ gap: 0 }}>
				{!isLoading && testsData ? (
					Object.entries(testsData.groupedTests).map(([category, tests]) => (
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
											{capitalize(category)}
										</Box>
										<AccordionIcon />
									</AccordionButton>
								</h2>
								<AccordionPanel pb={4}>
									<ul>
										{(tests as any[]).map(({ alias = 'Unaliased', _id }) => (
											<li
												key={_id}
												style={{
													cursor: 'pointer',
												}}
												onClick={(e) => {
													e.preventDefault();
													history.push(`/tests/${_id}`);
												}}
											>
												{alias}
											</li>
										))}
									</ul>
								</AccordionPanel>
							</AccordionItem>
						</Accordion>
					))
				) : (
					<p>No tests yet</p>
				)}
			</div>
		</Page>
	);
};

export default TestsListPage;

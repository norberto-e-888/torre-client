import { AtSignIcon } from '@chakra-ui/icons';
import {
	Accordion,
	AccordionButton,
	AccordionIcon,
	AccordionItem,
	AccordionPanel,
	Box,
	Button,
	FormControl,
	FormLabel,
	Heading,
	Input,
	InputGroup,
	InputLeftElement,
	useToast,
} from '@chakra-ui/react';
import React, { useMemo, useState } from 'react';
import { useMutation } from 'react-query';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { capitalize } from '../../lib/util';

interface Props {
	test: any;
}

const TestDetail: React.FC<Props> = ({ test }) => {
	const history = useHistory();
	const toast = useToast();
	const [emailToAssignTestTo, setEmailToAssignTestTo] = useState('');
	const groupedQuestions = useMemo(() => {
		return (test.questions as any[]).reduce((groups, question) => {
			groups[question.dichotomy] = groups[question.dichotomy] || [];
			groups[question.dichotomy].push(question);
			return groups;
		}, {});
	}, [test.questions]);

	const assignmentMutation = useMutation(({ test, email }: any) =>
		axios.post(`/assignment/assign-by-email/${test}/${email}`)
	);

	const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		setEmailToAssignTestTo(e.target.value);
	};

	const handleSubmit = async (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		e.preventDefault();
		try {
			const response = await assignmentMutation.mutateAsync({
				test: test._id,
				email: emailToAssignTestTo,
			});

			console.log(response.data);
			toast({
				title: 'Successful assignment',
				status: 'success',
				description: `"${emailToAssignTestTo}" has been assigned "${test.alias}"`,
				position: 'top',
			});

			setEmailToAssignTestTo('');
		} catch (error) {
			toast({
				title: 'An error has occurred',
				status: 'error',
				position: 'top',
			});
		}
	};

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
										key={q._id}
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
			<FormControl id="email">
				<FormLabel>User's email to assign test to</FormLabel>
				<InputGroup>
					<InputLeftElement pointerEvents="none" children={<AtSignIcon />} />
					<Input
						type="text"
						placeholder="Assign to..."
						name="email"
						autoComplete="off"
						value={emailToAssignTestTo}
						onChange={handleEmailChange}
					/>
				</InputGroup>
			</FormControl>
			<Button onClick={handleSubmit}>Assign</Button>
		</>
	);
};

export default TestDetail;

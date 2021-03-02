import { Button, Select } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import axios from 'axios';
import { useAuth } from '../../auth/lib/AuthProvider';

interface Props {
	test: any;
}

interface Answer {
	question: string;
	optionId: string;
}

function findSelectedOption(questionId: string, answers: Answer[]) {
	const answer = answers.find(({ question }) => question === questionId);
	if (!answer) {
		return '';
	}

	return answer.optionId;
}

const Test: React.FC<Props> = ({ test }) => {
	const { user } = useAuth();
	const localStorageKey = `answers-${test.id}-${user.id}`;
	const [answers, setAnswers] = useState<Answer[]>(
		JSON.parse(localStorage.getItem(localStorageKey) || '[]')
	);

	const createResultMutation = useMutation(
		({ answers, test }: { answers: Answer[]; test: string }) =>
			axios.post('/personality-test-result', {
				test,
				answers,
			})
	);

	const handleOption = (
		e: React.ChangeEvent<HTMLSelectElement>,
		questionId: string
	) => {
		e.preventDefault();
		setAnswers((current) => {
			const answerIndex = current.findIndex(
				({ question }) => question === questionId
			);

			if (answerIndex === -1) {
				return [
					...current,
					{
						question: questionId,
						optionId: e.target.value,
					},
				];
			}

			return [
				...current.slice(0, answerIndex),
				{
					question: questionId,
					optionId: e.target.value,
				},
				...current.slice(answerIndex + 1),
			];
		});
	};

	const handleSubmitAnswers = async () => {
		const { data } = await createResultMutation.mutateAsync({
			answers,
			test: test._id,
		});

		console.log(data);
	};

	useEffect(() => {
		localStorage.setItem(localStorageKey, JSON.stringify(answers));
	}, [answers, localStorageKey]);

	return (
		<>
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					gap: '1rem',
					overflow: 'scroll',
				}}
			>
				{(test.questions as any[]).map(({ prompt, _id, options }) => (
					<div key={_id}>
						<p>
							<strong>{prompt}</strong>
						</p>
						<Select
							placeholder="Answer..."
							onChange={(e) => {
								handleOption(e, _id);
							}}
							value={findSelectedOption(_id, answers)}
						>
							{(options as any[]).map(({ id, answer }) => (
								<option value={id} key={id}>
									{answer}
								</option>
							))}
						</Select>
					</div>
				))}
			</div>
			<Button
				onClick={handleSubmitAnswers}
				disabled={
					answers.length !== test.questions.length ||
					createResultMutation.isLoading
				}
			>
				{createResultMutation.isLoading ? 'Sending' : 'Send'}
			</Button>
		</>
	);
};

export default Test;

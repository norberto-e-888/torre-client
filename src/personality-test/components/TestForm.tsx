import {
	Button,
	Checkbox,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Input,
	InputGroup,
	Stack,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { useTests } from '../lib/TestsProvider';

const validationSchema = yup.object().shape({
	alias: yup
		.string()
		.required('alias is required')
		.min(3, 'must be at least 3 characters long')
		.trim(),
});

interface Props {
	test: any;
	questions: any[];
}

const TestForm: React.FC<Props> = ({ test, questions }) => {
	const tests = useTests();
	const {
		register,
		handleSubmit,
		errors,
		formState,
		getValues,
		reset,
	} = useForm({
		mode: 'onSubmit',
		resolver: yupResolver(validationSchema),
		defaultValues: {
			alias: test.alias,
		},
	});

	const [selectedQuestions, setSelectedQuestions] = useState<any[]>(
		test.questions
	);

	const onUpdateDraft = () => {
		tests.updateDraft({
			id: test.id,
			updates: {
				...getValues(),
				questions: selectedQuestions,
			},
		});
	};

	const onPublishDraft = async () => {
		await tests.publishDraft(test.id);
		reset({
			alias: '',
		});
	};

	const handleQuestionCheck = (isChecked: boolean, id: string) => {
		if (isChecked) {
			if (!selectedQuestions.includes(id)) {
				setSelectedQuestions((current) => [...current, id]);
			}
		} else {
			setSelectedQuestions((current) =>
				current.filter((q: any) => q.id === id)
			);
		}
	};

	return (
		<>
			<Stack width="30rem" spacing="1rem">
				<FormControl
					id="alias"
					isRequired
					isInvalid={!!errors.alias && formState.touched.alias}
				>
					<FormLabel>Alias</FormLabel>
					<InputGroup>
						<Input
							type="text"
							placeholder="Give the test an alias"
							name="alias"
							ref={register}
							autoComplete="off"
						/>
					</InputGroup>
					<FormErrorMessage>{errors.alias?.message}</FormErrorMessage>
				</FormControl>
				<FormControl id="alias" isRequired isInvalid={questions.length < 10}>
					<FormLabel>Questions</FormLabel>
					<InputGroup
						style={{
							display: 'flex',
							flexDirection: 'column',
						}}
					>
						{questions.map((q) => {
							console.log(selectedQuestions.includes(q._id));
							return (
								<span
									key={q._id}
									style={{
										display: 'flex',
										alignItems: 'center',
										gap: '0.5rem',
									}}
								>
									<Checkbox
										key={q._id}
										isChecked={selectedQuestions.includes(q._id)}
										onChange={(e) => {
											e.preventDefault();
											handleQuestionCheck(e.target.checked, q._id);
										}}
									/>
									{q.prompt} ({q.dichotomy})
								</span>
							);
						})}
					</InputGroup>
					<FormErrorMessage>
						A test must have at least 10 questions
					</FormErrorMessage>
				</FormControl>
				<Button
					type="button"
					disabled={tests.isUpdatingDraft}
					onClick={() => {
						// doing it like this to allow for invalid values to be sent
						// as it is only a draft
						onUpdateDraft();
					}}
				>
					Update Test
				</Button>
				<Button
					type="button"
					disabled={tests.isPublishingDraft}
					colorScheme="blue"
					onClick={handleSubmit(onPublishDraft)}
				>
					Publish Test
				</Button>
			</Stack>
		</>
	);
};

export default TestForm;

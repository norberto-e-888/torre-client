import {
	Button,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Input,
	InputGroup,
	Select,
	Stack,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { useQuestions } from '../lib/QuestionsProvider';
import { PersonalityDichotomy } from '../typings';

const validationSchema = yup.object().shape({
	prompt: yup
		.string()
		.required('prompt is required')
		.min(10, 'must be at least 10 characters long')
		.trim(),
	dichotomy: yup
		.string()
		.oneOf(Object.values(PersonalityDichotomy))
		.required('dichotomy is required'),
});

interface Props {
	question: any;
}

const QuestionForm: React.FC<Props> = ({ question }) => {
	const questions = useQuestions();
	const { register, handleSubmit, errors, formState, getValues } = useForm({
		mode: 'onChange',
		resolver: yupResolver(validationSchema),
		defaultValues: {
			prompt: question.prompt,
			dichotomy: question.dichotomy,
		},
	});

	const onUpdateDraft = () => {
		questions.updateDraft({ id: question.id, updates: getValues() });
	};

	const onPublishDraft = () => {
		questions.publishDraft(question.id);
	};

	return (
		<form noValidate>
			<Stack width="20rem" spacing="1rem">
				<FormControl
					id="prompt"
					isRequired
					isInvalid={!!errors.prompt && formState.touched.prompt}
				>
					<FormLabel>Prompt</FormLabel>
					<InputGroup>
						<Input
							type="text"
							placeholder="What the user will be prompted"
							name="prompt"
							ref={register}
							autoComplete="off"
						/>
					</InputGroup>
					<FormErrorMessage>{errors.prompt?.message}</FormErrorMessage>
				</FormControl>
				<FormControl
					id="dichotomy"
					isRequired
					isInvalid={!!errors.dichotomy && formState.touched.dichotomy}
				>
					<FormLabel>Dichotomy</FormLabel>
					<InputGroup>
						<Select ref={register} name="dichotomy" placeholder="Select...">
							<option value={PersonalityDichotomy.Energy}>Energy</option>
							<option value={PersonalityDichotomy.Decisions}>Decisions</option>
							<option value={PersonalityDichotomy.Information}>
								Information
							</option>
							<option value={PersonalityDichotomy.Lifestyle}>Lifestyle</option>
						</Select>
					</InputGroup>
					<FormErrorMessage>{errors.dichotomy?.message}</FormErrorMessage>
				</FormControl>
				<Button
					type="button"
					disabled={questions.isUpdatingDraft}
					onClick={() => {
						// doing it like this to allow for invalid values to be sent
						// as it is only a draft
						onUpdateDraft();
					}}
				>
					Update{' '}
				</Button>
				<Button
					type="button"
					disabled={!formState.isValid || questions.isPublishingDraft}
					colorScheme="blue"
					onClick={handleSubmit(onPublishDraft)}
				>
					Publish{' '}
				</Button>
			</Stack>
		</form>
	);
};

export default QuestionForm;

import {
	Accordion,
	AccordionButton,
	AccordionIcon,
	AccordionItem,
	AccordionPanel,
	Box,
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
import { useFieldArray, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { useQuestions } from '../lib/QuestionsProvider';
import { PersonalityDichotomy } from '../typings';
import QuestionOption from './QuestionOption';
import QuestionOptionForm from './QuestionOptionForm';

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
	const {
		register,
		handleSubmit,
		errors,
		formState,
		getValues,
		control,
		watch,
		reset,
	} = useForm({
		mode: 'onChange',
		resolver: yupResolver(validationSchema),
		defaultValues: {
			prompt: question.prompt,
			dichotomy: question.dichotomy || PersonalityDichotomy.Energy,
			options: question.options,
		},
	});

	const { fields, append, remove } = useFieldArray({
		control,
		name: 'options',
		keyName: 'key',
	});

	const dichotomy = watch('dichotomy');
	const onUpdateDraft = () => {
		questions.updateDraft({
			id: question.id,
			updates: {
				...getValues(),
				options: fields,
			},
		});
	};

	const onPublishDraft = async () => {
		await questions.publishDraft(question.id);
		reset({
			prompt: '',
			dichotomy: PersonalityDichotomy.Energy,
			options: [],
		});
	};

	return (
		<>
			<Stack width="30rem" spacing="1rem">
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
						<Select ref={register} name="dichotomy">
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
				<FormControl id="options" isRequired>
					<FormLabel>Options</FormLabel>
					{fields.map((value, index) => (
						<QuestionOption
							key={index}
							question={value}
							index={index}
							remove={remove}
						/>
					))}
				</FormControl>
				<Accordion allowToggle>
					<AccordionItem>
						<h2>
							<AccordionButton>
								<Box flex="1" textAlign="left">
									Add Option
								</Box>
								<AccordionIcon />
							</AccordionButton>
						</h2>
						<AccordionPanel pb={4}>
							<QuestionOptionForm
								append={append}
								dichotomy={dichotomy || PersonalityDichotomy.Energy}
							/>
						</AccordionPanel>
					</AccordionItem>
				</Accordion>
				<Button
					type="button"
					disabled={questions.isUpdatingDraft}
					onClick={() => {
						// doing it like this to allow for invalid values to be sent
						// as it is only a draft
						onUpdateDraft();
					}}
				>
					Update Question
				</Button>
				<Button
					type="button"
					disabled={
						!formState.isValid ||
						questions.isPublishingDraft ||
						fields.length < 2
					}
					colorScheme="blue"
					onClick={handleSubmit(onPublishDraft)}
				>
					Publish Question
				</Button>
			</Stack>
		</>
	);
};

export default QuestionForm;

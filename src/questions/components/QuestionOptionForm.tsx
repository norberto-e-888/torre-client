import {
	Button,
	FormControl,
	FormLabel,
	Input,
	InputGroup,
	Select,
	Stack,
} from '@chakra-ui/react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { PERSONALITY_DICHOTOMY_TO_PREFERENCES_MAP } from '../constants';
import { PersonalityDichotomy } from '../typings';

interface Props {
	append: Function;
	dichotomy: PersonalityDichotomy;
}

const QuestionOptionForm: React.FC<Props> = ({ append, dichotomy }) => {
	const { register, handleSubmit, reset } = useForm();
	const onSubmit = (data: any) => {
		append(data);
		reset({
			answer: '',
			points: '',
			dichotomyPreference: '',
		});
	};

	return (
		<>
			<Stack spacing="1rem">
				<FormControl isRequired style={{ marginTop: '1rem' }}>
					<FormLabel>Option Answer</FormLabel>
					<InputGroup>
						<Input name="answer" ref={register} />
					</InputGroup>
				</FormControl>
				<FormControl isRequired style={{ marginTop: '1rem' }}>
					<FormLabel>Option Points</FormLabel>
					<InputGroup>
						<Input name="points" type="number" ref={register} />
					</InputGroup>
				</FormControl>
				<FormControl isRequired style={{ marginTop: '1rem' }}>
					<FormLabel>Option Preference</FormLabel>
					<InputGroup>
						<Select
							name="dichotomyPreference"
							ref={register}
							placeholder="Select..."
						>
							{PERSONALITY_DICHOTOMY_TO_PREFERENCES_MAP[dichotomy].map(
								([value, word]) => (
									<option key={value} value={value}>
										{word}
									</option>
								)
							)}
						</Select>
					</InputGroup>
				</FormControl>
			</Stack>
			<Button
				type="button"
				onClick={handleSubmit(onSubmit)}
				style={{ marginTop: '1rem' }}
			>
				Add
			</Button>
		</>
	);
};

export default QuestionOptionForm;

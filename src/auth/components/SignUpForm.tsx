import React from 'react';
import { EmailIcon, LockIcon } from '@chakra-ui/icons';
import {
	Input,
	InputGroup,
	InputLeftElement,
	Stack,
	Button,
	FormErrorMessage,
	FormControl,
	FormLabel,
	Spinner,
	useToast,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../lib/AuthProvider';

const validationSchema = yup.object().shape({
	email: yup
		.string()
		.required('Email is required')
		.email('Invalid email address'),
	password: yup
		.string()
		.min(8, 'Must be at least 8 characters long')
		.max(24, "Can't have more than 24 characters"),
	passwordConfirm: yup.string(),
});

const SignUpForm: React.FC = () => {
	const toast = useToast();
	const history = useHistory();
	const auth = useAuth();
	const { register, handleSubmit, errors, watch, formState } = useForm({
		mode: 'onChange',
		resolver: yupResolver(validationSchema),
	});

	const onSubmit = async (data: any) => {
		try {
			await auth.signUp(data);
			history.replace('/tests');
		} catch (error) {
			toast({
				title: 'Error',
				description: error.response.data.message || 'Server error',
				status: 'error',
				duration: 10000,
				isClosable: true,
				position: 'top',
			});
		}
	};

	const passwords = watch(['password', 'passwordConfirm']);
	return (
		<form onSubmit={handleSubmit(onSubmit)} noValidate>
			<Stack width="20rem" spacing="1rem">
				<FormControl
					id="email"
					isInvalid={!!errors.email && formState.touched.email}
					isRequired
				>
					<FormLabel>Email</FormLabel>
					<InputGroup>
						<InputLeftElement
							pointerEvents="none"
							children={<EmailIcon color="gray.300" />}
						/>
						<Input
							type="email"
							placeholder="Your email"
							name="email"
							ref={register}
							autoComplete="email"
						/>
					</InputGroup>
					<FormErrorMessage>{errors.email?.message}</FormErrorMessage>
				</FormControl>
				<FormControl
					id="password"
					isInvalid={!!errors.password && formState.touched.password}
					isRequired
				>
					<FormLabel>Password</FormLabel>
					<InputGroup>
						<InputLeftElement
							pointerEvents="none"
							children={<LockIcon color="gray.300" />}
						/>
						<Input
							type="password"
							placeholder="Choose a password"
							name="password"
							ref={register}
							autoComplete="password"
						/>
					</InputGroup>
					<FormErrorMessage>{errors.password?.message}</FormErrorMessage>
				</FormControl>
				<FormControl
					id="passwordConfirm"
					isInvalid={
						passwords.password !== passwords.passwordConfirm &&
						formState.dirtyFields.passwordConfirm
					}
					isRequired
				>
					<FormLabel>Confirm password</FormLabel>
					<InputGroup>
						<InputLeftElement
							pointerEvents="none"
							children={<LockIcon color="gray.300" />}
						/>
						<Input
							type="password"
							placeholder="Confirm your password"
							name="passwordConfirm"
							ref={register}
							autoComplete="off"
						/>
					</InputGroup>
					<FormErrorMessage>Passwords must match</FormErrorMessage>
				</FormControl>
				<Button
					type="submit"
					disabled={
						passwords.password !== passwords.passwordConfirm ||
						!formState.isValid ||
						auth.isSignUpLoading
					}
				>
					Sign Up{' '}
					{auth.isSignUpLoading && <Spinner style={{ marginLeft: '1rem' }} />}
				</Button>
			</Stack>
		</form>
	);
};

export default SignUpForm;

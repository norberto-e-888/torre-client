import React from 'react';
import { LockIcon } from '@chakra-ui/icons';
import {
	Button,
	FormControl,
	FormLabel,
	Input,
	InputGroup,
	InputLeftElement,
	Spinner,
	Stack,
	useToast,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { FaUser } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../lib/AuthProvider';

const SignInForm: React.FC = () => {
	const toast = useToast();
	const history = useHistory();
	const auth = useAuth();
	const { register, handleSubmit } = useForm();
	const onSubmit = async (data: any) => {
		try {
			await auth.signIn(data);
			history.replace('/tests');
		} catch (error) {
			toast({
				title: 'Error',
				description: error.response?.data?.message || 'Server error',
				status: 'error',
				duration: 3000,
				isClosable: true,
				position: 'top',
			});
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Stack width="20rem" spacing="1rem">
				<FormControl id="email">
					<FormLabel>Email</FormLabel>
					<InputGroup>
						<InputLeftElement pointerEvents="none" children={<FaUser />} />
						<Input
							type="text"
							placeholder="Your email address"
							name="email"
							ref={register}
							autoComplete="email"
						/>
					</InputGroup>
				</FormControl>
				<FormControl id="password">
					<FormLabel>Password</FormLabel>
					<InputGroup>
						<InputLeftElement pointerEvents="none" children={<LockIcon />} />
						<Input
							type="password"
							placeholder="Enter your password"
							name="password"
							ref={register}
							autoComplete="current-password"
						/>
					</InputGroup>
				</FormControl>
				<Button type="submit" disabled={auth.isSignInLoading}>
					Sign In{' '}
					{auth.isSignInLoading && <Spinner style={{ marginLeft: '1rem' }} />}
				</Button>
			</Stack>
		</form>
	);
};

export default SignInForm;

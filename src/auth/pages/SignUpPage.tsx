import React from 'react';
import { Center, Heading, Icon, Text } from '@chakra-ui/react';
import { LockIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';
import SignUpForm from '../components/SignUpForm';

const SignUpPage: React.FC = () => (
	<Center className="center-vertically">
		<Heading className="page-header">
			New Account <Icon as={LockIcon} color="#1DA1F2" />
		</Heading>
		<SignUpForm />
		<Text>
			Already have an account?{' '}
			<Link to={{ pathname: '/sign-in' }}>
				<strong style={{ cursor: 'pointer' }}>Sign in</strong>
			</Link>
		</Text>
	</Center>
);

export default SignUpPage;

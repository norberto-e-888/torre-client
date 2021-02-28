import React from 'react';
import { Heading, Icon, Text } from '@chakra-ui/react';
import { LockIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';
import SignUpForm from '../components/SignUpForm';
import Page from '../../lib/components/Page';

const SignUpPage: React.FC = () => (
	<Page>
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
	</Page>
);

export default SignUpPage;

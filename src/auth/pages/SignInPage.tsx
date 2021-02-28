import { Heading, Icon, Text } from '@chakra-ui/react';
import { UnlockIcon } from '@chakra-ui/icons';
import React from 'react';
import { Link } from 'react-router-dom';
import SignInForm from '../components/SignInForm';
import Page from '../../lib/components/Page';

const SignInPage: React.FC = () => (
	<Page>
		<Heading className="page-header">
			Enter <Icon as={UnlockIcon} color="#1DA1F2" />
		</Heading>
		<SignInForm />
		<Text>
			Don't have an account?{' '}
			<Link to={{ pathname: '/sign-up' }}>
				<strong style={{ cursor: 'pointer' }}>Sign up</strong>
			</Link>
		</Text>
	</Page>
);

export default SignInPage;

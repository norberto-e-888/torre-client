import { Center, Spinner } from '@chakra-ui/react';
import React from 'react';
import { useAuth } from '../auth/lib/AuthProvider';
import { AuthState } from '../auth/typings';
import Nav from '../lib/components/Nav';
import AdminApp from './AdminApp';
import EnduserApp from './EnduserApp';
import UnauthenticatedApp from './UnauthenticatedApp';

const App: React.FC = () => {
	const authState = useAuth();
	const getApp = ({ user, isUserLoading, isSignOutLoading }: AuthState) => {
		if (isUserLoading || isSignOutLoading) {
			return (
				<Center className="center-vertically">
					<Spinner />
				</Center>
			);
		}

		if (!user) {
			return <UnauthenticatedApp />;
		}

		switch (user.role) {
			case 'superadmin':
				return <AdminApp />;

			case 'admin':
				return <AdminApp />;

			case 'enduser':
				return <EnduserApp />;

			default:
				throw Error(`Invalid user role "${user.role}"`);
		}
	};

	return (
		<Center className="center-vertically">
			<Nav />
			{getApp(authState)}
		</Center>
	);
};

export default App;

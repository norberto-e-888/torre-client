import { Center, Spinner } from '@chakra-ui/react';
import React from 'react';
import { useAuth } from '../auth/lib/AuthProvider';
import { AuthState } from '../auth/typings';
import AdminApp from './AdminApp';
import EnduserApp from './EnduserApp';
import UnauthenticatedApp from './UnauthenticatedApp';

const App: React.FC = () => {
	const { user, isUserLoading } = useAuth() as AuthState;
	const getRootComponent = (user: any) => {
		if (isUserLoading) {
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

	return getRootComponent(user);
};

export default App;

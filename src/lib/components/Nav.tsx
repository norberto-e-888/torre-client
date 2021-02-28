import React from 'react';
import { useAuth } from '../../auth/lib/AuthProvider';
import { AuthState } from '../../auth/typings';
import { ColorModeSwitcher } from '../../ColorModeSwitcher';
import AdminActionsMenu from './AdminActionsMenu';
import EnduserActionsMenu from './EnduserActionsMenu';

const Nav: React.FC = () => {
	const authState = useAuth();
	const getActionMenu = ({ user, isUserLoading }: AuthState) => {
		if (isUserLoading || !user) {
			return null;
		}

		switch (user.role) {
			case 'enduser':
				return <EnduserActionsMenu />;

			case 'admin':
				return <AdminActionsMenu />;

			case 'superadmin':
				return <AdminActionsMenu />;

			default:
				throw Error(`Invalid user role "${user.role}"`);
		}
	};

	return (
		<div
			style={{
				display: 'flex',
				justifyContent: 'space-between',
				width: '100%',
				padding: '0.5rem',
				alignItems: 'center',
			}}
		>
			<ColorModeSwitcher />
			{getActionMenu(authState)}
		</div>
	);
};

export default Nav;

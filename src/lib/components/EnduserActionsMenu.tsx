import React from 'react';
import { HamburgerIcon } from '@chakra-ui/icons';
import {
	Icon,
	IconButton,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
} from '@chakra-ui/react';
import { BiLogOut } from 'react-icons/bi';
import { BsCardChecklist } from 'react-icons/bs';
import { useAuth } from '../../auth/lib/AuthProvider';
import { useHistory } from 'react-router-dom';

const EnduserActionsMenu: React.FC = () => {
	const authState = useAuth();
	const history = useHistory();
	return (
		<Menu>
			<MenuButton
				as={IconButton}
				aria-label="Options"
				icon={<HamburgerIcon />}
				size="xs"
				variant="outline"
			/>

			<MenuList>
				<MenuItem
					onClick={() => {
						history.push('/assignments');
					}}
					icon={<Icon boxSize={3.5} as={BsCardChecklist} />}
				>
					Assignments
				</MenuItem>
				<MenuItem
					onClick={() => authState.signOut()}
					icon={<Icon boxSize={3.5} as={BiLogOut} />}
				>
					Log out
				</MenuItem>
			</MenuList>
		</Menu>
	);
};

export default EnduserActionsMenu;

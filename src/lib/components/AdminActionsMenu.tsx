import React from 'react';
import { AddIcon, HamburgerIcon } from '@chakra-ui/icons';
import {
	Icon,
	IconButton,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
} from '@chakra-ui/react';
import { BiLogOut } from 'react-icons/bi';
import { RiChatNewLine } from 'react-icons/ri';
import { useAuth } from '../../auth/lib/AuthProvider';

const AdminActionsMenu: React.FC = () => {
	const authState = useAuth();
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
				<MenuItem icon={<AddIcon />}>New test</MenuItem>
				<MenuItem icon={<Icon boxSize={3.5} as={RiChatNewLine} />}>
					New Question
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

export default AdminActionsMenu;

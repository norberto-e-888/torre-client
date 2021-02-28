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
import { HiClipboardList } from 'react-icons/hi';
import { useAuth } from '../../auth/lib/AuthProvider';
import { useHistory } from 'react-router-dom';

const AdminActionsMenu: React.FC = () => {
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
					onClick={() => history.push('/tests')}
					icon={<Icon boxSize={3.5} as={HiClipboardList} />}
				>
					Tests list
				</MenuItem>
				<MenuItem icon={<AddIcon />}>New test</MenuItem>
				<MenuItem
					onClick={() => history.push('/questions/collaboration/someId')}
					icon={<Icon boxSize={3.5} as={RiChatNewLine} />}
				>
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

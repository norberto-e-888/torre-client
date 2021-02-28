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
import { RiChatNewLine, RiQuestionAnswerLine } from 'react-icons/ri';
import { HiOutlineClipboardList, HiOutlineClipboardCopy } from 'react-icons/hi';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../auth/lib/AuthProvider';
import { useQuestions } from '../../questions/lib/QuestionsProvider';

const AdminActionsMenu: React.FC = () => {
	const authState = useAuth();
	const questionsState = useQuestions();
	const history = useHistory();

	const handleCreateQuestionDraft = async (
		e: React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
	) => {
		e.preventDefault();
		const questionDraft = await questionsState.createDraft();
		history.push(`/questions/${questionDraft.id}`);
	};

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
					icon={<Icon boxSize={3.5} as={HiOutlineClipboardList} />}
				>
					Tests List
				</MenuItem>
				<MenuItem icon={<Icon boxSize={3.5} as={HiOutlineClipboardCopy} />}>
					New Test
				</MenuItem>
				<MenuItem
					onClick={() => history.push('/questions')}
					icon={<Icon boxSize={3.5} as={RiQuestionAnswerLine} />}
				>
					Questions List
				</MenuItem>
				<MenuItem
					onClick={handleCreateQuestionDraft}
					icon={<Icon boxSize={3.5} as={RiChatNewLine} />}
				>
					New Question
				</MenuItem>
				<MenuItem
					onClick={() => authState.signOut()}
					icon={<Icon boxSize={3.5} as={BiLogOut} />}
				>
					Log Out
				</MenuItem>
			</MenuList>
		</Menu>
	);
};

export default AdminActionsMenu;

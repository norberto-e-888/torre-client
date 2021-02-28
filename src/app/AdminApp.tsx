import { Spinner, Text } from '@chakra-ui/react';
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Page from '../lib/components/Page';
import TestsListPage from '../personality-test/pages/TestsListPage';
import { useQuestions } from '../questions/lib/QuestionsProvider';
import QuestionCollaborationPage from '../questions/pages/QuestionCollaborationPage';

const AdminApp: React.FC = () => {
	const questionsState = useQuestions();
	if (questionsState.isInitializingDraft) {
		return (
			<Page>
				<Spinner />
				<Text>Initializing question draft...</Text>
			</Page>
		);
	}

	return (
		<Switch>
			<Route path="/tests" exact>
				<TestsListPage />
			</Route>
			<Route path="/tests/:testId" exact>
				Test detail
			</Route>
			<Route path="/questions" exact>
				Questions list
			</Route>
			<Route path="/questions/collaboration/:questionId" exact>
				<QuestionCollaborationPage />
			</Route>
			<Redirect to="/tests" />
		</Switch>
	);
};

export default AdminApp;

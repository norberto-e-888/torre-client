import { Spinner, Text } from '@chakra-ui/react';
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Page from '../lib/components/Page';
import TestDetailPage from '../personality-test/pages/TestDetailPage';
import TestsListPage from '../personality-test/pages/TestsListPage';
import { useQuestions } from '../questions/lib/QuestionsProvider';
import QuestionDetailPage from '../questions/pages/QuestionDetailPage';
import QuestionsListPage from '../questions/pages/QuestionsListPage';

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
				<TestDetailPage />
			</Route>
			<Route path="/questions" exact>
				<QuestionsListPage />
			</Route>
			<Route path="/questions/:questionId" exact>
				<QuestionDetailPage />
			</Route>
			<Redirect to="/tests" />
		</Switch>
	);
};

export default AdminApp;

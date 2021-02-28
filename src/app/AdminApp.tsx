import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import TestsListPage from '../personality-test/pages/TestsListPage';
import QuestionCollaborationPage from '../questions/pages/QuestionCollaborationPage';

const AdminApp: React.FC = () => (
	<Switch>
		<Route path="/tests" exact>
			<TestsListPage />
		</Route>
		<Route path="/tests/:id" exact>
			Test detail
		</Route>
		<Route path="/questions" exact>
			Questions list
		</Route>
		<Route path="/questions/collaboration/:id" exact>
			<QuestionCollaborationPage />
		</Route>
		<Redirect to="/tests" />
	</Switch>
);

export default AdminApp;

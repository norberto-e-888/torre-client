import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import AssignmentsListPage from '../assignments/pages/AssignmentsListPage';
import Page from '../lib/components/Page';

const EnduserApp: React.FC = () => (
	<Switch>
		<Route path="/tests/:testId/take" exact>
			<Page>Assignment</Page>
		</Route>
		<Route path="/assignments" exact>
			<AssignmentsListPage />
		</Route>
		<Route>
			<Redirect to="/assignments" />
		</Route>
	</Switch>
);

export default EnduserApp;

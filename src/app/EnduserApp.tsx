import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import AssignmentsListPage from '../assignments/pages/AssignmentsListPage';
import TakeTestPage from '../personality-test/pages/TakeTestPage';

const EnduserApp: React.FC = () => (
	<Switch>
		<Route path="/tests/:testId/take" exact>
			<TakeTestPage />
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

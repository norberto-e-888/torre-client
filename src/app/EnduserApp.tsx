import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import TestsListPage from '../personality-test/pages/TestsListPage';

const EnduserApp: React.FC = () => (
	<Switch>
		<Route path="/tests" exact>
			<TestsListPage />
		</Route>
		<Route path="/tests/new" exact>
			New test
		</Route>
		<Route path="/tests/:testId/take" exact>
			Take test
		</Route>
		<Route>
			<Redirect to="/tests" />
		</Route>
	</Switch>
);

export default EnduserApp;

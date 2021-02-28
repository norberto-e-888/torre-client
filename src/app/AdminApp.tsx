import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import TestsListPage from '../personality-test/pages/TestsListPage';

const AdminApp: React.FC = () => (
	<Switch>
		<Route path="/tests" exact>
			<TestsListPage />
		</Route>
		<Route path="/tests/:id" exact>
			<TestsListPage />
		</Route>
		<Route path="/questions" exact>
			Questions list
		</Route>
		<Redirect to="/tests" />
	</Switch>
);

export default AdminApp;

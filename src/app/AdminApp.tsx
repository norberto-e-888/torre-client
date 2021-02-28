import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const AdminApp: React.FC = () => (
	<Switch>
		<Route path="/tests/new" exact>
			<p>New test</p>
		</Route>
		<Route path="/tests" exact>
			<p>Tests list</p>
		</Route>
		<Redirect to="/tests" />
	</Switch>
);

export default AdminApp;

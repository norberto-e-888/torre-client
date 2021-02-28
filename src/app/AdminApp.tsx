import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const AdminApp: React.FC = () => (
	<Switch>
		<Route path="/test/list" exact>
			<p>Tests list</p>
		</Route>
		<Route path="/test/new" exact>
			<p>New test</p>
		</Route>
		<Redirect to="/test/list" />
	</Switch>
);

export default AdminApp;

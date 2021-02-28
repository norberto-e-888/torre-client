import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const EnduserApp: React.FC = () => (
	<Switch>
		<Route path="/test/list" exact>
			<p>Tests list</p>
		</Route>
		<Route path="/test/take/:id" exact>
			<p>Take test</p>
		</Route>
		<Redirect to="/test/list" />
	</Switch>
);

export default EnduserApp;

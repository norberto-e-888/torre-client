import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const EnduserApp: React.FC = () => (
	<Switch>
		<Route path="/tests" exact>
			<p>Tests list</p>
		</Route>
		<Route path="/tests/:id/take" exact>
			<p>Take test</p>
		</Route>
		<Route>
			<Redirect to="/tests" />
		</Route>
	</Switch>
);

export default EnduserApp;

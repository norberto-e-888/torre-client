import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const UnauthenticatedApp: React.FC = () => (
	<Switch>
		<Route path="/sign-up" exact>
			<p>Sign up</p>
		</Route>
		<Route path="/sign-in" exact>
			<p>Sign in</p>
		</Route>
		<Redirect to="/sign-in" />
	</Switch>
);

export default UnauthenticatedApp;

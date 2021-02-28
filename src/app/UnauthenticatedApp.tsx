import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import SignInPage from '../auth/pages/SignInPage';
import SignUpPage from '../auth/pages/SignUpPage';

const UnauthenticatedApp: React.FC = () => (
	<Switch>
		<Route path="/sign-up" exact>
			<SignUpPage />
		</Route>
		<Route path="/sign-in" exact>
			<SignInPage />
		</Route>
		<Redirect to="/sign-in" />
	</Switch>
);

export default UnauthenticatedApp;

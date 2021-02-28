import { ChakraProvider, ColorModeScript, theme } from '@chakra-ui/react';
import * as React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import axios from 'axios';
import reportWebVitals from './reportWebVitals';
import * as serviceWorker from './serviceWorker';
import { AuthProvider } from './auth/lib/AuthProvider';
import App from './app/App';
import './global.css';

axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://localhost:3001';

const queryClient = new QueryClient();

ReactDOM.render(
	<React.StrictMode>
		<ColorModeScript />
		<Router>
			<QueryClientProvider client={queryClient}>
				<AuthProvider>
					<ChakraProvider theme={theme}>
						<App />
					</ChakraProvider>
				</AuthProvider>
			</QueryClientProvider>
		</Router>
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

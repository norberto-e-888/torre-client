import * as React from 'react';
import { ChakraProvider, Box, Grid, theme } from '@chakra-ui/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import axios from 'axios';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import App from './app/App';
import { AuthProvider } from './auth/lib/AuthProvider';

axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://localhost:3001';

const queryClient = new QueryClient();

export const RootApp = () => (
	<Router>
		<QueryClientProvider client={queryClient}>
			<AuthProvider>
				<ChakraProvider theme={theme}>
					<Box textAlign="center" fontSize="xl">
						<Grid minH="100vh" p={3}>
							<ColorModeSwitcher justifySelf="flex-end" />
							<App />
						</Grid>
					</Box>
				</ChakraProvider>
			</AuthProvider>
		</QueryClientProvider>
	</Router>
);

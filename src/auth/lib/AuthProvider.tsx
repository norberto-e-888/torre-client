import React from 'react';
import { createContext, useContext } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import axios from 'axios';
import { AuthState } from '../typings';
import { useHistory } from 'react-router-dom';

const AuthContext = createContext<AuthState | undefined>(undefined);

export const AuthProvider: React.FC = ({ children }) => {
	const history = useHistory();
	const queryClient = useQueryClient();
	const userQuery = useQuery('user', async () => {
		try {
			const response = await axios.get('/auth/current-user');
			return response.data;
		} catch (error) {
			return null;
		}
	});

	const signUpMutation = useMutation((dto: any) =>
		axios.post('/auth/sign-up', dto)
	);

	const signInMutation = useMutation(async (dto: any) =>
		axios.post('/auth/sign-in', dto)
	);

	const signOutMutation = useMutation(async () => {
		await axios.patch('/auth/sign-out');
		queryClient.removeQueries('user', { exact: true });
		history.replace('/sign-in');
	});

	const signUp = async (dto: any) => {
		const { data } = await signUpMutation.mutateAsync(dto);
		queryClient.setQueryData('user', data);
	};

	const signIn = async (dto: any) => {
		const { data } = await signInMutation.mutateAsync(dto);
		queryClient.setQueryData('user', data);
	};

	const signOut = async () => {
		await signOutMutation.mutateAsync();
	};

	return (
		<AuthContext.Provider
			value={{
				signIn,
				signUp,
				signOut,
				user: userQuery.data,
				isAuthenticated: !!userQuery.data,
				isUserLoading: userQuery.isLoading,
				isSignUpLoading: signUpMutation.isLoading,
				isSignInLoading: signInMutation.isLoading,
				isSignOutLoading: signOutMutation.isLoading,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext) as AuthState;

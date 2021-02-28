import React from 'react';
import { createContext, useContext } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import axios from 'axios';
import { AuthState } from '../typings';

const AuthContext = createContext<AuthState | undefined>(undefined);

export const AuthProvider: React.FC = ({ children }) => {
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

	const signOutMutation = useMutation(() => axios.patch('/auth/sign-out'));

	const signUp = async (dto: any) => {
		const { data } = await signUpMutation.mutateAsync(dto);
		queryClient.setQueryData('user', data);
	};

	const signIn = async (dto: any) => {
		const { data } = await signInMutation.mutateAsync(dto);
		queryClient.setQueryData('user', data);
	};

	const signOut = async (dto: any) => {
		queryClient.removeQueries('user');
		await signOutMutation.mutateAsync(dto);
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

export const useAuth = () => useContext(AuthContext);

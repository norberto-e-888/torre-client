export interface AuthState {
	signUp: (dto: any) => Promise<void>;
	signIn: (dto: any) => Promise<void>;
	signOut: (dto: any) => Promise<void>;
	user?: any;
	isAuthenticated: boolean;
	isUserLoading: boolean;
	isSignUpLoading: boolean;
	isSignInLoading: boolean;
	isSignOutLoading: boolean;
}

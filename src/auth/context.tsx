import React from 'react';
import { CognitoUser } from '@aws-amplify/auth';

import { SignInInput } from './types';

interface AuthState {
  user: CognitoUser | null;
  signIn(input: SignInInput): Promise<void>;
  signOut(): Promise<void>;
  deleteUser(): Promise<void>;
}

const AuthContext = React.createContext<AuthState>({
  user: null,
  signIn: async () => {},
  signOut: async () => {},
  deleteUser: async () => {},
});

export default AuthContext;

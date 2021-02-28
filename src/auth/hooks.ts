import React from 'react';
import Auth, { CognitoUser } from '@aws-amplify/auth';

import {
  ConfirmSignUpInput,
  ForgotPasswordInput,
  ResendSignUpInput,
  ResetPasswordInput,
  SignInInput,
  SignUpInput,
} from './types';
import AuthContext from './context';

export function useAuth() {
  const [user, setUser] = React.useState<CognitoUser | null>(null);

  React.useEffect(() => {
    let active = true;

    const check = async () => {
      try {
        const currentUser = await Auth.currentAuthenticatedUser();
        // const jwt = await (await Auth.currentSession()).getIdToken().getJwtToken();
        setUser(currentUser);
      } catch (error) {
        if (active) setUser(null);
      }
    };

    check();

    return () => {
      active = false;
    };
  }, [setUser]);

  const signIn = React.useCallback(
    async ({ email, password }: SignInInput) => {
      setUser(await Auth.signIn(email, password));
    },
    [setUser],
  );

  const signOut = React.useCallback(async () => {
    await Auth.signOut();
    setUser(null);
  }, [setUser]);

  const deleteUser = React.useCallback(async () => {
    user?.deleteUser((error?: Error) => {
      if (error) throw error;

      setUser(null);
    });
  }, [user, setUser]);

  return { user, signIn, signOut, deleteUser };
}

export function useUser() {
  const { user } = React.useContext(AuthContext);
  if (!user) return null;

  // See https://github.com/aws-amplify/amplify-js/issues/4927
  // @ts-ignore
  return user.attributes;
}

export function useJwtToken() {
  return async function getJwtToken() {
    await (await Auth.currentSession()).getIdToken().getJwtToken();
  };
}

export function useSignIn() {
  return React.useContext(AuthContext).signIn;
}

export function useSignOut() {
  return React.useContext(AuthContext).signOut;
}

export function useSignUp() {
  return async function signUp({ name, email, password }: SignUpInput) {
    await Auth.signUp({ username: email, password, attributes: { name, email } });
  };
}

export function useConfirmSignUp() {
  return async function confirmSignUp({ email, code }: ConfirmSignUpInput) {
    await Auth.confirmSignUp(email, code);
  };
}

export function useResendSignUp() {
  return async function resendSignUp({ email }: ResendSignUpInput) {
    await Auth.resendSignUp(email);
  };
}

export function useForgotPassword() {
  return async function forgotPassword({ email }: ForgotPasswordInput) {
    await Auth.forgotPassword(email);
  };
}

export function useResetPassword() {
  return async function resetPassword({ email, code, password }: ResetPasswordInput) {
    await Auth.forgotPasswordSubmit(email, code, password);
  };
}

export function useDeleteUser() {
  return React.useContext(AuthContext).deleteUser;
}

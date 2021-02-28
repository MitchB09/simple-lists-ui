import React from 'react';
import AuthContext from './context';

import { useAuth } from './hooks';

interface AuthProps {
  children: React.ReactNode;
}

const AuthProvider = ({ children }: AuthProps) => {
  const auth = useAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

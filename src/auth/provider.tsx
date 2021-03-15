import Auth from '@aws-amplify/auth';
import React, { useEffect, useState } from 'react';
import api from '../api';
import AuthContext from './context';

import { useAuth } from './hooks';

interface AuthProps {
  children: React.ReactNode;
}

const AuthProvider = ({ children }: AuthProps) => {
  const [loaded, setLoaded] = useState<boolean>(false);
  const auth = useAuth();

  useEffect(() => {
    const getAuthHeader = async () => {
      try {
        const session = await Auth.currentSession();
        const jwt = session.getIdToken().getJwtToken();

        api.interceptors.request.use((config) => {
          const authConfig = { ...config };
          authConfig.headers.Authorization = `${jwt}`;
          return authConfig;
        });
        setLoaded(true);
      } catch (error) {
        console.dir(error);
      }
    };
    getAuthHeader();
  }, []);

  return <AuthContext.Provider value={auth}>{loaded && children}</AuthContext.Provider>;
};

export default AuthProvider;

import { useEffect, useState } from 'react';
import { getCookie } from 'cookies-next';

export const useOAuthLogin = () => {
  const loginWithGoogle = () => {
    const redirectBase = window.location.origin;
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}auth/google?redirect_uri=${redirectBase}`;
  };

  const loginWithGitHub = () => {
    const redirectBase = window.location.origin;
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}auth/github?redirect_uri=${redirectBase}`;
  };
  return { loginWithGoogle, loginWithGitHub };
};

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    const token = getCookie('token');
    setIsAuthenticated(!!token);
  }, [isAuthenticated]);

  return { isAuthenticated };
};

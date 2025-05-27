'use client';

export const useOAuthLogin = () => {
  const loginWithGoogle = () => {
    const redirectBase = window.location.origin;
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}auth/google?redirect_uri=${redirectBase}`;
  };

  const loginWithGitHub = () => {
    const redirectBase = window.location.origin;
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}auth/github?redirect_uri=${redirectBase}`;
  };

  const logout = () => {
    const redirectBase = window.location.origin;
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}auth/logout?redirect_uri=${redirectBase}`;
  };

  return { loginWithGoogle, loginWithGitHub, logout };
};

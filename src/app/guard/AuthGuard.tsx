import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useMsal } from '@azure/msal-react';

interface AuthGuardProps {
  children: ReactNode;
}

const AuthGuard = ({ children }: AuthGuardProps) => {
  const { instance } = useMsal();
  const location = useLocation();

  // Check if there are accounts (user is authenticated)
  const isAuthenticated = instance.getAllAccounts().length > 0;

  // If not authenticated, redirect to the login page
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  // If authenticated, render children (protected route)
  return <>{children}</>;
};

export default AuthGuard;

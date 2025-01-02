import { useAppSelector } from '@/redux/hooks';
import { selectAuth } from '@/redux/slices/authSlice';
import { PropsWithChildren } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

export default function AuthenticationRoute({ children }: PropsWithChildren) {
  const { pathname } = useLocation();
  const { isAuthenticated } = useAppSelector(selectAuth);

  const validPathname = pathname && pathname !== '/';
  const redirect = validPathname ? `?redirect=${pathname}` : '';

  if (!isAuthenticated)
    return <Navigate to={`/auth/login${redirect}`} replace />;
  return <>{children}</>;
}

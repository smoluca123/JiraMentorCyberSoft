import { useAppSelector } from '@/redux/hooks';
import { selectAuth } from '@/redux/slices/authSlice';
import { PropsWithChildren } from 'react';
import { Navigate, useSearchParams } from 'react-router-dom';

export default function UnauthenticationRoute({ children }: PropsWithChildren) {
  const { isAuthenticated } = useAppSelector(selectAuth);
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get('redirect') || '/';
  if (isAuthenticated) return <Navigate to={redirect} replace />;
  return <>{children}</>;
}

import { Navigate } from 'react-router-dom';
import type { ReactNode } from 'react';
import type { User, UserRole } from '../types';

type ProtectedRouteProps = {
  user: User | null;
  role: UserRole;
  children: ReactNode;
};

export function ProtectedRoute({ user, role, children }: ProtectedRouteProps) {
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== role) {
    return <Navigate to={user.role === 'photographer' ? '/photographer' : '/client'} replace />;
  }

  return <>{children}</>;
}

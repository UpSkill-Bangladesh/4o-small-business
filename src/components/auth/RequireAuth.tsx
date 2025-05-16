
import { ReactNode, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface RequireAuthProps {
  children: ReactNode;
}

const RequireAuth = ({ children }: RequireAuthProps) => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!loading && !user) {
      // Redirect to login if not authenticated
      navigate('/auth?redirect=' + encodeURIComponent(location.pathname), { replace: true });
    }
  }, [user, loading, navigate, location]);

  // Show nothing while loading
  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  // Show children only when authenticated
  return user ? <>{children}</> : null;
};

export default RequireAuth;

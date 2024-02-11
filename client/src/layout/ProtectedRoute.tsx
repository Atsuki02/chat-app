import { ReactNode, useEffect } from 'react';
import { useValidateSessionQuery } from '@/redux/services/authService';
import { setUser } from '@/redux/slices/authSlice';
import { useDispatch } from 'react-redux';
import { useNavigate, Outlet } from 'react-router-dom';
import Loading from '@/components/ui/Loading';

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { data: session, isError, isLoading } = useValidateSessionQuery({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading) {
      if (session?.user) {
        dispatch(setUser(session.user));
      } else if (isError) {
        navigate('/auth');
      }
    }
  }, [session, isError, isLoading, dispatch, navigate]);

  if (isLoading) return <Loading />;
  if (!session?.user) return null;

  return children ? children : <Outlet />;
};

export default ProtectedRoute;

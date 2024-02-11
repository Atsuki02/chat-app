import { Toaster } from '@/components/ui/toaster';
import { useValidateSessionQuery } from '@/redux/services/authService';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

const RootLayout = () => {
  const { data: session, isError } = useValidateSessionQuery({});

  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      navigate('/auth');
    }
  }, [session, isError, navigate]);
  return (
    <>
      <Outlet />
      <Toaster />
    </>
  );
};

export default RootLayout;

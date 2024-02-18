import { Toaster } from '@/components/ui/toaster';
import { Outlet } from 'react-router-dom';
import { ThemeProvider, useTheme } from './ThemeProvider';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useGetUserQuery } from '@/redux/services/userService';
import { useEffect } from 'react';

const RootLayout = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { data: userData, isSuccess } = useGetUserQuery(user?.id, {
    skip: !user?.id,
  });
  const { setTheme } = useTheme();

  useEffect(() => {
    if (isSuccess && userData) {
      const themePreference = userData.darkMode ? 'dark' : 'light';
      setTheme(themePreference);
      localStorage.setItem('vite-ui-theme', themePreference);
    }
  }, [userData, isSuccess, setTheme]);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Outlet />
      <Toaster />
    </ThemeProvider>
  );
};

export default RootLayout;

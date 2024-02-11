import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Home from './app/home/Page';
import Auth from './app/auth/Page';
import RootLayout from './layout/RootLayout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'auth', element: <Auth /> },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />;
    </>
  );
}

export default App;

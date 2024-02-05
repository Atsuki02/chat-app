import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './app/home/Page';
import Auth from './app/auth/Page';

const router = createBrowserRouter([
  {
    children: [
      { path: '/', element: <Home /> },
      {
        path: '/auth',
        element: <Auth />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

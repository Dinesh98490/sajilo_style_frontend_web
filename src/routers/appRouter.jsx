import { createBrowserRouter } from 'react-router-dom';
import AppLayout from "../layouts/appLayout";
import NotFound from "../pages/notFoundPage";
import LandingPage from "../pages/landingPage";
import LoginPage from "../pages/loginPage";
import SignupPage from "../pages/signupPage";
import Dashboard from '../pages/dashboard';
import AdminLayout from "../layouts/adminLayout";
import ProductPage from '../pages/productPage';
import CustomerPage from '../pages/CustomerPage';


export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <NotFound />,
    children: [
      { path: "/", element: <LandingPage /> },
      { path: "/signup", element: <SignupPage /> },
      { path: "/login", element: <LoginPage /> },
      
    ],
  },
  {
    element: <AdminLayout />,
    errorElement: <NotFound />,
    children: [
      { path: "/admin/dashboard", element: <Dashboard /> },
      {path: "/admin/product", element:<ProductPage/>},
      {path:"/admin/customer", element:<CustomerPage/>},
      
      
    ],
  },
]);



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
import OrderPage from '../pages/OrderPage';
import ProtectedRoute from './adminGuard';
import ProductDetailsPage from '../pages/ProductDetailsPage';
import CartPage from '../pages/CartPage';
// import ForgotPasswordPage from '../pages/ForgetPasswordPage';
// import RequestPasswordRestPage from '../pages/ResetPasswordPage';
// import ResetPasswordPage from '../pages/ResetPasswordPage';
import RequestResetPasswordPage from '../pages/RequestResetPasswordPage';
import ResetPasswordPage from '../pages/ResetPasswordPage';



export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <NotFound />,
    children: [
      { path: "/", element: <LandingPage /> },
      { path: "/signup", element: <SignupPage /> },
      { path: "/login", element: <LoginPage /> },
      // {path: "/forgetpassword", element: <ForgotPasswordPage/>},
      {path: "/customer/cart", element: <CartPage/>},
      {path: "/customer/cartpage", element: <CartPage/>},
      { path: "/productdetails/:id", element: <ProductDetailsPage /> },

      {path: "/request-reset-password",element:<RequestResetPasswordPage/>},
      {path: "/reset-password/:token",element:<ResetPasswordPage/>},
      
    ],
  },
  {
    element: <ProtectedRoute requiredRole="Admin">
    <AdminLayout />
    </ProtectedRoute>,
    errorElement: <NotFound />,
    children: [
      { path: "/admin/dashboard", element: <Dashboard /> },
      {path: "/admin/product", element:<ProductPage/>},
      {path:"/admin/customer", element:<CustomerPage/>},
      {path: "/admin/order", element: <OrderPage/>},
      
      
    ],
  },
]);




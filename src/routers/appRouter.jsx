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



export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <NotFound />,
    children: [
      { path: "/", element: <LandingPage /> },
      { path: "/signup", element: <SignupPage /> },
      { path: "/login", element: <LoginPage /> },
      // {path: "/product-details", element:<ProductDetailsPage/>},
      // {path: "/productdetails", element: <ProductDetailsPage/>}
      { path: "/productdetails/:id", element: <ProductDetailsPage /> }
    
      
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


// {
//   element: <ProtectedRoute requiredRole="Admin">
//     <AdminLayout />
//   </ProtectedRoute>, // Admin layout for admin dashboard routes
//   children: [
//     { path: "/admin/dashboard", element: <AdminDashboard /> }, 
//     { path: "/admin/products", element: <ProductManagement/> },
//     { path: "/admin/orders", element: <OrderManagement/>},
//     { path: "/admin/users", element: <UserManagement/> },
//     { path: "/admin/inventory", element: <InventoryManagement/> },
//     { path: "/admin/payments", element: <PaymentManagement/> },
//     { path: "/admin/reports", element: <ReportingDashboard/> },
//     { path: "/admin/delivery", element: <DeliveryManagement/> },
//     { path: "/admin/add-category", element: <AddCategoriesPage/> },
//     { path: "/admin/add-subcategory", element: <AddSubcategoryManagement/> },
//     { path: "/admin/add-brands", element: <AddBrandManagement/> },
//     { path: "/admin/settings", element: <SettingsPage/> },
    
//   ],
// },



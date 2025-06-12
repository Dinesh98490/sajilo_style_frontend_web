import AppLayout from "../layouts/appLayout";
import NotFound from "../pages/notFoundPage";
import LandingPage from "../pages/landingPage";
import { createBrowserRouter } from 'react-router-dom';
import LoginPage from "../pages/loginPage";
import SignupPage from "../pages/signupPage";
export const router = createBrowserRouter([
    {
      element: <AppLayout />,
      errorElement: <NotFound/>,
      children: [
        {path:"/",element:<LandingPage/>},
        {path:"/signup", element:<SignupPage/>},
        {path: "/login", element:<LoginPage/>}
        
       
      ],
    },
  ]);
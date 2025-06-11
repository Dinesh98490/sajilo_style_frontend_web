import AppLayout from "../layouts/appLayout";
import NotFound from "../pages/notFoundPage";
import LandingPage from "../pages/landingPage";
import { createBrowserRouter } from 'react-router-dom';
export const router = createBrowserRouter([
    {
      element: <AppLayout />,
      errorElement: <NotFound/>,
      children: [
        {path:"/",element:<LandingPage/>}
        
       
      ],
    },
  ]);
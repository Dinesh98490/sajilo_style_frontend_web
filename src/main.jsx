import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import AppLayout from './layouts/appLayout';
import { Slide, ToastContainer } from 'react-toastify';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AuthContextProvider from './auth/authProvider';
import 'react-toastify/dist/ReactToastify.css'; 

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContextProvider>
      <QueryClientProvider client={queryClient}>
        <AppLayout>
          <App />
        </AppLayout>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          theme="light"
          transition={Slide}
        />
      </QueryClientProvider>
    </AuthContextProvider>
  </StrictMode>
);

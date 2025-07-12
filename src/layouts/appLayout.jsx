import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from "../components/navbar/profileActions";
import Footer from '../components/footer/footer';

const AppLayout = () => (
  <>
    <div className="fixed top-0 left-0 w-full z-50">
      <Navbar />
    </div>
    <main className="pt-16">
      <Outlet />
    </main>
    <Footer />
  </>
);

export default AppLayout;

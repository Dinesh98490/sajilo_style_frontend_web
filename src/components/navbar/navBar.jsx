// import React from "react";
// import { Search, Heart, ShoppingBag, Menu } from "lucide-react";
// import { Link, useNavigate } from "react-router-dom";
// import { IMAGE_PATHS } from "../../common/imageConstant";
// import {ProfileAc}

// export default function Navbar() {
  
//   const authnavigate = useNavigate();

//   const token = localStorage.getItem("token")
// const isLoggedIn = !!token;

//   const handleLoginClick = () => {
//     window.location.href = "/login"
//   }

//   return (
//     <header className="flex h-16 w-full items-center justify-between border-b bg-[#FAFAFA] px-4 md:px-6">
      
//       {/* Mobile menu button */}
//       <div className="md:hidden">
//         <button className="p-2" onClick={() => alert("Open menu sheet here")}>
//           <Menu className="h-5 w-5 text-gray-800" />
//           <span className="sr-only">Toggle menu</span>
//         </button>
//       </div>

//       {/* Logo */}
//       <div className="flex items-center">
//         <Link to="/" className="flex items-center space-x-2">
//           <img
//             src={IMAGE_PATHS.logo}
//             alt="SajiloStyle"
//             className="h-10 object-contain"
//           />
//         </Link>
//       </div>

//       {/* Navigation Links */}
//       <nav className="hidden md:flex items-center space-x-8">
//         <Link to="/" className="text-sm font-medium text-gray-800 hover:text-orange-500 transition-colors">
//           Home
//         </Link>
//         <Link to="/man" className="text-sm font-medium text-gray-700 hover:text-orange-500 transition-colors">
//           Man
//         </Link>
//         <Link to="/women" className="text-sm font-medium text-gray-700 hover:text-orange-500 transition-colors">
//           Women
//         </Link>
//         <Link to="/kids" className="text-sm font-medium text-gray-700 hover:text-orange-500 transition-colors">
//           Kids
//         </Link>
//         <Link to="/about-us" className="text-sm font-medium text-gray-700 hover:text-orange-500 transition-colors">
//           About Us
//         </Link>
//         <Link to="/contact-us" className="text-sm font-medium text-gray-700 hover:text-orange-500 transition-colors">
//           Contact Us
//         </Link>
//       </nav>

//       {/* Icons and Auth Buttons */}
//       <div className="flex items-center space-x-2">
//         <Link to="/search" className="hidden sm:flex p-2 hover:text-orange-500 transition-colors">
//           <Search className="h-5 w-5 text-gray-800" />
//           <span className="sr-only">Search</span>
//         </Link>

//         <Link to="/wishlist" className="hidden sm:flex p-2 hover:text-orange-500 transition-colors">
//           <Heart className="h-5 w-5 text-gray-800" />
//           <span className="sr-only">Wishlist</span>
//         </Link>

//         <Link to="/cart" className="p-2 hover:text-orange-500 transition-colors">
//           <ShoppingBag className="h-5 w-5 text-gray-800" />
//           <span className="sr-only">Cart</span>
//         </Link>


//         { /*  navigate code for the login and signup in the navbar*/ }
//         {!isLoggedIn ? (
//   <>
//     <button
//       className="text-gray-800 border border-gray-400 hover:bg-orange-500 hover:text-white px-4 py-2 text-sm font-medium rounded-full transition-colors"
//       onClick={() => authnavigate("/signup")}
//     >
//       Sign Up
//     </button>
//     <button
//       className="border border-gray-400 text-gray-800 hover:border-orange-500 hover:text-orange-500 hover:bg-orange-50 px-4 py-2 text-sm font-medium rounded-full transition-colors"
//       onClick={handleLoginClick}
//     >
//       Sign In
//     </button>
//   </>
// ) : (
//   <ProfileOptions />
// )}

//       </div>
//     </header>
//   );
// }

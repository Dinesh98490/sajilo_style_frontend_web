import React from "react";
import { Search, Heart, ShoppingBag, Menu } from "lucide-react";
import { Link, data, useNavigate } from "react-router-dom";
import { IMAGE_PATHS } from "../../common/imageConstant";
import { useGetCustomer } from "../../hooks/admin/usecustomer/customerHooks";

// --- Avatar UI ---
function Avatar({ src, fallback, alt }) {
  return (
    <div className="relative w-8 h-8 rounded-full overflow-hidden bg-gray-200 border border-gray-300">
      {src ? (
        <img src={src} alt={alt} className="w-full h-full object-cover" />
      ) : (
        <div className="flex items-center justify-center w-full h-full text-sm font-medium text-gray-600">
          {fallback}
        </div>
      )}
    </div>
  );
}

// --- Dropdown Menu UI ---
function DropdownMenu({ children }) {
  return <div className="relative inline-block text-left">{children}</div>;
}

function DropdownMenuTrigger({ asChild, children }) {
  const child = React.Children.only(children);
  return React.cloneElement(child, {
    onClick: (e) => {
      e.stopPropagation();
      const menu = e.currentTarget.nextElementSibling;
      if (menu) {
        menu.classList.toggle("hidden");
      }
    },
  });
}

function DropdownMenuContent({ children, className }) {
  return (
    <div
      className={`absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50 hidden ${className}`}
    >
      {children}
    </div>
  );
}

function DropdownMenuItem({ children, onClick, className }) {
  return (
    <div
      onClick={onClick}
      className={`px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer ${className}`}
    >
      {children}
    </div>
  );
}

// --- Profile Options UI ---
function ProfileOptions({ username = "User", avatarUrl }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center space-x-2 cursor-pointer hover:opacity-90">
          <Avatar
            src="https://github.com/shadcn.png"
            fallback="UN"
            alt="User"
          />
          <span className="font-semibold text-sm hidden md:block">
            {username}
          </span>
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => (window.location.href = "/")}>
          Home
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => (window.location.href = "/order-history")}
        >
          Order History
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => (window.location.href = "/payment-history")}
        >
          Payment History
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => (window.location.href = "/change-password")}
        >
          Change Password
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("userid");
            window.location.href = "/";
          }}
          className="text-red-500 hover:bg-red-100"
        >
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// --- Main Navbar ---
export default function Navbar() {
  const authnavigate = useNavigate();
  const token = localStorage.getItem("token");
  const customerId = localStorage.getItem("userid");
  console.log(customerId);
  const { data: customerData, isLoading } = useGetCustomer(customerId);
  console.log(customerData?.data.fullName);

  const handleLoginClick = () => {
    if (!token) {
      authnavigate("/login");
    }
  };

  return (
    <header className="flex h-16 w-full items-center justify-between border-b bg-[#FAFAFA] px-4 md:px-6">
      {/* Mobile menu button */}
      <div className="md:hidden">
        <button className="p-2" onClick={() => alert("Open menu sheet here")}>
          <Menu className="h-5 w-5 text-gray-800" />
          <span className="sr-only">Toggle menu</span>
        </button>
      </div>

      {/* Logo */}
      <div className="flex items-center">
        <Link to="/" className="flex items-center space-x-2">
          <img
            src={IMAGE_PATHS.logo}
            alt="SajiloStyle"
            className="h-10 object-contain"
          />
        </Link>
      </div>

      {/* Navigation Links */}
      <nav className="hidden md:flex items-center space-x-8">
        <Link
          to="/"
          className="text-sm font-medium text-gray-800 hover:text-orange-500 transition-colors"
        >
          Home
        </Link>
        <Link
          to="/man"
          className="text-sm font-medium text-gray-700 hover:text-orange-500 transition-colors"
        >
          Man
        </Link>
        <Link
          to="/women"
          className="text-sm font-medium text-gray-700 hover:text-orange-500 transition-colors"
        >
          Women
        </Link>
        <Link
          to="/kids"
          className="text-sm font-medium text-gray-700 hover:text-orange-500 transition-colors"
        >
          Kids
        </Link>
        <Link
          to="/about-us"
          className="text-sm font-medium text-gray-700 hover:text-orange-500 transition-colors"
        >
          About Us
        </Link>
        <Link
          to="/contact-us"
          className="text-sm font-medium text-gray-700 hover:text-orange-500 transition-colors"
        >
          Contact Us
        </Link>
      </nav>

      {/* Icons and Auth Buttons */}
      <div className="flex items-center space-x-2">
        {/* <Link to="/search" className="hidden sm:flex p-2 hover:text-orange-500 transition-colors">
          <Search className="h-5 w-5 text-gray-800" />
          <span className="sr-only">Search</span>
        </Link> */}

        {/* <Link
          to="/wishlist"
          className="hidden sm:flex p-2 hover:text-orange-500 transition-colors"
        >
          <Heart className="h-5 w-5 text-gray-800" />
          <span className="sr-only">Wishlist</span>
        </Link> */}

        <Link
          to="/customer/cart"
          className="p-2 text-gray-600 hover:text-orange-500 transition-colors"
        >
          <ShoppingBag className="h-5 w-5" />
          <span className="sr-only">Cart</span>
        </Link>

        {!token ? (
          <>
            <button
              className="text-gray-800 border border-gray-400 hover:bg-orange-500 hover:text-white px-4 py-2 text-sm font-medium rounded-full transition-colors"
              onClick={() => authnavigate("/signup")}
            >
              Sign Up
            </button>
            <button
              className="border border-gray-400 text-gray-800 hover:border-orange-500 hover:text-orange-500 hover:bg-orange-50 px-4 py-2 text-sm font-medium rounded-full transition-colors"
              onClick={handleLoginClick}
            >
              Sign In
            </button>
          </>
        ) : (
          <ProfileOptions
            username={customerData?.data.fullName || "User"}
            avatarUrl={`http://localhost:5050/uploads/${customerData?.profileImage}`}
          />
        )}
      </div>
    </header>
  );
}

// import { Navigate, useNavigate } from 'react-router-dom';

// const ProtectedRoute = ({ children, requiredRole }) => {
//   const role = localStorage.getItem("role");
//   if (!role || role !== requiredRole) {
//     return <Navigate to="/login" />;
//   }
//   return children;
// };

// export default ProtectedRoute;




import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, requiredRole }) => {
  const role = localStorage.getItem("role");

  // If no role (not logged in)
  if (!role) {
    return <Navigate to="/signin"  />;
  }

  // If role is not the required one → redirect to correct dashboard
  if (role !== requiredRole) {
    if (role === "Admin") {
      return <Navigate to="/admin/dashboard" replace />;
    } else if (role === "Customer") {
      return <Navigate to="/" replace />;
    } else {
      // Optional: fallback for unknown roles
      return <Navigate to="/signin" replace />;
    }
  }

  // Role matches required → allow access
  return children;
};

export default ProtectedRoute;



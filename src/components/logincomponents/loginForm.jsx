// import { useState } from "react";
// import { LogoHeader } from "./logoHeader";
// import { FormFields } from "./formField";
// import { FormActions } from "./formActions";
// import { useLoginUser } from "../../hooks/useLoginUser";




// export function LoginForm() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const loginMutation = useLoginUser();

//   // const handleSubmit = (e) => {
//   //   e.preventDefault();
//   //   loginMutation.mutate({ email, password });
//   // };

//   const handleSubmit = (e) => {
//     e.preventDefault();
  
//     loginMutation.mutate(
//       { email, password },
//       {
//         onSuccess: (res) => {
//           const role = res?.data?.role;
//           const token = res?.token;
//           const userData = res?.data;
  
//           if (!role || !token) {
//             toast.error("Invalid login response");
//             return;
//           }
  
//           // ✅ Save user and token to context + localStorage
//           login(userData, token);
  
//           // ✅ Show success message
//           toast.success(res?.message || "Login Success");
  
//           // ✅ Navigate based on role
//           if (role === "Admin") {
//             navigate("/admin/dashboard");
//           } else {
//             navigate("/");
//           }
//         },
//         onError: (err) => {
//           console.error("Login failed:", err.message);
//           toast.error(err?.message || "Login Failed");
//         }
//       }
//     );
//   };
  



  



//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-100 to-white p-4">
//       <div className="w-full max-w-xl bg-white rounded-3xl p-10 shadow-2xl border border-gray-200 hover:shadow-orange-400/20 transition-all duration-300">
//         <LogoHeader />
//         <form className="space-y-8 mt-6" onSubmit={handleSubmit}>
//           <FormFields
//             email={email}
//             setEmail={setEmail}
//             password={password}
//             setPassword={setPassword}
//           />
//           <FormActions isLoading={loginMutation.isLoading} />
//         </form>
//       </div>
//     </div>
//   );
// }


import { useState, useContext } from "react";
import { LogoHeader } from "./logoHeader";
import { FormFields } from "./formField";
import { FormActions } from "./formActions";
import { useLoginUser } from "../../hooks/useLoginUser";
import { AuthContext } from "../../auth/authProvider"; 
import { useNavigate } from "react-router-dom"; 
import { toast } from "react-toastify"; 

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loginMutation = useLoginUser();
  const { login } = useContext(AuthContext); 
  const navigate = useNavigate(); 

  const handleSubmit = (e) => {
    e.preventDefault();

    loginMutation.mutate(
      { email, password },
      {
        onSuccess: (res) => {
          console.log("Login response:", res);
          const role = res?.data?.role;
          const token = res?.token;
          const userData = res?.data;

          console.log("Token:", token);
          console.log("Role:", role);
          console.log("User data:", userData);

          console.log(role)
          localStorage.setItem("userid",res.data._id)
          localStorage.setItem("token",token)
          localStorage.setItem('role', role)
          if (!role || !token) {
            toast.error("Invalid login response");
            return;
          }

          // ✅ Save user and token to context + localStorage
          login(userData, token);

          // ✅ Show success message
          toast.success(res?.message || "Login Success");

          // ✅ Navigate based on role
          if (role === "Admin") {
            navigate("/admin/dashboard");
          } else {
            navigate("/");
          }
        },
        onError: (err) => {
          console.error("Login failed:", err.message);
          toast.error(err?.message || "Login Failed");
        }
      }
    );
  };



  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-100 to-white p-4">
      <div className="w-full max-w-xl bg-white rounded-3xl p-10 shadow-2xl border border-gray-200 hover:shadow-orange-400/20 transition-all duration-300">
        <LogoHeader />
        <form className="space-y-8 mt-6" onSubmit={handleSubmit}>
          <FormFields
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
          />
          <FormActions isLoading={loginMutation.isLoading} />
        </form>
      </div>
    </div>
  );
}




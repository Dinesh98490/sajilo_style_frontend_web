import { useState } from "react";
import { LogoHeader } from "./logoHeader";
import { FormFields } from "./formField";
import { FormActions } from "./formActions";
import { useLoginUser } from "../../hooks/useLoginUser";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loginMutation = useLoginUser();

  const handleSubmit = (e) => {
    e.preventDefault();
    loginMutation.mutate({ email, password });
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

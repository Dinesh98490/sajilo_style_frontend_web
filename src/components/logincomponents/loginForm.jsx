import { LogoHeader } from "./logoHeader";
import { FormFields } from "./formField";
import { FormActions } from "./formActions";

export function LoginForm() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-100 to-white p-4">
      <div className="w-full max-w-xl bg-white rounded-3xl p-10 shadow-2xl border border-gray-200 hover:shadow-orange-400/20 transition-all duration-300">
        <LogoHeader />
        <form className="space-y-8 mt-6">
          <FormFields />
          <FormActions />
        </form>
      </div>
    </div>
  );
}

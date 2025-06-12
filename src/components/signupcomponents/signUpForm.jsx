import { LogoHeader } from "./logoHeader"
import { FormFields } from "./formField"
import { FormActions } from "./formAction"

export default function SignUpForm() {
  return (
    <div className="flex items-center justify-center bg-gradient-to-br from-orange-100 to-white p-4 mt-[3.78px] w-[600px] mx-auto rounded-3xl shadow-lg">
      <div className="w-full bg-white rounded-3xl p-6 shadow-md border border-gray-200 overflow-y-auto">
        <LogoHeader />
        <div className="space-y-6 mt-6">
          <FormFields />
          <FormActions />
        </div>
      </div>
    </div>
  )
}

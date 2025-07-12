
import { Field, ErrorMessage } from "formik"
// import { Label } from "../landingpagecomponents/herosection/ui/Label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../landingpagecomponents/herosection/ui/Select"
import { Activity } from "lucide-react"

export default function StatusSelect() {
  return (
    <div className="space-y-2">
      <Label className="text-gray-700 font-medium flex items-center gap-2">
        <Activity className="w-4 h-4" />
        Status
        <span className="text-red-500">*</span>
      </Label>
      <Field name="status">
        {({ field, form, meta }) => (
          <Select value={field.value} onValueChange={(value) => form.setFieldValue("status", value)}>
            <SelectTrigger
              className={`border-gray-200 focus:border-orange-400 focus:ring-orange-400 bg-gray-50 focus:bg-white transition-colors ${
                meta.touched && meta.error ? "border-red-400 bg-red-50" : ""
              }`}
            >
              <SelectValue placeholder="Select customer status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Active" className="focus:bg-green-50">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Active
                </div>
              </SelectItem>
              <SelectItem value="Inactive" className="focus:bg-gray-50">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                  Inactive
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        )}
      </Field>
      <ErrorMessage name="status">
        {(msg) => <div className="text-red-500 text-sm flex items-center gap-1">⚠️ {msg}</div>}
      </ErrorMessage>
    </div>
  )
}

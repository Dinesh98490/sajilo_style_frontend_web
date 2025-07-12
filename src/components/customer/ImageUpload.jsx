import { useState, useRef } from "react"
// import { Label } from "../landingpagecomponents/herosection/ui/Label"
import { Button } from "../landingpagecomponents/herosection/ui/button"
import { Upload, X, User, Camera, ImageIcon } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "./avatar"


export default function ImageUpload({ value, onChange }) {
  const [imagePreview, setImagePreview] = useState(value)
  const [isLoading, setIsLoading] = useState(false)
  const fileInputRef = useRef(null)


  const handleFileUpload = async (event) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith("image/")) {
      toast({
        title: "❌ Invalid File Type",
        description: "Please select an image file (JPG, PNG, GIF, etc.)",
        variant: "destructive",
      })
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "❌ File Too Large",
        description: "Please select an image smaller than 5MB",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      const previewUrl = URL.createObjectURL(file)
      setImagePreview(previewUrl)
      onChange(previewUrl)

      toast({
        title: "✅ Image Uploaded",
        description: "Profile image has been uploaded successfully",
        className: "border-green-200 bg-green-50 text-green-900",
      })
    } catch (error) {
      toast({
        title: "❌ Upload Failed",
        description: "Failed to upload image. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const clearImage = () => {
    setImagePreview("")
    onChange("")
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="space-y-4">
      <Label className="text-gray-700 font-medium flex items-center gap-2">
        <ImageIcon className="w-4 h-4" />
        Profile Image
        <span className="text-red-500">*</span>
      </Label>

      <div className="flex items-center gap-4">
        {/* Image Preview */}
        <div className="relative group">
          <Avatar className="w-20 h-20 border-4 border-orange-200 shadow-md">
            <AvatarImage src={imagePreview || "/placeholder.svg"} alt="Customer" />
            <AvatarFallback className="bg-orange-100 text-orange-600">
              <User className="w-8 h-8" />
            </AvatarFallback>
          </Avatar>

          {/* Camera overlay */}
          <div
            className="absolute inset-0 bg-black/60 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
            onClick={triggerFileInput}
          >
            <Camera className="w-6 h-6 text-white" />
          </div>
        </div>

        {/* Upload Controls */}
        <div className="flex-1 space-y-3">
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="border-orange-300 text-orange-700 hover:bg-orange-50"
              onClick={triggerFileInput}
              disabled={isLoading}
            >
              <Upload className="w-4 h-4 mr-2" />
              {isLoading ? "Uploading..." : "Choose File"}
            </Button>

            {imagePreview && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="border-red-300 text-red-700 hover:bg-red-50"
                onClick={clearImage}
              >
                <X className="w-4 h-4 mr-2" />
                Remove
              </Button>
            )}
          </div>

          {/* File Info */}
          <div className="text-xs text-gray-500 space-y-1">
            <p>• JPG, PNG, GIF, WebP (Max: 5MB)</p>
            <p>• Recommended: 400x400px</p>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="flex items-center gap-2 text-orange-600">
              <div className="w-4 h-4 border-2 border-orange-600 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-sm">Uploading...</span>
            </div>
          )}
        </div>
      </div>

      <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />

      {!imagePreview && <div className="text-red-500 text-sm">Profile image is required</div>}
    </div>
  )
}

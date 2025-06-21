

export default function Separator({ className = "", dashed = false }) {
    return (
      <div
        className={`w-full h-px ${dashed ? "border-t border-dashed border-gray-300" : "bg-gray-200"} my-4 ${className}`}
      />
    )
  }


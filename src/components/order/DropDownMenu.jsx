import React, { useState, useRef, useEffect } from "react"

export function DropdownMenu({ children }) {
  return <div className="relative inline-block text-left">{children}</div>
}

export function DropdownMenuTrigger({ asChild, children }) {
  return <>{children}</>
}

export function DropdownMenuContent({ children, align = "start" }) {
  const ref = useRef()
  const [open, setOpen] = useState(true)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  if (!open) return null

  return (
    <div
      ref={ref}
      className={`absolute z-10 mt-2 w-48 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 ${
        align === "end" ? "right-0" : "left-0"
      }`}
    >
      <div className="py-1">{children}</div>
    </div>
  )
}

export function DropdownMenuItem({ children, onClick, className = "" }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-orange-100 hover:text-orange-900 ${className}`}
    >
      {children}
    </button>
  )
}

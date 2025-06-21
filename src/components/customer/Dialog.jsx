import React from "react";

export function Dialog({ open, onOpenChange, children }) {
  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={() => onOpenChange(false)}
    >
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg" onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}

export function DialogContent({ children, className = "" }) {
  return <div className={`p-6 ${className}`}>{children}</div>;
}

export function DialogHeader({ children }) {
  return <div className="mb-4">{children}</div>;
}

export function DialogTitle({ children }) {
  return <h2 className="text-lg font-semibold">{children}</h2>;
}

export function DialogDescription({ children }) {
  return <p className="text-sm text-gray-600">{children}</p>;
}

// Add this DialogFooter component:
export function DialogFooter({ children }) {
  return (
    <div className="mt-6 flex justify-end gap-3">
      {children}
    </div>
  );
}

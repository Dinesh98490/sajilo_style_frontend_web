import React, { useState, createContext, useContext } from "react";
import ReactDOM from "react-dom";

const DialogContext = createContext();

export function AlertDialog({ children }) {
  const [open, setOpen] = useState(false);

  return (
    <DialogContext.Provider value={{ open, setOpen }}>
      {children}
    </DialogContext.Provider>
  );
}

export function AlertDialogTrigger({ children, asChild = false }) {
  const { setOpen } = useContext(DialogContext);

  return asChild
    ? React.cloneElement(children, {
        onClick: () => setOpen(true),
      })
    : <button onClick={() => setOpen(true)}>{children}</button>;
}

export function AlertDialogContent({ children, className = "" }) {
  const { open, setOpen } = useContext(DialogContext);
  if (!open) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className={`bg-white rounded-lg p-6 shadow-xl w-full max-w-lg ${className}`}>
        {children}
      </div>
    </div>,
    document.body
  );
}

export function AlertDialogHeader({ children }) {
  return <div className="mb-4">{children}</div>;
}

export function AlertDialogFooter({ children }) {
  return <div className="mt-6 flex justify-end gap-3">{children}</div>;
}

export function AlertDialogTitle({ children, className = "" }) {
  return <h2 className={`text-lg font-semibold ${className}`}>{children}</h2>;
}

export function AlertDialogDescription({ children }) {
  return <p className="text-gray-600 mt-2">{children}</p>;
}

export function AlertDialogCancel({ children, className = "" }) {
  const { setOpen } = useContext(DialogContext);
  return (
    <button
      onClick={() => setOpen(false)}
      className={`px-4 py-2 rounded-md border ${className}`}
    >
      {children}
    </button>
  );
}

export function AlertDialogAction({ children, onClick, className = "" }) {
  const { setOpen } = useContext(DialogContext);
  const handleClick = () => {
    if (onClick) onClick();
    setOpen(false);
  };

  return (
    <button onClick={handleClick} className={`px-4 py-2 rounded-md ${className}`}>
      {children}
    </button>
  );
}

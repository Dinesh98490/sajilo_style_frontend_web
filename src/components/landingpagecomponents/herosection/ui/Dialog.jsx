import React from "react";

export function Dialog({ open, onOpenChange, children }) {
  if (!open) return null;

  return (
    <div
      onClick={() => onOpenChange(false)}
      className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-50"
    >
     
      <div onClick={(e) => e.stopPropagation()}>{children}</div>
    </div>
  );
}

export function DialogContent({ children, className = "" }) {
  return (
    <div
      className={`bg-white rounded-lg p-6 shadow-lg max-w-lg w-full max-h-[90vh] overflow-y-auto ${className}`}
    >
      {children}
    </div>
  );
}

export function DialogHeader({ children }) {
  return <div className="mb-4">{children}</div>;
}

export function DialogTitle({ children }) {
  return <h2 className="text-xl font-semibold">{children}</h2>;
}

export function DialogDescription({ children }) {
  return <p className="text-gray-600 mt-1">{children}</p>;
}


export function DialogTrigger({ children }) {
  const { setIsOpen } = useContext(DialogContext);
  
  
  const child = Children.only(children);
  return cloneElement(child, {
    ...child.props,
    onClick: () => {
     
      if (child.props.onClick) {
        child.props.onClick();
      }
      setIsOpen(true);
    },
  });
}
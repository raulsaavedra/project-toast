import React, { useCallback, useState } from "react";
import useKeydown from "../../hooks/useKeydown";

export const ToastContext = React.createContext();

function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const handleAddToast = useCallback((message, variant) => {
    const newToast = {
      id: crypto.randomUUID(),
      message: message,
      variant: variant,
    };
    setToasts((prev) => {
      return [...prev, newToast];
    });
  }, []);

  const handleDeleteToast = useCallback((id) => {
    setToasts((prev) => {
      return prev.filter((toast) => toast.id !== id);
    });
  }, []);

  const handleClearToasts = useCallback(() => {
    setToasts([]);
  }, []);

  useKeydown("Escape", handleClearToasts);

  const value = React.useMemo(() => {
    return {
      toasts,
      handleAddToast,
      handleDeleteToast,
    };
  }, [toasts, handleAddToast, handleDeleteToast]);

  return <ToastContext value={value}>{children}</ToastContext>;
}

export default ToastProvider;

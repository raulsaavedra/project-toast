import React, { useCallback, useState } from "react";
import useEscapeKey from "../../hooks/useEscapeKey";

export const ToastContext = React.createContext();

function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const handleAddToast = useCallback((message, variant) => {
    const newToast = {
      id: crypto.randomUUID(),
      variant: message.variant,
      message: message.message,
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

  useEscapeKey(handleClearToasts);

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

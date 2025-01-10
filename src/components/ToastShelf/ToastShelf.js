import React from "react";

import Toast from "../Toast";
import styles from "./ToastShelf.module.css";
import { ToastContext } from "../ToastProvider/ToastProvider";

function ToastShelf({ toasts }) {
  const { handleDeleteToast } = React.useContext(ToastContext);
  return (
    <ol className={styles.wrapper}>
      {toasts.map((toast) => (
        <div
          className={styles.toastWrapper}
          role="region"
          aria-live="polite"
          aria-label="Notification"
          key={toast.id}
        >
          <Toast
            title={toast.title}
            variant={toast.variant}
            onClose={() => handleDeleteToast(toast.id)}
          >
            {toast.message}
          </Toast>
        </div>
      ))}
    </ol>
  );
}

export default ToastShelf;

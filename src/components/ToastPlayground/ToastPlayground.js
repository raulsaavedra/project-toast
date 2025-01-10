import React, { useCallback, useEffect, useState } from "react";

import Button from "../Button";
import styles from "./ToastPlayground.module.css";
import ToastShelf from "../ToastShelf/ToastShelf";
import { ToastContext } from "../ToastProvider/ToastProvider";
import useEscapeKey from "../../hooks/useKeydown";

const VARIANT_OPTIONS = ["notice", "warning", "success", "error"];

const initialFormValues = {
  message: "",
  variant: "notice",
};

function ToastPlayground() {
  const { toasts, handleAddToast } = React.useContext(ToastContext);

  const [formValues, setFormValues] = useState(initialFormValues);

  const resetForm = () => {
    setFormValues(initialFormValues);
  };

  const handleFieldChange = useCallback((field, value) => {
    setFormValues((prev) => {
      const newFormValues = { ...prev, [field]: value };
      return newFormValues;
    });
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const { message, variant } = formValues;
    if (!message || !variant) return;

    handleAddToast(message, variant);

    resetForm();
  };

  return (
    <div className={styles.wrapper}>
      <header>
        <img alt="Cute toast mascot" src="/toast.png" />
        <h1>Toast Playground</h1>
      </header>

      {toasts.length > 0 ? <ToastShelf toasts={toasts} /> : null}

      <div className={styles.controlsWrapper}>
        <form
          onSubmit={(e) => {
            handleFormSubmit(e);
          }}
        >
          <div className={styles.row}>
            <label
              htmlFor="message"
              className={styles.label}
              style={{ alignSelf: "baseline" }}
            >
              Message
            </label>
            <div className={styles.inputWrapper}>
              <textarea
                id="message"
                className={styles.messageInput}
                value={formValues.message}
                onChange={(e) => {
                  handleFieldChange("message", e.target.value);
                }}
              />
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.label}>Variant</div>
            <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
              {VARIANT_OPTIONS.map((option) => (
                <label htmlFor={`variant-${option}`} key={option}>
                  <input
                    id={`variant-${option}`}
                    type="radio"
                    name="variant"
                    value={option}
                    checked={option === formValues.variant}
                    onChange={(e) => {
                      handleFieldChange("variant", e.target.value);
                    }}
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.label} />
            <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
              <Button>Pop Toast!</Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ToastPlayground;

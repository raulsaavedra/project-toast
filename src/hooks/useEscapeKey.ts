import { useEffect } from "react";

function useEscapeKey(callback) {
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        callback();
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [callback]);
}

export default useEscapeKey;

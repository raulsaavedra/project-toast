import { useEffect } from "react";

function useKeydown(key, callback) {
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === key) {
        callback(event);
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [key, callback]);
}

export default useKeydown;

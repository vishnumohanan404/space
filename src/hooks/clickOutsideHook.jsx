import { useRef } from "react";
import { useEffect } from "react";

export default function useClickOutside(handler) {
  let parentRef = useRef();

  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (parentRef.current && !parentRef.current.contains(event.target)) {
        handler();
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [parentRef]);
  return parentRef;
}

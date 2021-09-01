import React from "react";
import { AnimatePresence, motion } from "framer-motion";

function Modal({ isToggled, children, setToggle }) {
  return (
    <AnimatePresence>
      {isToggled && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
              position:"fixed",
              top: "100px",
              left: "50%",
              transform: "translate3d(-50%, 0, 0)",
              width:"500px",
              background: "#574d4d94",
              opacity: "80"
          }}
        >
          <motion.div
            initial={{ y: 50 }}
            animate={{ y: 0}}
            exit={{ y: 30 }}
          >
            <button onClick={() => setToggle(false)}>Close</button>
          {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Modal;

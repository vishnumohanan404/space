import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";
import { IoCloseOutline } from "react-icons/io5";
// import { useClickOutside } from "react-click-outside-hook";

const ModalContainer = styled(motion.div)`
  position: "fixed";
  top: "100px";
  left: "50%";
  transform: "translate3d(-50%, 0, 0)";
  width: auto;
  background: "#574d4d94";
  opacity: "80";
  z-index: 110;
  padding: 15px;
  border-radius: 8px;
  overflow-y: inherit;
`;

const CloseButton = styled.span`
  height: 16px;
  width: 16px;
  background-color: #bbb;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: filter 300ms;
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 100;
  &:hover {
    filter: brightness(1.2);
  }
`;

// const InnerContainer = styled.div``;

function Modal({
  isToggled,
  children,
  setToggle,
  closeContainer,
  parentRef,
  isClickedOutside,
}) {
  return (
    <AnimatePresence>
      {isToggled && (
        <ModalContainer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: "fixed",
            top: "100px",
            left: "50%",
            transform: "translate3d(-50%, 0, 0)",
            background: "#574d4d94",
            opacity: "80",
            overFlowX: "auto",
          }}
          ref={parentRef}
        >
          <CloseButton onClick={() => setToggle(false)}>
            <IoCloseOutline />
          </CloseButton>
          <motion.div initial={{ y: 50 }} animate={{ y: 0 }} exit={{ y: 30 }}>
            {children}
          </motion.div>
        </ModalContainer>
      )}
    </AnimatePresence>
  );
}

export default Modal;

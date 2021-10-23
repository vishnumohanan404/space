import * as React from "react";
import PropTypes from "prop-types";
import { styled as Style } from "@material-ui/core/styles";
import { Dialog } from "@material-ui/core";
import DialogContent from "@material-ui/core/DialogContent";
import { IoClose } from "react-icons/io5";
import styled from "styled-components";

const BootstrapDialog = Style(Dialog)(({ theme }) => ({
  "& .MuDialogContent-root": {
    padding: theme.spacing(0),
  },
  "& .MuDialogActions-root": {
    padding: theme.spacing(0),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <IntroText sx={{ m: 0, p: 0 }} {...other}>
      {children}
      {onClose ? (
        <div aria-label="close" onClick={onClose}>
          <IoClose />
        </div>
      ) : null}
    </IntroText>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function CustomizedDialogs({
  children,
  open,
  title,
  handleClose,
}) {
  return (
    <Header>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        maxWidth={false}
        // classes={{ paper: classes.root }}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          {title}
        </BootstrapDialogTitle>
        <DialogContent dividers>{children}</DialogContent>
      </BootstrapDialog>
    </Header>
  );
}

const IntroText = styled.h6`
  text-align: center;
  margin: 10px;
  font-size: 15px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: space-between;
  div {
    display: flex;
    align-items: center;
    margin: 2px;
    padding: 5px;
    border-radius: 5px;
    transition: 300ms;
    &:hover {
      background: #a7a6a68d;
      cursor: pointer;
    }
  }
`;

const Header = styled.div`
  /* overflow-x: scroll !important; */
`;

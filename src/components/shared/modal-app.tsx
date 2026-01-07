import React from "react";
import Dialog from "@mui/material/Dialog";

interface ModalAppProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const ModalApp = ({ open, onClose, children }: ModalAppProps) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-hidden={!open}
      disableAutoFocus={false}
      disableEnforceFocus={false}
      disableRestoreFocus={false}
      slotProps={{
        paper: {
          sx: {
            padding: 2,
            border: "gray",
            borderRadius: 2,
            width: "100%",
            maxWidth: 500,
            boxShadow: 20,
            backgroundColor: "#f9f9f9",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
        },
      }}
    >
      {children}
    </Dialog>
  );
};

export default ModalApp;

import React, { useState } from "react";
import {
  Menu,
  MenuItem,
  IconButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { User, LogOut, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import { clearCredentials } from "@/store/slices/auth-slice";
import { clearLocalStorage } from "@/utils.ts/localstorage-utils";
import { userProfileInfoSelector } from "@/store/selectors";
import ModalApp from "./modal-app";
import UserProfileForm from "../forms/user-profile-info-form";
import { logoutFunction } from "@/services/auth-service";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const dispatch = useAppDispatch();
  const { name } = useAppSelector(userProfileInfoSelector);

  const [openEditProfileDialog, setOpenEditProfileDialog] = useState(false);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    handleClose();
    await logoutFunction();
    dispatch(clearCredentials());
  };

  const handleOpenEditProfileDialog = () => {
    handleClose();
    setOpenEditProfileDialog(true);
  };

  const handleCloseEditProfileDialog = () => {
    setOpenEditProfileDialog(false);
  };

  return (
    <div className="flex justify-end items-center p-2  shadow-md sticky top-0 z-10">
      <button
        onClick={handleClick}
        aria-controls={open ? "account-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        className="flex items-center justify-between w-48 min-w-0 gap-2 overflow-hidden border border-white/80 rounded-md px-4 py-3 bg-white hover:bg-white/40 transition-colors"
      >
        <span className="font-semibold text-sm overflow-hidden text-ellipsis whitespace-nowrap">
          {name}
        </span>

        <ChevronDown className="w-4 h-4" />
      </button>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        PaperProps={{
          elevation: 3,
          sx: {
            minWidth: 200,
            mt: 1.5,
            "& .MuiMenuItem-root": {
              px: 2,
              py: 1.5,
            },
          },
        }}
      >
        <MenuItem onClick={handleOpenEditProfileDialog}>
          <ListItemIcon>
            <User className="w-5 h-5" />
          </ListItemIcon>
          <ListItemText>Edit Profile</ListItemText>
        </MenuItem>

        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <LogOut className="w-5 h-5" />
          </ListItemIcon>
          <ListItemText>Logout</ListItemText>
        </MenuItem>
      </Menu>

      {/* user profile edit dialog */}
      <ModalApp
        open={openEditProfileDialog}
        onClose={handleCloseEditProfileDialog}
      >
        <UserProfileForm onClose={handleCloseEditProfileDialog} />
      </ModalApp>
    </div>
  );
};

export default Navbar;

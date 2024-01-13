import React from "react";
import {
  Menu,
  MenuButton,
  Button,
  MenuList,
  MenuItem,
  Box,
} from "@chakra-ui/react";
import { CgProfile } from "react-icons/cg";
import { profileMenuStyles } from "../styles.js"; // Adjust the path as needed
import { useNavigate } from "react-router-dom";

function ProfileMenu() {
  const user = { name: "John Doe" };

  const navigate = useNavigate();

  const navigateToPayment = () => {
    navigate("/payment"); // Replace '/payment' with your actual payment page route
  };
  const navigateToHome = () => {
    navigate("/"); // Replace '/payment' with your actual payment page route
  };

  return (
    <Menu>
      <MenuButton
        as={Button}
        rightIcon={
          <Box
            as={CgProfile}
            color="white"
            fontSize={profileMenuStyles.menuButton.rightIconFontSize}
          />
        }
        variant={profileMenuStyles.menuButton.variant}
        color={profileMenuStyles.menuButton.color}
        _hover={profileMenuStyles.menuButton.hover}
        _active={profileMenuStyles.menuButton.active}
      >
        {user.name} ▼
      </MenuButton>
      <MenuList
        _focus={profileMenuStyles.menuList.focus}
        zIndex={profileMenuStyles.menuList.zIndex}
        color={profileMenuStyles.menuList.color}
      >
        <MenuItem
          _hover={profileMenuStyles.menuItem.hover}
          _active={profileMenuStyles.menuItem.active}
          onClick={navigateToHome}
        >
          Home
        </MenuItem>
        <MenuItem
          _hover={profileMenuStyles.menuItem.hover}
          _active={profileMenuStyles.menuItem.active}
          onClick={navigateToPayment}
        >
          Payment
        </MenuItem>
        <MenuItem
          _hover={profileMenuStyles.menuItem.hover}
          _active={profileMenuStyles.menuItem.active}
          onClick={() => {}}
        >
          Logout
        </MenuItem>

        {/* Other menu items */}
      </MenuList>
    </Menu>
  );
}

export default ProfileMenu;

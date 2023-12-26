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

function ProfileMenu() {
  const user = { name: "John Doe" };

  return (
    <Menu>
      <MenuButton
        as={Button}
        rightIcon={<Box as={CgProfile} color="white" fontSize="2em" />}
        variant="ghost"
        color="white"
        _hover={{ bg: "teal.400", color: "white" }}
        _active={{ bg: "teal.500", color: "white" }}
      >
        {user.name} ▼
      </MenuButton>
      <MenuList
        _focus={{ outline: "none" }}
        zIndex={1}
        color={"black"}
        // Ensure the menu stays above other elements
      >
        <MenuItem
          _hover={{ bg: "teal.400", color: "white" }}
          _active={{ bg: "teal.400", color: "white" }}
          onClick={() => {}}
        >
          Profile
        </MenuItem>
        <MenuItem
          _hover={{ bg: "teal.400", color: "white" }}
          _active={{ bg: "teal.400", color: "white" }}
          onClick={() => {}}
        >
          Payment
        </MenuItem>
        <MenuItem
          _hover={{ bg: "teal.400", color: "white" }}
          _active={{ bg: "teal.400", color: "white" }}
          onClick={() => {}}
        >
          Logout
        </MenuItem>
      </MenuList>
    </Menu>
  );
}

export default ProfileMenu;

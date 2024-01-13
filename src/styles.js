import { MdDescription, MdPictureAsPdf, MdAttachFile } from "react-icons/md";
import { FaFileAlt } from "react-icons/fa";

export const colors = {
  primary: "cornflowerblue", // A soft, soothing blue
  tertiary: "lightgrey", // A light, neutral grey
  tooltip: "darkgrey", // A darker grey for tooltips
  background: "whitesmoke", // A very light grey, gentle on the eyes
  textUser: "midnightblue", // A deep blue for user text, ensuring readability
  textSystem: "darkslategray", // A darker grey for system text
  headerTextColor: "white", // White for header text, offering contrast
};

export const iconStyles = {
  docx: { icon: MdDescription, color: colors.primary },
  pdf: { icon: MdPictureAsPdf, color: colors.primary },
  txt: { icon: FaFileAlt, color: colors.primary },
  default: { icon: MdAttachFile, color: "slategrey" }, // Slate grey for default icons
};

export const buttonStyle = {
  variant: "ghost",
  color: colors.textUser,
  bg: colors.tertiary,
  _hover: {
    color: colors.headerTextColor,
    bg: colors.primary,
    cursor: "pointer",
  },
};

export const documentButtonStyle = {
  variant: "ghost",
  _hover: {
    color: colors.headerTextColor,
    bg: colors.primary,
    cursor: "pointer",
  },
};

export const layout = {
  containerMaxWidth: "container.md",
  // Additional layout constants can be added here
};

// styleConstants.js
export const profileMenuStyles = {
  menuButton: {
    rightIconFontSize: "2em",
    variant: "ghost",
    color: colors.headerTextColor, // Use header text color for the menu button text
    hover: {
      bg: colors.primary, // Use primary color for hover background
      color: colors.headerTextColor, // Use header text color for hover text
    },
    active: {
      bg: colors.tooltip, // A different color (like tooltip) for active state
      color: colors.headerTextColor,
    },
  },
  menuList: {
    focus: { outline: "none" },
    zIndex: 1,
    color: colors.textSystem, // Use text system color for menu list items
  },
  menuItem: {
    hover: {
      bg: colors.primary, // Use primary color for menu item hover background
      color: colors.headerTextColor, // Use header text color for menu item hover text
    },
    active: {
      bg: colors.primary,
      color: colors.headerTextColor,
    },
  },
};

const wonkaStyles = {
  colors,
  iconStyles,
  buttonStyle,
  layout,
};

export default wonkaStyles;

import { extendTheme } from "@chakra-ui/react";

//import { createBreakpoints } from "@chakra-ui/theme-tools";
/* export default createBreakpoints( {
  sm: '30em',
  md: '48em',
  lg: '62em',
  xl: '80em',
  '2xl': '96em',
}) */

const config = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,

  colors: {
    transparent: "transparent",
    black: "#000",
    white: "#fff",
    yellow: "#ffe066",
    darkYellow: "#c9c903",
    beige: "#F1FaEe",
    lightGrey: "#c9c9c9",
    mediumGrey: "#a3a3a3",
    darkGrey: "#424242",
    darkRed: "#49090e",
    darkBlue: "#28455c",
    lightBlue: "#a8dadc",
  },

  fonts: {
    body: "Montserrat, sans-serif",
    heading: "Montserrat, sans-serif",
    mono: "Montserrat, sans-serif",
  },
});

export default theme;
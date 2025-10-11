import { createTheme, ThemeOptions } from "@mui/material/styles";

const lightThemeOptions: ThemeOptions = {
  palette: {
    mode: "light",
    primary: {
      main: "#085999",
      "300": "#A3EAF2",
      light: "#dcf4fc",
      dark: "#303164",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#9c27b0",
      light: "#ba68c8",
      dark: "#7b1fa2",
      contrastText: "#ffffff",
    },
    background: {
      default: "#f5f5f5",
      paper: "#ffffff",
    },
    text: {
      primary: "#212121",
      secondary: "#757575",
    },
    error: {
      main: "#d32f2f",
    },
    warning: {
      main: "#FCC85F",
    },
    info: {
      main: "#0288d1",
    },
    success: {
      main: "#2e7d32",
    },
  },
  typography: {
    fontFamily: '"DesuzaPro", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: "2.5rem",
      fontWeight: 500,
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 500,
    },
    h3: {
      fontSize: "1.75rem",
      fontWeight: 500,
    },
  },
};

const darkThemeOptions: ThemeOptions = {
  palette: {
    mode: "dark",
    primary: {
      main: "#085999",
      light: "#e3f2fd",
      dark: "#42a5f5",
      contrastText: "#000000",
    },
    secondary: {
      main: "#ce93d8",
      light: "#f3e5f5",
      dark: "#ab47bc",
      contrastText: "#000000",
    },
    background: {
      default: "#121212",
      paper: "#292929",
    },
    text: {
      primary: "#ffffff",
      secondary: "#b0b0b0",
    },
    error: {
      main: "#f44336",
    },
    warning: {
      main: "#FCC85F",
    },
    info: {
      main: "#29b6f6",
    },
    success: {
      main: "#66bb6a",
    },
  },
  typography: {
    fontFamily: '"DesuzaPro", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: "2.5rem",
      fontWeight: 500,
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 500,
    },
    h3: {
      fontSize: "1.75rem",
      fontWeight: 500,
    },
  },
};

export const lightTheme = createTheme(lightThemeOptions);
export const darkTheme = createTheme(darkThemeOptions);

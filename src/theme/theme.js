import { createTheme } from "@mui/material/styles";

/*
  60%  Background      #0F172A  deep slate
  30%  Cards/sections  #1E293B  muted slate
  10%  Highlights      #38BDF8  electric sky blue
*/

const theme = createTheme({
  typography: {
    fontFamily: '"Inter", sans-serif',
    allVariants: {
      fontFamily: '"Inter", sans-serif',
    },
  },

  palette: {
    mode: "dark",

    /* Buttons & highlights (10%) */
    primary: {
      main: "#38BDF8",
      light: "#7DD3FC",
      dark: "#0284C7",
      contrastText: "#0F172A",
    },

    /* Lighter tint of the same sky blue, so gradients stay in one family */
    secondary: {
      main: "#7DD3FC",
      light: "#BAE6FD",
      dark: "#38BDF8",
      contrastText: "#0F172A",
    },

    background: {
      default: "#0F172A", /* 60% */
      paper: "#1E293B",   /* 30% */
    },

    text: {
      primary: "#F1F5F9",
      secondary: "#94A3B8",
    },

    divider: "rgba(148, 163, 184, 0.16)",
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          fontFamily: '"Inter", sans-serif',
        },
        "*": {
          fontFamily: '"Inter", sans-serif',
        },
      },
    },
  },
});

export default theme;
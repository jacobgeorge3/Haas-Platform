import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#2eb62c",
    },
    secondary: {
      main: "#ffeca1",
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
            
        },
      },
      defaultProps: {
        variant: "filled",
      },
    },
    MuiFilledInput: {
      styleOverrides: {
        root: {
          backgroundColor: "#fff",
        },
      },
    },
    MuiInputLabel: {
        styleOverrides: {
          root: {
            backgroundColor: "#fff",
          },
        },
      },
  },

  overrides: {
    MuiFilledInput: {
      root: {
        backgroundColor: "green",
      },
    },
    MuiInputLabel: {
      root: {
        backgroundColor: "yellow",
      },
    },
  },

  props: {
    MuiTextField: {
      variant: "filled",
    },
  },
});

export default theme;

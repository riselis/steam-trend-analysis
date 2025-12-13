import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#5B7CFF",
      light: "#7AA2FF",
      dark: "#9BB4FF",
    },
    background: {
      default: "#0B1020",
      paper: "#0F1629",
    },
    text: {
      primary: "#E6E9F2",
      secondary: "#A3AED0",
      disabled: "#4A547A",
    },
    divider: "rgba(255, 255, 255, 0.06)",
  },
  typography: {
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    h6: {
      fontSize: "18px",
      fontWeight: 600,
      lineHeight: 1.4,
    },
    body2: {
      fontSize: "14px",
      lineHeight: 1.6,
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            backgroundColor: "#131B34",
            "& fieldset": {
              borderColor: "rgba(255, 255, 255, 0.06)",
            },
            "&:hover fieldset": {
              borderColor: "rgba(255, 255, 255, 0.12)",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#5B7CFF",
            },
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          backgroundColor: "#131B34",
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "rgba(255, 255, 255, 0.06)",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "rgba(255, 255, 255, 0.12)",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#5B7CFF",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        contained: {
          backgroundColor: "#5B7CFF",
          "&:hover": {
            backgroundColor: "#7AA2FF",
          },
        },
        outlined: {
          borderColor: "rgba(255, 255, 255, 0.06)",
          color: "#A3AED0",
          "&:hover": {
            borderColor: "rgba(255, 255, 255, 0.12)",
            backgroundColor: "#131B34",
            color: "#E6E9F2",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: "#131B34",
          border: "1px solid rgba(255, 255, 255, 0.06)",
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: "#A3AED0",
          "&.Mui-checked": {
            color: "#5B7CFF",
          },
        },
      },
    },
    MuiRadio: {
      styleOverrides: {
        root: {
          color: "#A3AED0",
          "&.Mui-checked": {
            color: "#5B7CFF",
          },
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            backgroundColor: "#131B34",
          },
        },
      },
    },
  },
});


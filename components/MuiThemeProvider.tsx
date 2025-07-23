"use client";

import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";

const theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "rgb(234, 237, 243)",
          position: "relative"
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: { backgroundColor: "#0386F4" },
      },
    },
  },
});

export default function MuiThemeProvider({children}: {children: React.ReactNode}) {
    return (
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
    );
}
"use client";

import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { createContext } from "react";

const queryClient = new QueryClient();

const theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "rgb(234, 237, 243)",
          position: "relative",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: { backgroundColor: "#0386F4" },
      },
    },
  },
});

const DataContext = createContext<any>({});

export default function AppProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryClientProvider client={queryClient}>
      <DataProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </DataProvider>
    </QueryClientProvider>
  );
}

function DataProvider({ children }: { children: React.ReactNode }) {
  const fetchData = async () => {};

  const { data= {} } = useQuery({
    queryKey: ["key"],
    queryFn: fetchData,
    enabled: true,
  });

  return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
}

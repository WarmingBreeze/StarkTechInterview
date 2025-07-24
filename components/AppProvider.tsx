"use client";

import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { createContext, useState } from "react";

interface ParamsType {
  startYear: string;
  endYear: string;
}

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
  const [params, setParams] = useState<ParamsType>(
    {
      startYear: "2020",
      endYear: "2022"
    }
  );
  const fetchData = async () => {
    const response = await fetch(
      `/api?dataset=TaiwanStockMonthRevenue&data_id=2330&start_date=${params.startYear}-11-01&end_date=${params.endYear}-11-30`
    );

    if (!response.ok) throw new Error("Failed to fetch data");

    return response.json();
  };

  const { data = { msg: "", status: "", data: [] }, isLoading } = useQuery({
    queryKey: ["data"],
    queryFn: fetchData,
    enabled: true,
  });

  console.log("data: ", JSON.stringify(data));

  if (isLoading) return <p>Loading...</p>;

  return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
}

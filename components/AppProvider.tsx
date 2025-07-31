"use client";

import {
  createTheme,
  CssBaseline,
  ThemeProvider,
} from "@mui/material";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { createContext, SetStateAction, useState } from "react";

export interface ParamsType {
  stockID: string;
  startYear: string;
  endYear: string;
}

export interface ChartDataType {
  date: string;
  stock_id: string;
  country: string;
  revenue: number;
  revenue_month: number;
  revenue_year: number;
}

export interface StockInfoType {
  industry_category: string;
  stock_id: string;
  stock_name: string;
  type: string;
  date: string;
}

interface ResponseType {
  msg: string;
  status: string;
  data: ChartDataType[] | StockInfoType[];
}

interface DataContextType {
  stockList: ResponseType;
  header: ResponseType;
  chartData: ResponseType;
  params: ParamsType;
  setParams: React.Dispatch<SetStateAction<ParamsType>>;
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
        root: {
          backgroundColor: "#0386F4",
          borderRadius: "3px",
        },
      },
    },
  },
});

export const DataContext = createContext<DataContextType>({
  stockList: {
    msg: "",
    status: "",
    data: [],
  },
  header: {
    msg: "",
    status: "",
    data: [],
  },
  chartData: {
    msg: "",
    status: "",
    data: [],
  },
  params: {
    stockID: "",
    startYear: "",
    endYear: "",
  },
  setParams: () => {},
});

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
  const [params, setParams] = useState<ParamsType>(() => {
    const currentYear = new Date().getFullYear();
    return {
      stockID: "2330",
      startYear: (currentYear - 5).toString(),
      endYear: currentYear.toString(),
    };
  });
  const fetchData =
    (targetComponent: "searchbar" | "header" | "chart") => async () => {
      let queryString: string;
      switch (targetComponent) {
        case "searchbar":
          queryString = "target=searchbar";
          break;
        case "header":
          queryString = `target=header&data_id=${params.stockID}`;
          break;
        case "chart":
          queryString = `target=chart&data_id=${
            params.stockID
          }&start_date=${String(
            parseInt(params.startYear, 10) - 1
          )}-02-01&end_date=${String(parseInt(params.endYear, 10) + 1)}-01-01`;
          break;
      }
      const response = await fetch(`/api/data?${queryString}`);

      return response.json();
    };

  const { data: stockList = { msg: "", status: "", data: [] } } =
    useQuery<ResponseType>({
      queryKey: ["searchbar"],
      queryFn: fetchData("searchbar"),
      enabled: true,
    });

  const { data: header = { msg: "", status: "", data: [] } } =
    useQuery<ResponseType>({
      queryKey: ["header", params.stockID],
      queryFn: fetchData("header"),
      enabled: !!params.stockID,
    });

  const { data: chartData = { msg: "", status: "", data: [] } } =
    useQuery<ResponseType>({
      queryKey: ["data", params.stockID, params.startYear, params.endYear],
      queryFn: fetchData("chart"),
      enabled: !!params.startYear && !!params.endYear && !!params.stockID,
    });

  return (
    <DataContext.Provider
      value={{
        stockList: stockList,
        header: header,
        chartData: chartData,
        params: params,
        setParams: setParams,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

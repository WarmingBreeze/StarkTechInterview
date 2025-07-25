"use client";

import {
  Box,
  Button,
  Divider,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
} from "@mui/material";
import HighchartsReact from "highcharts-react-official";
import Highcharts, { Options } from "highcharts";
import { useContext, useState } from "react";
import { ChartDataType, DataContext } from "./AppProvider";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { calcYoY } from "@/lib/util";

const options = (data: ChartDataType[]): Options => ({
  chart: {
    spacingTop: 50,
  },
  title: {
    text: "",
  },
  yAxis: [
    { title: { text: "千元", align: "high", rotation: 0, y: -20, x: 40 } },
    {
      title: { text: "%", align: "high", rotation: 0, y: -20, x: -25 },
      opposite: true,
    },
  ],
  xAxis: {
    categories: data
      .map((obj) => obj.revenue_year + "/" + obj.revenue_month)
      .slice(12),
    labels: {
      step: 12,
      formatter: function () {
        return (this.value as string).split("/")[0];
      },
    },
  },
  credits: {
    enabled: false,
  },
  legend: {
    align: "left",
    verticalAlign: "top",
    floating: true,
    x: 80,
    y: -25,
  },
  series: [
    {
      type: "column",
      name: "每月營收",
      data: data.map((obj) => obj.revenue).slice(12),
      yAxis: 0,
      borderColor: "rgb(232, 175, 0)",
      color: "rgba(232, 175, 0, 0.4)",
      borderRadius: 0,
    },
    {
      type: "line",
      name: "單月營收年增率%",
      data: calcYoY(data.map((obj) => obj.revenue)),
      yAxis: 1,
      color: "rgb(203, 75, 75)",
      marker: {
        enabled: false,
      },
    },
  ],
});

const rangeMenuStyles = {
  backgroundColor: "#0386F4",
  color: "#FFF",
  "& .MuiSelect-icon": {
    color: "#FFF"
  }
};

const selectStyles = {
  fontSize: "13px",
  fontWeight: "700px",
  backgroundColor: "#FFF",
  "& .MuiSelect-select": {
    padding: "3px",
  },
};

const rangeBoxStyles = {
  whiteSpace: "nowrap",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "12px 18px",
};

const rangeLabelStyles = { fontSize: "13px", fontWeight: "700" };

export default function Chart() {
  const { chartData, params, setParams } = useContext(DataContext);
  const { data } = chartData;
  const [range, setRange] = useState<"3" | "5" | "8" | "custom">("5");
  const [rangeMenuOpen, setRangeMenuOpen] = useState<boolean>(false);
  const [customRange, setCustomRange] = useState<{startYear: string; endYear: string;}>({
    startYear: params.startYear,
    endYear: params.endYear,
  });

  const currentYear = new Date().getFullYear();

  const handleChange = (e: SelectChangeEvent) => {
    const value = e.target.value;
    switch (value) {
      case "3":
      case "5":
      case "8":
        setParams((prev) => ({
          ...prev,
          startYear: (currentYear - parseInt(value, 10)).toString(),
          endYear: currentYear.toString(),
        }));
        break;
      case "custom":
        setRangeMenuOpen(true);
        break;
      default:
        throw new Error("Data period out of range");
    }
    setRange(value as "3" | "5" | "8" | "custom");
  };

  const handleCutom =
    (startOrEnd: "startYear" | "endYear") => (e: SelectChangeEvent) => {
      const value = e.target.value;
      setCustomRange((prev) => ({
        ...prev,
        [startOrEnd]: value,
      }));
    };

  const handleClick = () => {
    setParams((prev) => ({
      ...prev,
      startYear: customRange.startYear,
      endYear: customRange.endYear,
    }));
    setRangeMenuOpen(false);
  };

  return (
    <Box
      sx={{
        width: "717px",
        height: "480px",
        backgroundColor: "#FFFFFF",
        padding: "15px 18px",
        position: "relative",
      }}
    >
      <Stack direction="row" justifyContent="space-between">
        <Button variant="contained">每月營收</Button>
        {!rangeMenuOpen ? (
          <Select
            size="small"
            IconComponent={KeyboardArrowDownIcon}
            value={range}
            onChange={handleChange}
            sx={rangeMenuStyles}
          >
            <MenuItem value="3">近 3 年</MenuItem>
            <MenuItem value="5">近 5 年</MenuItem>
            <MenuItem value="8">近 8 年</MenuItem>
            <MenuItem value="custom">自訂</MenuItem>
          </Select>
        ) : (
          <></>
        )}
        {rangeMenuOpen ? (
          <Box
            sx={{
              backgroundColor: "#434343",
              width: "160px",
              height: "140px",
              position: "absolute",
              top: "15px",
              right: "18px",
              zIndex: 2,
              color: "#FFFFFF",
              borderRadius: "3px",
            }}
          >
            <Box sx={rangeBoxStyles}>
              <Typography sx={rangeLabelStyles}>起始年度：</Typography>
              <Select
                size="small"
                value={customRange.startYear}
                onChange={handleCutom("startYear")}
                sx={selectStyles}
              >
                {new Array(currentYear - 2002).fill("").map((_, idx) => (
                  <MenuItem value={String(2003 + idx)}>
                    {String(2003 + idx)}
                  </MenuItem>
                ))}
              </Select>
            </Box>
            <Box sx={rangeBoxStyles}>
              <Typography sx={rangeLabelStyles}>結束年度：</Typography>
              <Select
                size="small"
                value={customRange.endYear}
                onChange={handleCutom("endYear")}
                sx={selectStyles}
              >
                {new Array(currentYear - 2002).fill("").map((_, idx) => (
                  <MenuItem
                    disabled={String(2003 + idx) <= customRange.startYear}
                    value={String(2003 + idx)}
                  >
                    {String(2003 + idx)}
                  </MenuItem>
                ))}
              </Select>
            </Box>
            <Divider />
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button
                size="small"
                variant="outlined"
                onClick={handleClick}
                sx={{ backgroundColor: "#FFF" }}
              >
                確定
              </Button>
            </Box>
          </Box>
        ) : (
          <></>
        )}
      </Stack>
      <Box sx={{ zIndex: 1 }}>
        <HighchartsReact
          highcharts={Highcharts}
          options={options(data as ChartDataType[])}
        />
      </Box>
    </Box>
  );
}

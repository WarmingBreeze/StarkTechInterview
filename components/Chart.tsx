"use client";

import { Box, Button, MenuItem, Select, SelectChangeEvent, Stack } from "@mui/material";
import HighchartsReact from "highcharts-react-official";
import Highcharts, { Options } from "highcharts";
import { useState } from "react";

const options: Options = {
  title: {
    text: "Test Chart",
  },
  yAxis: [
    { title: { text: "千元" } },
    { title: { text: "%" }, opposite: true },
  ],
  xAxis: {
    categories: ["2019", "2020", "2021", "2022", "2023", "2024"],
  },
  credits: {
    enabled: false
  },
  legend: {
    align: "left",
    verticalAlign: "top",
    floating: true,
    x: 50,
    y: 40
  },
  series: [
    {
      type: "column",
      name: "每月營收",
      data: [100, 200, 300, 150, 900, 630],
      yAxis: 0,
    },
    {
      type: "line",
      name: "單月營收年增率%",
      data: [12.1, 100, 50, -50, 600, -30],
      yAxis: 1,
    },
  ],
};



export default function Chart() {
  const [range, setRange] = useState<"3" | "5" | "8" | "custom">("5");
  function handleChange (e: SelectChangeEvent) {
    setRange(e.target.value as "3" | "5" | "8" | "custom");
  }
  return (
    <Box
      sx={{
        width: "717px",
        height: "480px",
        backgroundColor: "#FFFFFF",
        padding: "15px 18px",
      }}
    >
      <Stack direction="row" justifyContent="space-between">
        <Button variant="contained">每月營收</Button>
        <Select
          size="small"
          value={range}
          onChange={handleChange}
        >
          <MenuItem value="3">近 3 年</MenuItem>
          <MenuItem value="5">近 5 年</MenuItem>
          <MenuItem value="8">近 8 年</MenuItem>
          <MenuItem value="custom">自訂</MenuItem>
        </Select>
      </Stack>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </Box>
  );
}

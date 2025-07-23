"use client";

import { Box, Button, Stack } from "@mui/material";
import HighchartsReact from "highcharts-react-official";
import Highcharts, { Options } from "highcharts";

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
        <Button variant="contained">近五年</Button>
      </Stack>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </Box>
  );
}

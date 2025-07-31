"use client";

import { Box, Typography } from "@mui/material";
import { useContext } from "react";
import { DataContext, StockInfoType } from "./AppProvider";

export default function Header() {
  const { header } = useContext(DataContext);
  const { data } = header;

  let caption = "";
  if (data.length > 0) {
    caption = `${(data as StockInfoType[])[0].stock_name} (${
      (data as StockInfoType[])[0].stock_id
    })`;
  }

  return (
    <Box
      sx={{
        width: "717px",
        height: "38px",
        padding: "7px 15px",
        backgroundColor: "#FFFFFF",
        borderRadius: "4px",
      }}
    >
      <Typography sx={{fontSize: "18px", color: "#434343", fontWeight: 700}}>{caption}</Typography>
    </Box>
  );
}

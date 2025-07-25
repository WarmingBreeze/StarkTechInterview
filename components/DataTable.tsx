"use client";

import {
  Box,
  Button,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useContext, useEffect, useRef } from "react";
import { ChartDataType, DataContext } from "./AppProvider";
import { numberFormat } from "highcharts";
import { calcYoY } from "@/lib/util";

const tableCellStyles = {
  whiteSpace: "nowrap",
  width: "auto",
  border: "1px solid #e3e3e3",
  padding: "12px 18px",
};

export default function DataTable() {
  const { chartData } = useContext(DataContext);
  const { data } = chartData;
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (el) {
        el.scrollLeft = el.scrollWidth;
    }
  }, [data])

  return (
    <Box
      sx={{
        width: "717px",
        height: "260px",
        backgroundColor: "#FFFFFF",
        marginBottom: "20px",
      }}
    >
      <Stack direction="row" sx={{ padding: "15px 18px" }}>
        <Button variant="contained">詳細數據</Button>
      </Stack>
      <TableContainer ref={containerRef}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  ...tableCellStyles,
                  backgroundColor: "#F6F8FA",
                  position: "sticky",
                  left: 0,
                  zIndex: 2
                }}
              >
                <Typography>年度月份</Typography>
              </TableCell>
              <TableCell
                sx={{
                  width: "5px",
                  minWidth: "5px",
                  maxWidth: "5px",
                  padding: 0,
                  backgroundColor: "#FFF",
                  borderBottom: "none"
                }}
              />
              {(data as ChartDataType[]).slice(12).map((obj, idx) => (
                <TableCell
                  key={`date-${idx}`}
                  sx={{ ...tableCellStyles, backgroundColor: "#F6F8FA" }}
                  align="right"
                >{`${obj.revenue_year.toString()}${obj.revenue_month
                  .toString()
                  .padStart(2, "0")}`}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell
                sx={{
                  ...tableCellStyles,
                  position: "sticky",
                  left: 0,
                  backgroundColor: "#FFF",
                  zIndex: 2
                }}
              >
                <Typography>每月營收</Typography>
              </TableCell>
              <TableCell
                sx={{
                  width: "5px",
                  minWidth: "5px",
                  maxWidth: "5px",
                  padding: 0,
                  backgroundColor: "#FFF",
                  borderBottom: "none"
                }}
              />
              {(data as ChartDataType[]).slice(12).map((obj, idx) => (
                <TableCell
                  key={`rev-${idx}`}
                  sx={tableCellStyles}
                  align="right"
                >
                  {numberFormat(obj.revenue, 0, ".", ",")}
                </TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell
                sx={{
                  ...tableCellStyles,
                  backgroundColor: "#F6F8FA",
                  position: "sticky",
                  left: 0,
                  zIndex: 2
                }}
              >
                <Typography>單月營收年增率(%)</Typography>
              </TableCell>
              <TableCell
                sx={{
                  width: "5px",
                  minWidth: "5px",
                  maxWidth: "5px",
                  padding: 0,
                  backgroundColor: "#FFF",
                  borderBottom: "none"
                }}
              />
              {calcYoY((data as ChartDataType[]).map((obj) => obj.revenue)).map(
                (yoy, idx) => (
                  <TableCell
                    key={`yoy-${idx}`}
                    sx={{ ...tableCellStyles, backgroundColor: "#F6F8FA" }}
                    align="right"
                  >
                    {numberFormat(yoy, 2, ".", ",")}
                  </TableCell>
                )
              )}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

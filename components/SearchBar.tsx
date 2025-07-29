"use client";

import {
  Box,
  Divider,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useContext, useRef, useState } from "react";
import { DataContext, StockInfoType } from "./AppProvider";

export default function SearchBar() {
  const { stockList } = useContext(DataContext);
  const { data } = stockList;
  const searchable: string[] = [
    ...new Set(
      (data as StockInfoType[]).map((o) => `${o.stock_id}-${o.stock_name}`)
    ),
  ];
  const [inputValue, setInputValue] = useState("");
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const inputRef = useRef(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.currentTarget.value;
    setInputValue(value);
    handleSearch(value);
  }

  function handleKeydown(e: React.KeyboardEvent<HTMLInputElement>) {
    const key = e.key;
    if (key === "Enter") handleSearch(inputValue);
  }

  function handleSearch(value: string) {
    if (!!value) {
      const results = searchable.filter((str) => str.includes(value));
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }
  return (
    <Box
      sx={{
        backgroundColor: "#FFFFFF",
        width: "100%",
        height: "60px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: "1",
      }}
    >
      <FormControl variant="outlined" size="small">
        <InputLabel htmlFor="outlined-adornment-password">
          輸入台 / 美股代號，查看公司價值
        </InputLabel>
        <OutlinedInput
          ref={inputRef}
          value={inputValue}
          onChange={handleChange}
          onKeyDown={handleKeydown}
          id="outlined-adornment-password"
          endAdornment={
            <InputAdornment position="end">
              <IconButton onClick={() => handleSearch(inputValue)}>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          }
          label="輸入台 / 美股代號，查看公司價值"
          sx={{ width: "320px" }}
        />
      </FormControl>
      {searchResults.length > 0 && (
        <Stack
          sx={{
            position: "absolute",
            top: "50px",
            width: "320px",
            border: "1px solid #dfdfdf",
            backgroundColor: "#FFF",
          }}
        >
          <Divider textAlign="left">查詢個股</Divider>
          {searchResults.map((str, idx) => (
            <button key={idx}>{`${str.split("-")[0]} ${
              str.split("-")[1]
            }`}</button>
          ))}
        </Stack>
      )}
    </Box>
  );
}

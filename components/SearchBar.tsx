"use client";

import {
  Box,
  Divider,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  OutlinedInput,
  Stack,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useContext, useRef, useState } from "react";
import { DataContext, StockInfoType } from "./AppProvider";

export default function SearchBar() {
  const { stockList, setParams } = useContext(DataContext);
  const { data } = stockList;
  const searchable: string[] = [
    ...new Set(
      (data as StockInfoType[]).map((o) => `${o.stock_id} ${o.stock_name}`)
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
    if (key === "Escape") resetSearch();
  }

  function handleSearch(value: string) {
    if (!!value) {
      const results = searchable.filter((str) => str.includes(value));
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }

  const handleClick = (value: string) => () => {
    console.log("value: ", value);
    setParams((prev) => {
      return {
        ...prev,
        stockID: value,
      };
    });
  };

  function resetSearch() {
    setInputValue("");
    setSearchResults([]);
  }

  return (
    <>
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
          <OutlinedInput
            ref={inputRef}
            value={inputValue}
            onChange={handleChange}
            onKeyDown={handleKeydown}
            id="stock-name-or-ticker"
            endAdornment={
              <InputAdornment position="end">
                <IconButton onClick={() => handleSearch(inputValue)}>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            }
            placeholder="輸入台 / 美股代號，查看公司價值"
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
              maxHeight: "60vh",
              overflow: "auto",
              scrollBehavior: "smooth",
            }}
          >
            <Divider
              textAlign="left"
              sx={{
                fontSize: "13px",
                fontWeight: 700,
                color: "#9d9d9d",
                margin: "4px 0",
              }}
            >
              查詢個股
            </Divider>
            <List>
              {searchResults.map((str, idx) => (
                <ListItem key={idx} disablePadding disableGutters>
                  <ListItemButton onClick={handleClick(str.split(" ")[0])}>
                    <ListItemText
                      primary={<>
                        {str.split(inputValue)[0] && <span style={{fontWeight: 700, fontSize: "15px"}}>{str.split(inputValue)[0]}</span>}
                        {<span style={{color: "#0386F4",fontWeight: 700, fontSize: "15px"}}>{inputValue}</span>}
                        {str.split(inputValue)[1] && <span style={{fontWeight: 700, fontSize: "15px"}}>{str.split(inputValue)[1]}</span>}
                      </>}
                      sx={{}}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Stack>
        )}
      </Box>
    </>
  );
}

"use client";

import { Box, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { useContext, useState } from "react";
import { DataContext } from "./AppProvider";

export default function SearchBar () {
    const { stockList } = useContext(DataContext);
    const {data} = stockList;
    const [inputValue, setInputValue] = useState("");
    
    console.log("stockList: ", JSON.stringify(data));

    function handleChange (e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.currentTarget.value;
        setInputValue(value);
    }

    function handleKeydown (e: React.KeyboardEvent<HTMLInputElement>) {
        const key = e.key;
        if (key === "Enter") handleSearch(inputValue);
    }

    function handleSearch (value: string) {
        console.log("Searching: ", value);
    }
    return (
        <Box sx={{backgroundColor: "#FFFFFF", width: "100%", height: "60px", display: "flex", justifyContent: "center", alignItems: "center", position: "absolute", top: 0, left: 0}}>
            <FormControl variant="outlined" size="small">
                <InputLabel htmlFor="outlined-adornment-password">輸入台 / 美股代號，查看公司價值</InputLabel>
                <OutlinedInput
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
                    sx={{width: "320px"}}
                />
            </FormControl>
        </Box>
    );
}
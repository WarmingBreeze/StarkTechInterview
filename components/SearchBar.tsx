import { Box, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

export default function SearchBar () {
    return (
        <Box sx={{backgroundColor: "#FFFFFF", width: "100%", height: "60px", display: "flex", justifyContent: "center", alignItems: "center"}}>
            <FormControl variant="outlined" size="small">
                <InputLabel htmlFor="outlined-adornment-password">輸入台 / 美股代號，查看公司價值</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-password"
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton>
                                <SearchIcon />
                            </IconButton>
                        </InputAdornment>
                    }
                    label="輸入台 / 美股代號，查看公司價值"
                    sx={{width: "399px"}}
                />
            </FormControl>
        </Box>
    );
}
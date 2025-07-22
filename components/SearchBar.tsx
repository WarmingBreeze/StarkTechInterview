import { Box, FormControl, IconButton, InputAdornment, OutlinedInput, TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

export default function SearchBar () {
    return (
        <Box sx={{outline: "2px solid blue", width: "100%", height: "60px", display: "flex", justifyContent: "center", alignItems: "center"}}>
            <FormControl variant="outlined" size="small">
                <OutlinedInput
                    id="outlined-adornment-password"
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton>
                                <SearchIcon />
                            </IconButton>
                        </InputAdornment>
                    }
                />
            </FormControl>
        </Box>
    );
}
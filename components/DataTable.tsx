import { Box, Button, Stack } from "@mui/material";

export default function DataTable() {
    return (
        <Box sx={{width: "717px", height: "310px", backgroundColor: "#FFFFFF"}}>
            <Stack direction="row" sx={{padding: "15px 18px"}}>
                <Button variant="contained">詳細數據</Button>
            </Stack>

        </Box>
    );
}
import Tabel from "../../components/ShowData/Tabel"
import { Box } from "@mui/material";
export const ShowDataPage = () => {
    return (
        <>
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
            // marginTop="10%"
            >
            <img src="/logo.png" alt="Logo" style={{ width: '150px', height: 'auto' }} />
            </Box>
            <Box mt={5}>
                <Tabel />
            </Box>

        </>
    );
};

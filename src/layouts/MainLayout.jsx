
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MainLayout = () => {
    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                overflowX: "clip",
            }}
        >
            <Navbar />

            <Box component="main" sx={{ flex: 1 }}>
                <Outlet />
            </Box>

            <Footer />
        </Box>
    );
};

export default MainLayout;

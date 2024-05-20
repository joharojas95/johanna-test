import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";


export default function ContentComponent({ children }) {
    return (
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <Toolbar />
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    maxWidth: { xs: "100%", lg: "40%" },
                }}
            >
                {children}
            </Box>
        </Box>
    );
}

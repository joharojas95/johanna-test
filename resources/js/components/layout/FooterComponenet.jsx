import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

export default function FooterComponent({ drawerWidth }) {
    return (
        <Paper
            sx={{
                position: "fixed",
                bottom: 0,
                left: { xs: 0, sm: `${drawerWidth}px` },
                right: 0,
                p: 2,
                bgColor: "#e5e5e5",
            }}
            elevation={3}
        >
            <Typography fontSize={{ xs: 10, lg: 16 }}>
                NEX@{new Date().getFullYear()} - Consultas{" "}
                <a href="mailto:varanda@nex.es">varanda@nex.es</a> | Realizado
                por: Johanna Rojas
            </Typography>
        </Paper>
    );
}

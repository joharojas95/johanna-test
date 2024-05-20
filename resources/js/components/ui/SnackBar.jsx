import { Snackbar, Typography, Alert } from "@mui/material";

export default function SnackBar(props) {
    const { show, onClose, type, message } = props;

    return (
        <Snackbar
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            open={show}
            autoHideDuration={5000}
            onClose={onClose}
            sx={{ mb: 5 }}
        >
            <Alert
                onClose={onClose}
                severity={type}
                sx={{ bgcolor: "#414042", color: "#FFF" }}
            >
                <Typography variant="body2" color="#FFF">
                    {message}
                </Typography>
            </Alert>
        </Snackbar>
    );
}

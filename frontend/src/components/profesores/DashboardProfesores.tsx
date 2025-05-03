import { Box, Typography } from "@mui/material";

export default function FullScreenDashboard() {
    return (
        <Box
            sx={{
                width: "100vw",
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
                padding: 2
            }}
        >
            <Typography variant="h4" align="center" gutterBottom>
                Dashboard Profesores
            </Typography>
            <Box
                sx={{
                    width: "80%",  //  dashboard más pequeño
                    height: "85vh",  //  altura para mejor visibilidad
                    borderRadius: "10px",
                    overflow: "hidden",
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)"
                }}
            >
                <iframe
                    src="https://lookerstudio.google.com/embed/reporting/31ea516c-f9f4-4b77-85d2-c919b625d9bb/page/J4SIF" // El enlace de tu Looker Studio
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    style={{ border: 0, borderRadius: "10px" }}
                    allowFullScreen
                ></iframe>
            </Box>
        </Box>
    );
}

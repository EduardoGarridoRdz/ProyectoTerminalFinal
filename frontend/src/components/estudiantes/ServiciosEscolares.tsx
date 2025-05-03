import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import SubirExcel from "./SubirExcel";
import DarFormato from "./BotonFormato";

export default function ServiciosEscolares() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Ajustamos las dimensiones del iframe con márgenes
  const iframeWidth = Math.min(windowSize.width * 0.92, 1920); // 95% del ancho o máximo 1800px
  const iframeHeight = Math.min(windowSize.height * 0.9, 1080); // 90% del alto o máximo 1000px

  return (
    <Box>
      <Grid container spacing={2} sx={{ pl: 2, pt: 2 }}>
        <Grid container columnSpacing={10} sx={{ pl: windowSize.width / 26, pt: 1 }}>
          <SubirExcel />
          <DarFormato />
        </Grid>
        <Grid container justifyContent="center">
          <iframe
            src="https://lookerstudio.google.com/embed/reporting/19b4d7b4-d026-4d42-bed0-b124173021e7/page/p_vocd4ud8qd"
            title="Reporte Servicios Escolares"
            allowFullScreen
            style={{
              flex: 1,
              border: 0,
              width: `${iframeWidth}px`,
              height: `${iframeHeight}px`,
              position: "relative",
            }}
            loading="lazy"
            sandbox="allow-storage-access-by-user-activation 
                    allow-scripts allow-same-origin 
                    allow-popups allow-downloads
                    allow-popups-to-escape-sandbox"
          />
        </Grid>
      </Grid>
    </Box>
  );
}

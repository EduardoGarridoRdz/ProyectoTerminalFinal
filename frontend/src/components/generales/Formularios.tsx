import React, { useState, useEffect } from "react";
import { createTheme } from "@mui/material/styles";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { useDemoRouter } from "@toolpad/core/internal";
import Formulario from "../profesores/Formulario";
import logouni from "../../assets/logo.png"; // Ensure the path is correct
import Producto from "../profesores/Producto_inv.tsx";
import Direccion from "../profesores/Direccion";
import Formacion from "../profesores/FormacionPersonal";
import Proyecto from "../profesores/ProyectosInvestigacion";
import Personal from "../profesores/FormacionIntegral.tsx";
import Vinculacion from "../profesores/ActividadVinculacion";
import { Tabs, Tab, Box } from "@mui/material";
import getNavigationProfesores from "./NavegacionProfesores.tsx";

const NAVIGATION = getNavigationProfesores();


const BRANDING = {
    logo: (
        <img
            src={logouni}
            alt="Universidad del Caribe"
            style={{ height: 50, width: 40 }}
        />
    ),
    title: "Sistema de formularios del profesorado",
};

const demoTheme = createTheme({
    cssVariables: {
        colorSchemeSelector: "data-toolpad-color-scheme",
    },
    colorSchemes: { light: true, dark: true },
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 600,
            lg: 1200,
            xl: 1536,
        },
    },
});

function DemoPageContent({ pathname }: { pathname: string }) {
    const [tabIndex, setTabIndex] = useState(0); // Add state for tabIndex
    useEffect(() => {
        setTabIndex(0);
    }, [pathname]);

    const getDepartamentoFromPath = () => {
        if (pathname.startsWith("/profesores/")) {
            const parts = pathname.split("/");
            if (parts.length >= 3) {
                return parts[2];
            }
        }
        return "/inicio";
    };
    const currentDepartamento = getDepartamentoFromPath();

    if (pathname === "/salir") {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("tipoUsuario");
        window.location.href = "/login"; // Redirigir a la página de inicio de sesión
    }

    return (
        <>
            {pathname === "/profesores/formulario" && <Formulario />}

            {pathname === "/profesores/ciencias-basicas" && (
                <Box sx={{ width: "100%" }} key={pathname}>
                    <Tabs
                        value={tabIndex}
                        onChange={(_event: React.SyntheticEvent, newValue: number) => setTabIndex(newValue)}
                        centered
                    >
                        <Tab label="Formación Integral" />
                        <Tab label="Actividad de Vinculación" />
                        <Tab label="Dirección de Tesis" />
                    </Tabs>
                    <Box sx={{ mt: 2 }}>
                        {tabIndex === 0 && <Personal departamento={currentDepartamento} />}
                        {tabIndex === 1 && <Vinculacion departamento={currentDepartamento} />}
                        {tabIndex === 2 && <Direccion departamento={currentDepartamento} />}
                    </Box>
                </Box>
            )}

            {pathname === "/profesores/economia-negocios" && (
                <Box sx={{ width: "100%" }} key={pathname}>
                    <Tabs
                        value={tabIndex}
                        onChange={(_event: React.SyntheticEvent, newValue: number) => setTabIndex(newValue)}
                        centered
                    >
                        <Tab label="Formación Integral" />
                        <Tab label="Actividad de Vinculación" />
                        <Tab label="Dirección de Tesis" />
                    </Tabs>
                    <Box sx={{ mt: 2 }}>
                        {tabIndex === 0 && <Personal departamento={currentDepartamento} />}
                        {tabIndex === 1 && <Vinculacion departamento={currentDepartamento} />}
                        {tabIndex === 2 && <Direccion departamento={currentDepartamento} />}
                    </Box>
                </Box>
            )}

            {pathname === "/profesores/turismo-sustentable" && (
                <Box sx={{ width: "100%" }} key={pathname}>
                    <Tabs
                        value={tabIndex}
                        onChange={(_event: React.SyntheticEvent, newValue: number) => setTabIndex(newValue)}
                        centered
                    >
                        <Tab label="Formación Integral" departamento={currentDepartamento} />
                        <Tab label="Actividad de Vinculación" departamento={currentDepartamento} />
                        <Tab label="Dirección de Tesis" departamento={currentDepartamento} />
                    </Tabs>
                    <Box sx={{ mt: 2 }}>
                        {tabIndex === 0 && <Personal departamento={currentDepartamento} />}
                        {tabIndex === 1 && <Vinculacion departamento={currentDepartamento} />}
                        {tabIndex === 2 && <Direccion departamento={currentDepartamento} />}
                    </Box>
                </Box>
            )}

            {pathname === "/profesores/desarrollo-humano" && (
                <Box sx={{ width: "100%" }} key={pathname}>
                    <Tabs
                        value={tabIndex}
                        onChange={(_event: React.SyntheticEvent, newValue: number) => setTabIndex(newValue)}
                        centered
                    >
                        <Tab label="Formación Integral" />
                        <Tab label="Actividad de Vinculación" />
                        <Tab label="Dirección de Tesis" />
                    </Tabs>
                    <Box sx={{ mt: 2 }}>
                        {tabIndex === 0 && <Personal departamento={currentDepartamento} />}
                        {tabIndex === 1 && <Vinculacion departamento={currentDepartamento} />}
                        {tabIndex === 2 && <Direccion departamento={currentDepartamento} />}
                    </Box>
                </Box>
            )}

            {pathname === "/profesores/desarrollo-academico" && <Formacion />}

            {pathname === "/profesores/departamento-investigacion" && (
                <Box sx={{ width: "100%" }} key={pathname}>
                    <Tabs
                        value={tabIndex}
                        onChange={(_event: React.SyntheticEvent, newValue: number) => setTabIndex(newValue)}
                        centered
                    >
                        <Tab label="Proyecto de Investigación" />
                        <Tab label="Producto de Investigación" />
                    </Tabs>
                    <Box sx={{ mt: 2 }}>
                        {tabIndex === 0 && <Proyecto departamento={currentDepartamento} />}
                        {tabIndex === 1 && <Producto departamento={currentDepartamento} />}
                    </Box>
                </Box>
            )}

        </>
    );
}

interface DemoProps {
    window?: () => Window;
}

export default function Formularios(props: DemoProps) {
    const { window } = props;

    const router = useDemoRouter();

    // Remove this const when copying and pasting into your project.
    const demoWindow = window !== undefined ? window() : undefined;

    return (
        // preview-start
        <AppProvider
            navigation={NAVIGATION}
            router={router}
            branding={BRANDING}
            theme={demoTheme}
            window={demoWindow}
        >
            <DashboardLayout>
                <DemoPageContent pathname={router.pathname} />
            </DashboardLayout>
        </AppProvider>
        // preview-end
    );
}

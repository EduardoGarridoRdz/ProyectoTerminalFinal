import Typography from "@mui/material/Typography";
import { createTheme } from "@mui/material/styles";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import getNavigation from "./Navegacion";
import { useDemoRouter } from "@toolpad/core/internal";
import ServiciosEscolares from "../estudiantes/ServiciosEscolares";
import DashboardProfesores from "../profesores/DashboardProfesores";
import DashboardEstudiantes from "../estudiantes/DashboardEstudiantes";
import Estudiantes from "../estudiantes/Estudiantes";

const NAVIGATION = getNavigation();

const BRANDING = {
  logo: "",
  title: "Departamento de planeación",
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
  return (
    <>
      <Typography>{pathname}</Typography>
      {pathname === "/estudiantes" && <Estudiantes />}
      {pathname === "/estudiantes/dashboard-estudiantes" && (
        <DashboardEstudiantes />
      )}
      {pathname === "/estudiantes/servicios-escolares" && (
        <ServiciosEscolares />
      )}
      {pathname === "/profesores/dashboard-profesor" && <DashboardProfesores />}
      {pathname === "/otra-ruta" && <Typography>Esta es otra ruta</Typography>}
      {pathname === "/profesores/desarrollo-humano" && <p> hola</p>}
    </>
  );
}

interface DemoProps {
  window?: () => Window;
}

export default function PaginaInicio(props: DemoProps) {
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

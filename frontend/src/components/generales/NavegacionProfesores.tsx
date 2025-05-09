import React from "react";
import Person4Icon from "@mui/icons-material/Person4";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

// Definimos el tipo para los elementos de navegación
type HeaderItem = {
    kind: "header";
    title: string;
};

type DividerItem = {
    kind: "divider";
};

type SingleItemHijo = {
    segment: string;
    title: string;
    icon?: React.ReactNode;
};

type SingleItemPadre = {
    segment: string;
    title: string;
    icon?: React.ReactNode;
    children: SingleItemHijo[];
};


// Definimos el tipo para la navegación completa
type Navigation = (HeaderItem | DividerItem | SingleItemHijo | SingleItemPadre)[];

// Función que genera y devuelve la navegación
const getNavigationProfesores = (): Navigation => {
    return [
        {
            kind: "header",
            title: "Menú principal",
        },

        // Profesores departamentos
        {
            segment: "profesores",
            title: "Formularios",
            icon: <Person4Icon />,

            children: [
                {
                    segment: "formulario",
                    title: "Recursos Humanos",
                },
                {
                    segment: "ciencias-basicas",
                    title: "Ciencias básicas de ingeniería",
                },
                {
                    segment: "economia-negocios",
                    title: "Economía y Negocios",
                },
                {
                    segment: "turismo-sustentable",
                    title: "Turismo Sustentable, Gastronomía y Hotelería",
                },

                {
                    segment: "desarrollo-humano",
                    title: "Desarrollo Humano",
                },
                
            ],
        },

        {
            kind: "divider",
        },
        {
            kind: "header",
            title: "Cerrar Sesión",
        },
        {
            segment: "salir",
            title: "Cerrar Sesión",
            icon: <ExitToAppIcon />,
        }
    ];
};

// Exportamos la función
export default getNavigationProfesores;

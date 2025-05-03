import React, { useState, useEffect } from 'react';
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from '@mui/material/MenuItem';
import Paper from "@mui/material/Paper";
import axios from 'axios';

const tipo_usuario = [
    { value: 'Administrador', label: 'Administrador' },
    { value: 'Jefe de Departamento', label: 'Jefe de Departamento' },
    { value: 'Profesor', label: 'Profesor' }
];

const departamentos = [
    { value: 'Secretaría de Planeación y Desarrollo Institucional', label: 'Secretaría de Planeación y Desarrollo Institucional' },
    { value: 'Servicios Escolares', label: 'Servicios Escolares' },
    { value: 'Servicio Social', label: 'Servicio Social' },
    { value: 'Prácticas Profesionales', label: 'Prácticas Profesionales' },
    { value: 'Idiomas', label: 'Idiomas' },
    { value: 'Desarrollo Estudiantil', label: 'Desarrollo Estudiantil' },
    { value: 'Vinculación Universitaria', label: 'Vinculación Universitaria' },
    { value: 'Desarrollo Humano', label: 'Desarrollo Humano' },
    { value: 'Ciencias Básicas e Ingenierías', label: 'Ciencias Básicas e Ingenierías' },
    { value: 'Turismo Sustentable, Gastronomía y Hotelería', label: 'Turismo Sustentable, Gastronomía y Hotelería' },
    { value: 'Desarrollo Académico', label: 'Desarrollo Académico' },
    { value: 'Economía y Negocios', label: 'Economía y Negocios' },
    { value: 'Departamento de Investigación', label: 'Departamento de Investigación' },
    { value: 'Recursos Humanos', label: 'Recursos Humanos' }
];

type FormData = {
    nombre: string;
    apellido_pat: string;
    apellido_mat: string;
    correo: string;
    contrasena: string;
    tipo_usuario: string;
    departamento: string;
};

interface ApiResponse {
    status: string;
    data: UserData;
}

interface UserData {
    correo: string;
    nombre?: string;
    apellido_pat?: string;
    apellido_mat?: string;
    contrasena?: string;
    tipo_usuario?: string;
    departamento?: string;
}

const GestionarUsuario: React.FC = () => {
    const [correo, setEmail] = useState('');
    const [userData, setUserData] = useState<ApiResponse | null>(null);
    const [error, setError] = useState<string | null>(null);



    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch('http://127.0.0.1:8000/api/EditarUsuario/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ correo }),
            });


            if (!response.ok) {
                // Intentar obtener el mensaje de error del backend
                const errorData = await response.json().catch(() => null);
                throw new Error(errorData?.message || `Error: ${response.status}`);
            }

            const responseData: ApiResponse = await response.json();
            setUserData(responseData);
            setError(null);

        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred');
            setUserData(null);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setUserData(prev => prev ? {
            ...prev,
            data: {
                ...prev.data,
                [id]: value
            }
        } : null);
    };

    const handleSelectChange = (e: React.ChangeEvent<{ name?: string; value: unknown }>) => {
        const name = e.target.name as keyof FormData;
        const value = e.target.value as string;

        setUserData(prev => prev ? {
            ...prev,
            data: {
                ...prev.data,
                [name]: value
            }
        } : null);
    };

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.put(
                'http://127.0.0.1:8000/api/EditarUsuario/',
                JSON.stringify(userData),  // 🔥 ¡Importante! Enviar como JSON crudo
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            alert(response.data.message); // Mostrar mensaje de éxito

            setUserData(null); // Reset userData to null

        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Error del servidor:', error.response?.data);
                alert(`Error: ${JSON.stringify(error.response?.data)}`);
            }
        }
    };

    const handleDelete = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.delete(
                'http://127.0.0.1:8000/api/EditarUsuario/',
                {
                    data: userData, // Mover los datos al objeto de configuración
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            alert(response.data.message); // Mostrar mensaje de éxito
            window.location.reload(); // Recargar la página para reflejar los cambios
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Error del servidor:', error.response?.data);
                alert(`Error: ${JSON.stringify(error.response?.data)}`);
            }
        }
    };
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
    const Width = Math.min(windowSize.width * 0.92, 1920); // 92% del ancho o máximo 1800px

    return (
        <Grid container spacing={1} direction="column">
            <Paper elevation={3}
                sx={{ mx: Width * 0.01, my: 1 }}>

                <form onSubmit={handleSubmit}>

                    <Typography variant="h4" align="center"
                        sx={{ mx: 2, my: 3, fontWeight: 'bold', color: '#1976d2' }}>
                        Editar Usuario
                    </Typography>

                    <Typography align="center"
                        sx={{ my: 1, fontWeight: 'bold' }}>
                        Introduzca un correo para buscar el usuario a editar.
                    </Typography>

                    <Grid container align="center" direction="column" justifyContent="center"
                        sx={{ mx: Width * 0.01, my: 3 }}>
                        <TextField
                            sx={{ mb: 2 }}
                            type="correo"
                            label="Correo"
                            value={correo}
                            onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setEmail(e.target.value)}
                            required
                        />
                        <Grid>
                            <Button type="submit" variant="contained" sx={{ width: Width * 0.15 }}>Buscar</Button>
                        </Grid>
                    </Grid>
                </form>

                {error && <Typography align="center" variant="body1"
                    sx={{ mx: 1, my: 1, fontWeight: 'bold' }}
                    style={{ color: 'red' }}>
                    {error}
                </Typography>}

                {userData?.data && (
                    <form onSubmit={handleUpdate}>
                        <Typography align="center" variant="body1"
                            sx={{ my: 2, fontWeight: 'bold' }}>
                            Actualizar usuario:
                        </Typography>

                        <Grid container direction="row" align="center" justifyContent="center">
                            <Grid align="center" sx={{ mx: Width * 0.01, my: 1 }}>
                                <Typography sx={{ my: 1 }}>
                                    Nombre
                                </Typography>
                                <TextField
                                    id='nombre'
                                    name='nombre'
                                    onChange={handleChange}
                                    value={userData.data.nombre}
                                    size="normal" />

                                <Typography sx={{ my: 1 }}>
                                    Apellido Paterno
                                </Typography>
                                <TextField
                                    id='apellido_pat'
                                    name='apellido_pat'
                                    fullWidth={true}
                                    onChange={handleChange}
                                    value={userData.data.apellido_pat} />

                                <Typography sx={{ my: 1 }}>
                                    Apellido Materno
                                </Typography>
                                <TextField
                                    id='apellido_mat'
                                    name='apellido_mat'
                                    onChange={handleChange}
                                    value={userData.data.apellido_mat} />
                            </Grid>

                            <Grid align="center" sx={{ mx: Width * 0.01, my: 1, }}>
                                <Typography sx={{ my: 1 }}>
                                    Correo
                                </Typography>
                                <TextField
                                    id='correo'
                                    name='correo'
                                    onChange={handleChange}
                                    value={userData.data.correo}
                                    disabled={true} />

                                <Typography sx={{ my: 1 }}>
                                    Contraseña
                                </Typography>
                                <TextField
                                    id='contrasena'
                                    name='contrasena'
                                    onChange={handleChange}
                                    value={userData.data.contrasena} />
                            </Grid>


                            <Grid align="center" sx={{ mx: Width * 0.01, my: 1, }}>
                                <Typography>
                                    Tipo de usuario
                                </Typography>
                                <TextField
                                    id='tipo_usuario'
                                    name='tipo_usuario'
                                    select={true}
                                    fullWidth={true}
                                    value={userData.data.tipo_usuario}
                                    onChange={handleSelectChange}
                                >
                                    {tipo_usuario.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>

                                <Typography>
                                    Departamento
                                </Typography>
                                <TextField
                                    id='departamento'
                                    name='departamento'
                                    select={true}
                                    fullWidth={true}
                                    value={userData.data.departamento}
                                    onChange={handleSelectChange}

                                >
                                    {departamentos.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>

                                <Button
                                    type="submit"
                                    variant="contained"
                                    sx={{ mt: 2, width: "200px" }}
                                >
                                    Actualizar
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                )}
                {userData?.data && (
                    <form onSubmit={handleDelete}>
                        <Grid align="center" sx={{ mx: Width * 0.01, my: 1, }}>
                            <Button
                                type="submit"
                                variant="contained"
                                onSubmit={handleDelete}
                                sx={{ width: "200px", backgroundColor: "red" }}
                            >
                                Eliminar
                            </Button>
                        </Grid>
                    </form>)}
            </Paper>
        </Grid>
    );
};

export default GestionarUsuario;
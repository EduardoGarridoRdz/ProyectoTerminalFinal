import React, { useState, useEffect } from "react";
import {
    TextField,
    Button,
    Typography,
    Box,
    Container,
    Paper,
    Grid,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    Snackbar,
    Alert,
} from "@mui/material";

import axios from "axios";

interface PersonalProps {
    departamento: string;
}

const ProyectoTerminal: React.FC<PersonalProps> = ({ departamento }) => {
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [formData, setFormData] = useState({
        nombrePT: "",
        estudiantesPT: "",
        directorPT: "",
        faseProyecto: "",
        departamentoAcademico: departamento,
    });

    const [fases, setFases] = useState<
        { id: number; nombre: string }[]
    >([]);

    useEffect(() => {
        axios
            .get("http://127.0.0.1:8000/api/fase_proyecto/")
            .then((res) => {
                const data = res.data.map((fase: any) => ({
                    id: fase.id_fase_proyecto,
                    nombre: fase.fase
                }));
                setFases(data);
            })
            .catch((err) => {
                console.error("Error al obtener fases", err);
            });
    }, []);

    const [nombresProfesores, setnombresProfesores] = useState<
        { id: number; nombre: string }[]
    >([]);

    useEffect(() => {
        axios
            .get("http://127.0.0.1:8000/api/profesor/")
            .then((res) => {
                const data = res.data.map((prof: any) => ({
                    id: prof.id_profesor,
                    nombre: prof.nombre_profesor,
                    apellidoPatProfesor: prof.apellido_pat_profesor,
                    apellidoMatProfesor: prof.apellido_mat_profesor,
                }));
                setnombresProfesores(data);
            })
            .catch((err) => {
                console.error("Error al obtener profesores", err);
            });
    }, []);

    const handleChange = (
        e:
            | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            | SelectChangeEvent
    ) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const id_profesor = nombresProfesores.find(
            (d) => d.nombre === formData.directorPT
        )?.id;
        const id_fase_proyecto = fases.find(
            (f) => f.nombre === formData.faseProyecto
        )?.id;

        const payload = {
            nombre_proyecto: formData.nombrePT,
            estudiantes_participantes: formData.estudiantesPT,
            id_profesor: id_profesor,
            id_fase_proyecto: id_fase_proyecto,
            departamento_academico: formData.departamentoAcademico,
        };
        try {
            const response = await fetch("http://127.0.0.1:8000/api/proyecto_tesis/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Error al enviar el formulario: ${errorText}`);
            }
            setSnackbarMessage("Información registrada correctamente.");
            setOpenSnackbar(true);
            setFormData({
                nombrePT: "",
                estudiantesPT: "",
                directorPT: "",
                faseProyecto: "",
                departamentoAcademico: departamento,
            });
        }
        catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <Container maxWidth="md">
            <Paper sx={{ p: 4 }}>
                <Typography variant="h6" gutterBottom align="center">
                    <strong>Dirección de Tesis</strong>
                </Typography>
                <br />
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2} direction="column">
                        <Grid item xs={12}>
                            <TextField
                                label="Nombre del proyecto"
                                name="nombrePT"
                                value={formData.nombrePT}
                                onChange={handleChange}
                                fullWidth
                                required
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                label="NEstudiantes participantes"
                                name="estudiantesPT"
                                value={formData.estudiantesPT}
                                onChange={handleChange}
                                fullWidth
                                multiline
                                required
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <FormControl fullWidth required>
                                <InputLabel>Director PT</InputLabel>
                                <Select
                                    name="directorPT"
                                    value={formData.directorPT}
                                    label="Director PT"
                                    onChange={handleChange}
                                >
                                    {nombresProfesores.map((prof) => (
                                        <MenuItem key={prof.id} value={prof.nombre}>
                                            {`${prof.nombre} ${prof.apellidoPatProfesor} ${prof.apellidoMatProfesor}`}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12}>
                            <FormControl fullWidth required>
                                <InputLabel>Fase del Proyecto</InputLabel>
                                <Select
                                    name="faseProyecto"
                                    value={formData.faseProyecto}
                                    label="Fase del Proyecto"
                                    onChange={handleChange}
                                >
                                    {fases.map((fase) => (
                                        <MenuItem key={fase.id} value={fase.nombre}>
                                            {fase.nombre}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12}>
                            <Box textAlign="center">
                                <Button type="submit" variant="contained">
                                    Enviar Información
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={() => setOpenSnackbar(false)}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            >
                <Alert
                    onClose={() => setOpenSnackbar(false)}
                    severity="success"
                    sx={{ width: "100%" }}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default ProyectoTerminal;

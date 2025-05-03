import React, { useState, useEffect } from "react";
import {
    TextField,
    Button,
    Container,
    Paper,
    Grid,
    Typography,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Snackbar,
    Alert,
    SelectChangeEvent,
    Box,
} from "@mui/material";

import axios from "axios";

const FormularioCapacitacion = () => {
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [formData, setFormData] = useState({
        nombreProfesor: "",
        evento: "",
        sede: "",
        organizador: "",
        fechaInicio: "",
        fechaFinal: "",
    });

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
            (d) => d.nombre === formData.nombreProfesor
        )?.id;

        const payload = {
            id_profesor: id_profesor,
            evento: formData.evento,
            sede: formData.sede,
            organizador: formData.organizador,
            fecha_inicio: formData.fechaInicio,
            fecha_final: formData.fechaFinal,
        };
        try {
            const response = await fetch(
                "http://127.0.0.1:8000/api/formulario_capacitacion/",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(payload),
                }
            );
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Error al enviar el formulario: ${errorText}`);
            }
            setSnackbarMessage("Información registrada correctamente.");
            setOpenSnackbar(true);
            setFormData({
                nombreProfesor: "",
                evento: "",
                sede: "",
                organizador: "",
                fechaInicio: "",
                fechaFinal: "",
            });
        } catch (err) {
            console.error("Error:", err);
        }
    };

    return (
        <Container maxWidth="md">
            <Paper sx={{ p: 4 }}>
                <Typography variant="h6" gutterBottom align="center">
                    Formación Personal Académica
                </Typography>
                <Typography variant="h6" gutterBottom align="center">
                    <strong>Capacitación</strong>
                </Typography>
                <br />
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>

                        <Grid item xs={12}>
                            <FormControl fullWidth required>
                                <InputLabel>Nombre del Profesor</InputLabel>
                                <Select
                                    name="nombreProfesor"
                                    value={formData.nombreProfesor}
                                    label="Nombre del Profesor"
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
                            <TextField
                                name="evento"
                                label="Nombre del Evento"
                                fullWidth
                                value={formData.evento}
                                onChange={handleChange}
                                required
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                name="sede"
                                label="Sede del Evento"
                                fullWidth
                                value={formData.sede}
                                onChange={handleChange}
                                required
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                name="organizador"
                                label="Organizador (es)"
                                fullWidth
                                value={formData.organizador}
                                onChange={handleChange}
                                required
                                multiline
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                type="date"
                                name="fechaInicio"
                                label="Fecha de Inicio"
                                InputLabelProps={{ shrink: true }}
                                fullWidth
                                value={formData.fechaInicio}
                                onChange={handleChange}
                                required
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                type="date"
                                name="fechaFinal"
                                label="Fecha Final"
                                InputLabelProps={{ shrink: true }}
                                fullWidth
                                value={formData.fechaFinal}
                                onChange={handleChange}
                                required
                            />
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

export default FormularioCapacitacion;

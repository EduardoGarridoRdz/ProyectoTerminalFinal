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
    Select,
    MenuItem,
    Snackbar,
    Alert,
    SelectChangeEvent,
} from "@mui/material";

import axios from "axios";

interface PersonalProps {
    departamento: string;
}

const ActividadVinculacion: React.FC<PersonalProps> = ({ departamento }) => {
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [formData, setFormData] = useState({
        institucionVinculada: "",
        objetivoActividad: "",
        descripcionActividad: "",
        fechaVinculacion: "",
        fechaFinal: "",
        resultadoVinculacion: "",
        ptcResponsable: "",
        departamentoAcademico: departamento,
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
            (d) => d.nombre === formData.ptcResponsable
        )?.id;

        const payload = {
            institucion_vinculada: formData.institucionVinculada,
            objetivo_actividad: formData.objetivoActividad,
            descripcion_actividad: formData.descripcionActividad,
            fecha_vinculacion: formData.fechaVinculacion,
            fecha_final: formData.fechaFinal,
            resultado_vinculacion: formData.resultadoVinculacion,
            id_profesor: id_profesor,
            departamento_academico: formData.departamentoAcademico,
        };
        try {
            const response = await fetch(
                "http://127.0.0.1:8000/api/actividad_vinculacion/",
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
                institucionVinculada: "",
                objetivoActividad: "",
                descripcionActividad: "",
                fechaVinculacion: "",
                fechaFinal: "",
                resultadoVinculacion: "",
                ptcResponsable: "",
                departamentoAcademico: departamento,
            });
        } catch (err) {
            console.error("Error:", err);
        }
    };

    return (
        <Container maxWidth="md">
            <Paper sx={{ p: 4 }}>
                <Typography variant="h6" gutterBottom align="center">
                    <strong>Actividad de Vinculación</strong>
                </Typography>
                <br />
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>

                        <Grid item xs={12}>
                            <TextField
                                label="Institución vinculada"
                                name="institucionVinculada"
                                value={formData.institucionVinculada}
                                onChange={handleChange}
                                fullWidth
                                required
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                label="Objetivo de la actividad"
                                name="objetivoActividad"
                                value={formData.objetivoActividad}
                                onChange={handleChange}
                                fullWidth
                                multiline
                                required
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                label="Descripción de la actividad"
                                name="descripcionActividad"
                                value={formData.descripcionActividad}
                                onChange={handleChange}
                                fullWidth
                                multiline
                                required
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Fecha de vinculación"
                                type="date"
                                name="fechaVinculacion"
                                value={formData.fechaVinculacion}
                                onChange={handleChange}
                                InputLabelProps={{ shrink: true }}
                                fullWidth
                                required
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Fecha de finalización"
                                type="date"
                                name="fechaFinal"
                                value={formData.fechaFinal}
                                onChange={handleChange}
                                InputLabelProps={{ shrink: true }}
                                fullWidth
                                required
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                label="Resultados alcanzados"
                                name="resultadoVinculacion"
                                value={formData.resultadoVinculacion}
                                onChange={handleChange}
                                fullWidth
                                required
                                multiline
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <FormControl fullWidth required>
                                <InputLabel>PTC responsable</InputLabel>
                                <Select
                                    name="ptcResponsable"
                                    value={formData.ptcResponsable}
                                    label="PTC responsable"
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

export default ActividadVinculacion;

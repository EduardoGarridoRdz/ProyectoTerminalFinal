import React, { useState } from "react";
import {
    TextField,
    Button,
    Typography,
    Box,
    Container,
    Paper,
    Grid,
    Snackbar,
    Alert,
} from "@mui/material";

interface PersonalProps {
    departamento: string;
}

const FormacionIntegral: React.FC<PersonalProps> = ({ departamento }) => {
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [formData, setFormData] = useState({
        fechaEvento: "",
        fechaFinEvento: "",
        nombreEvento: "",
        sede: "",
        objetivo: "",
        numEstudiantes: "",
        numProfesores: "",
        departamentoAcademico: departamento,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const payload = {
            fecha_evento: formData.fechaEvento,
            fecha_final: formData.fechaFinEvento,
            nombre_evento: formData.nombreEvento,
            sede: formData.sede,
            objetivo: formData.objetivo,
            num_estudiantes: parseInt(formData.numEstudiantes, 10),
            num_profesores: parseInt(formData.numProfesores, 10),
            departamento_academico: formData.departamentoAcademico,
        };

        try {
            const response = await fetch(
                "http://127.0.0.1:8000/api/formacion_integral_evento/",
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
                fechaEvento: "",
                fechaFinEvento: "",
                nombreEvento: "",
                sede: "",
                objetivo: "",
                numEstudiantes: "",
                numProfesores: "",
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
                    Formación Integral del Estudiante
                </Typography>
                <Typography variant="h6" gutterBottom align="center">
                    <strong>Actividades</strong>
                </Typography>
                <br />
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Fecha del evento"
                                type="date"
                                name="fechaEvento"
                                value={formData.fechaEvento}
                                onChange={handleChange}
                                fullWidth
                                InputLabelProps={{ shrink: true }}
                                required
                            />
                        </Grid>

                        <Grid xs={12} sm={6} item>
                            <TextField
                                label="Fecha de finalización del evento"
                                type="date"
                                name="fechaFinEvento"
                                value={formData.fechaFinEvento}
                                onChange={handleChange}
                                fullWidth
                                InputLabelProps={{ shrink: true }}
                                required
                            />
                        </Grid>

                        <Grid xs={12} item>
                            <TextField
                                label="Nombre del evento"
                                name="nombreEvento"
                                value={formData.nombreEvento}
                                onChange={handleChange}
                                fullWidth
                                required
                            />
                        </Grid>

                        <Grid xs={12} item>
                            <TextField
                                label="Sede"
                                name="sede"
                                value={formData.sede}
                                onChange={handleChange}
                                fullWidth
                                required
                            />
                        </Grid>

                        <Grid xs={12} item>
                            <TextField
                                label="Objetivo del evento"
                                name="objetivo"
                                value={formData.objetivo}
                                onChange={handleChange}
                                fullWidth
                                multiline
                                required
                            />
                        </Grid>

                        <Grid xs={12} sm={6} item>
                            <TextField
                                label="No. de estudiantes participantes"
                                name="numEstudiantes"
                                type="number"
                                value={formData.numEstudiantes}
                                onChange={handleChange}
                                fullWidth
                                required
                            />
                        </Grid>

                        <Grid xs={12} sm={6} item>
                            <TextField
                                label="No. de profesores participantes"
                                name="numProfesores"
                                type="number"
                                value={formData.numProfesores}
                                onChange={handleChange}
                                fullWidth
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

export default FormacionIntegral;

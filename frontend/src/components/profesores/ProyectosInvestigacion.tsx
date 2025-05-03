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

const ProyectoInvestigacion: React.FC = () => {
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [formData, setFormData] = useState({
        nombreProyecto: "",
        objetivo: "",
        participantes: "",
        institucionColaboradora: "",
        resultadosImpactos: "",
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
            (d) => d.nombre === formData.participantes
        )?.id;

        const payload = {
            nombre_proyecto: formData.nombreProyecto,
            objetivo: formData.objetivo,
            participantes: id_profesor,
            institucion_colaboradora: formData.institucionColaboradora,
            resultados_impactos: formData.resultadosImpactos,
        };
        try {
            const response = await fetch(
                "http://127.0.0.1:8000/api/proyecto_investigacion/",
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
                nombreProyecto: "",
                objetivo: "",
                participantes: "",
                institucionColaboradora: "",
                resultadosImpactos: "",
            });
        } catch (err) {
            console.error("Error:", err);
        }
    };

    return (
        <Container maxWidth="md">
            <Paper sx={{ p: 4 }}>
                <Typography variant="h6" gutterBottom align="center">
                    <strong>Proyecto de Investigación</strong>
                </Typography>
                <br />
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>

                        <Grid item xs={12}>
                            <TextField
                                label="Nombre del Proyecto (nombre completo, no sólo siglas)"
                                name="nombreProyecto"
                                value={formData.nombreProyecto}
                                onChange={handleChange}
                                fullWidth
                                required
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                label="Objetivo"
                                name="objetivo"
                                value={formData.objetivo}
                                onChange={handleChange}
                                fullWidth
                                multiline
                                required
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <FormControl fullWidth required>
                                <InputLabel>PTC UNICARIBE Participante(s)</InputLabel>
                                <Select
                                    name="participantes"
                                    value={formData.participantes}
                                    label="PTC UNICARIBE Participante(s)"
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
                                label="IES y/o Red en colaboración (nombre completo)"
                                name="institucionColaboradora"
                                value={formData.institucionColaboradora}
                                onChange={handleChange}
                                fullWidth
                                required
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                label="Resultados / Impactos"
                                name="resultadosImpactos"
                                value={formData.resultadosImpactos}
                                onChange={handleChange}
                                fullWidth
                                multiline
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

export default ProyectoInvestigacion;

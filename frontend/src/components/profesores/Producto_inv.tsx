import React, { useState, useEffect } from "react";
import {
    TextField,
    Button,
    Grid,
    Container,
    Paper,
    Typography,
    MenuItem,
    FormControl,
    InputLabel,
    Select,
    SelectChangeEvent,
    Box,
    Snackbar,
    Alert,
} from "@mui/material";

import axios from "axios";

const FormularioLibroArticulo = () => {
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [formData, setFormData] = useState({
        tipoProducto: "",
        anioPeriodo: "",
        autores: "",
        nombreProducto: "",
        editorial: "",
        isbn: "",
        objetoEstudio: "",
        fechaPublicacion: "",
        numeroEdicion: "",
        lugarPublicacion: "",
        institucionColaboradora: "",
        hipervinculoContrato: "",
        recursoPublico: "",
        recursoPrivado: "",
        urlPublicacion: "",
        justificacionSinISBN: "",
        nombreRevista: "",
        numeroRevista: "",
    });

    const [tipoProducto, setTipoProducto] = useState<
        { id: number; nombre: string }[]
    >([]);

    useEffect(() => {
        axios
            .get("http://127.0.0.1:8000/api/tipo_producto/")
            .then((res) => {
                const data = res.data.map((prod: any) => ({
                    id: prod.id_tipo_producto,
                    nombre: prod.tipo_producto,
                }));
                setTipoProducto(data);
            })
            .catch((err) => {
                console.error("Error al obtener tipo de producto", err);
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

        const id_tipo_producto = tipoProducto.find(
            (t) => t.nombre === formData.tipoProducto
        )?.id;

        const id_profesor = nombresProfesores.find(
            (d) => d.nombre === formData.autores
        )?.id;

        const payload = {
            id_tipo_producto: id_tipo_producto,
            anio_periodo: formData.anioPeriodo,
            id_profesor: id_profesor,
            nombre_producto: formData.nombreProducto,
            editorial: formData.tipoProducto === "Libro" ? formData.editorial : "NO APLICA",
            isbn: formData.tipoProducto === "Libro" ? formData.isbn : "NO APLICA",
            objeto_estudio: formData.objetoEstudio,
            fecha_publicacion: formData.fechaPublicacion,
            numero_edicion: formData.tipoProducto === "Libro" ? formData.numeroEdicion : "NO APLICA",
            lugar_publicacion: formData.tipoProducto === "Libro" ? formData.lugarPublicacion : "NO APLICA",
            institucion_colaboradora: formData.institucionColaboradora || "NO APLICA",
            hipervinculo_contrato: formData.hipervinculoContrato || "NO APLICA",
            recurso_publico: formData.tipoProducto === "Libro" ? formData.recursoPublico : "NO APLICA",
            recurso_privado: formData.tipoProducto === "Libro" ? formData.recursoPrivado : "NO APLICA",
            url_publicacion: formData.urlPublicacion || "NO APLICA",
            justificacion_sin_isbn: formData.tipoProducto === "Libro" ? formData.justificacionSinISBN : "NO APLICA",
            nombre_revista: formData.tipoProducto === "Artículo" ? formData.nombreRevista : "NO APLICA",
            numero_revista: formData.tipoProducto === "Artículo" ? formData.numeroRevista : "NO APLICA",
        };

        try {
            const response = await fetch(
                "http://127.0.0.1:8000/api/producto_investigacion/",
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
                tipoProducto: "",
                anioPeriodo: "",
                autores: "",
                nombreProducto: "",
                editorial: "",
                isbn: "",
                objetoEstudio: "",
                fechaPublicacion: "",
                numeroEdicion: "",
                lugarPublicacion: "",
                institucionColaboradora: "",
                hipervinculoContrato: "",
                recursoPublico: "",
                recursoPrivado: "",
                urlPublicacion: "",
                justificacionSinISBN: "",
                nombreRevista: "",
                numeroRevista: "",
            });
        } catch (err) {
            console.error("Error:", err);
        }
    };

    return (
        <Container maxWidth="md">
            <Paper sx={{ p: 4 }}>
                <Typography variant="h6" align="center" gutterBottom>
                    <strong>Producto de Investigación</strong>
                </Typography>
                <br />
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>

                        <Grid item xs={12}>
                            <FormControl fullWidth required>
                                <InputLabel>Tipo de Producto</InputLabel>
                                <Select
                                    name="tipoProducto"
                                    value={formData.tipoProducto}
                                    label="Tipo de Producto"
                                    onChange={handleChange}
                                    required
                                >
                                    {tipoProducto.map((prod) => (
                                        <MenuItem key={prod.id} value={prod.nombre}>
                                            {`${prod.nombre}`}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12}>
                            <TextField name="anioPeriodo" label="Año o periodo" fullWidth value={formData.anioPeriodo} onChange={handleChange} required />
                        </Grid>

                        <Grid item xs={12}>
                            <FormControl fullWidth required>
                                <InputLabel>Autor/autores en orden de aportación</InputLabel>
                                <Select
                                    name="autores"
                                    value={formData.autores}
                                    label="Autor/autores en orden de aportación"
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
                            <TextField name="nombreProducto" label="Nombre del libro o artículo" fullWidth value={formData.nombreProducto} onChange={handleChange} />
                        </Grid>

                        {formData.tipoProducto === "Libro" && (
                            <>
                                <Grid item xs={12}>
                                    <TextField name="editorial" label="Nombre de la editorial" fullWidth value={formData.editorial} onChange={handleChange} />
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField name="objetoEstudio" label="Objeto de estudio" fullWidth value={formData.objetoEstudio} onChange={handleChange} />
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <TextField name="isbn" label="ISBN" fullWidth value={formData.isbn} onChange={handleChange} />
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <TextField type="date" name="fechaPublicacion" label="Fecha de publicación" InputLabelProps={{ shrink: true }} fullWidth value={formData.fechaPublicacion} onChange={handleChange} />
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <TextField name="numeroEdicion" label="Número de edición" fullWidth value={formData.numeroEdicion} onChange={handleChange} />
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <TextField name="lugarPublicacion" label="Lugar de publicación" fullWidth value={formData.lugarPublicacion} onChange={handleChange} />
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField name="institucionColaboradora" label="Nombre de la institución en caso de colaboración" fullWidth value={formData.institucionColaboradora} onChange={handleChange} />
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField name="hipervinculoContrato" label="Hipervínculo a contratos/convenios de colaboración" fullWidth value={formData.hipervinculoContrato} onChange={handleChange} />
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField name="recursoPublico" label="Recurso público destinado a la elaboración" fullWidth value={formData.recursoPublico} onChange={handleChange} />
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField name="recursoPrivado" label="Recurso privado destinado a la elaboración" fullWidth value={formData.recursoPrivado} onChange={handleChange} />
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField name="urlPublicacion" label="Vínculo en internet (URI / DOI / SICI)" fullWidth value={formData.urlPublicacion} onChange={handleChange} />
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField name="justificacionSinISBN" label="Justificación si no cuenta con ISBN" fullWidth value={formData.justificacionSinISBN} onChange={handleChange} multiline />
                                </Grid>
                            </>
                        )}

                        {formData.tipoProducto === "Artículo" && (
                            <>
                                <Grid item xs={12}>
                                    <TextField name="nombreRevista" label="Nombre de la revista" fullWidth value={formData.nombreRevista} onChange={handleChange} />
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField name="objetoEstudio" label="Objeto de estudio" fullWidth value={formData.objetoEstudio} onChange={handleChange} />
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <TextField name="numeroRevista" label="Número de revista" fullWidth value={formData.numeroRevista} onChange={handleChange} />
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <TextField type="date" name="fechaPublicacion" label="Fecha de publicación" InputLabelProps={{ shrink: true }} fullWidth value={formData.fechaPublicacion} onChange={handleChange} />
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField name="institucionColaboradora" label="Nombre de la institución en caso de colaboración" fullWidth value={formData.institucionColaboradora} onChange={handleChange} />
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField name="hipervinculoContrato" label="Hipervínculo a contratos/convenios de colaboración" fullWidth value={formData.hipervinculoContrato} onChange={handleChange} />
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField name="urlPublicacion" label="Vínculo en internet (URI / DOI / SICI)" fullWidth value={formData.urlPublicacion} onChange={handleChange} />
                                </Grid>
                            </>
                        )}

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

export default FormularioLibroArticulo;

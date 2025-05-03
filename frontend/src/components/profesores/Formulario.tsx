import React, { useState, useEffect } from "react";
import {
    TextField,
    MenuItem,
    Button,
    Typography,
    Box,
    Container,
    Paper,
    Grid,
    Checkbox,
    FormControlLabel,
    FormControl,
    InputLabel,
    Select,
    SelectChangeEvent,
    Snackbar,
    Alert,
} from "@mui/material";

import axios from "axios";

const FormularioRH = () => {
    const [formData, setFormData] = useState({
        departamento: "",
        programa: "",
        nombreProfesor: "",
        correoProfesor: "",
        tipoProfesor: "",
        apellidoPaternoProfesor: "",
        apellidoMaternoProfesor: "",
        sexo: "",
        grado: "",
        institucionTitulo: "",
        fechaGradoInicio: "",
        fechaGradoInicioEstudio: "",
        fechaGradoFinal: "",
        estudiaDoctorado: false,
        jefeDepartamento: false,
        institucionDoctorado: "",
        perfilPRODEP: false,
        vigenciaPerfilPRODEP: "",
        miembroSNII: false,
        nivelSNII: "",
        anioIngresoSNII: "",
    });

    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");

    const [grado_academico, setGradoAcademico] = useState<
        { id: number; nombre: string }[]
    >([]);

    useEffect(() => {
        axios
            .get("http://localhost:8000/api/grado_academico/")
            .then((res) => {
                const data = res.data.map((grad: any) => ({
                    id: grad.id_grado_academico,
                    nombre: grad.grado_academico,
                }));
                setGradoAcademico(data);
            })
            .catch((err) => {
                console.error("Error al obtener grado academico", err);
            });
    }, []);

    const [sexo, setSexo] = useState<{ id: number; nombre: string }[]>([]);

    useEffect(() => {
        axios
            .get("http://localhost:8000/api/sexo/")
            .then((res) => {
                const data = res.data.map((sex: any) => ({
                    id: sex.id_sexo,
                    nombre: sex.nombre_sexo,
                }));
                setSexo(data);
            })
            .catch((err) => {
                console.error("Error al obtener sexo", err);
            });
    }, []);

    const [departamentos, setDepartamentos] = useState<
        { id: number; nombre: string }[]
    >([]);

    useEffect(() => {
        axios
            .get("http://localhost:8000/api/departamentos/")
            .then((res) => {
                const data = res.data.map((dep: any) => ({
                    id: dep.id_departamento,
                    nombre: dep.nombre_departamento,
                }));
                setDepartamentos(data);
            })
            .catch((err) => {
                console.error("Error al obtener departamentos", err);
            });
    }, []);

    const [programa_educativo, setProgramaEducativo] = useState<
        { id: number; nombre: string }[]
    >([]);

    useEffect(() => {
        axios
            .get("http://localhost:8000/api/programa_educativo/")
            .then((res) => {
                const data = res.data.map((prog: any) => ({
                    id: prog.id_programa_educativo,
                    nombre: prog.nombre_programa_educativo,
                }));
                setProgramaEducativo(data);
            })
            .catch((err) => {
                console.error("Error al obtener programa educativo", err);
            });
    }, []);

    const [tipo_profesor, setTipoProfesor] = useState<
        { id: number; nombre: string }[]
    >([]);

    useEffect(() => {
        axios
            .get("http://localhost:8000/api/tipo_profesor/")
            .then((res) => {
                const data = res.data.map((tipo: any) => ({
                    id: tipo.id_tipo_profesor,
                    nombre: tipo.tipo_profesor,
                }));
                setTipoProfesor(data);
            })
            .catch((err) => {
                console.error("Error al obtener programa educativo", err);
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

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setFormData({ ...formData, [name]: checked });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const id_grado = grado_academico.find(
            (g) => g.nombre === formData.grado
        )?.id;
        const id_programa = programa_educativo.find(
            (p) => p.nombre === formData.programa
        )?.id;
        const id_departamento = departamentos.find(
            (d) => d.nombre === formData.departamento
        )?.id;
        const id_tipo_profesor = tipo_profesor.find(
            (t) => t.nombre === formData.tipoProfesor
        )?.id;
        const sexo_nombre = sexo.find((s) => s.nombre === formData.sexo)?.nombre;

        const payloadProfesor = {
            nombre_profesor: formData.nombreProfesor,
            apellido_pat_profesor: formData.apellidoPaternoProfesor,
            apellido_mat_profesor: formData.apellidoMaternoProfesor,
            correo_profesor: formData.correoProfesor,
            id_grado_academico: id_grado,
            id_programa_educativo: id_programa,
            id_departamento: id_departamento,
            jefe_departamento: formData.jefeDepartamento,
            id_tipo_profesor: id_tipo_profesor,
            activo: true,
            sexo: sexo_nombre,
        };

        axios
            .post("http://localhost:8000/api/profesor/", payloadProfesor)
            .then((res) => {
                const payloadEstudios = {
                    id_profesor: res.data.id_profesor,
                    grado_actual: formData.grado,
                    grado_estudiando: formData.estudiaDoctorado ? "Doctorado" : "Ninguno",
                    fecha_inicio: formData.fechaGradoInicio,
                    fecha_final: formData.fechaGradoFinal,
                    nombre_institucion: formData.institucionTitulo,
                    nombre_institucion_est: formData.estudiaDoctorado
                        ? formData.institucionDoctorado
                        : "Ninguno",
                    fecha_inicio_est: formData.estudiaDoctorado
                        ? formData.fechaGradoInicioEstudio
                        : null,
                };

                return axios.post(
                    "http://localhost:8000/api/estudios/",
                    payloadEstudios
                );
            })
            .then((resEstudios) => {
                const payloadInfoAdicional = {
                    id_profesor: resEstudios.data.id_profesor,
                    perfil_prodep: formData.perfilPRODEP,
                    vigencia_prodep: formData.vigenciaPerfilPRODEP || null,
                    miembro_snii_seii: formData.miembroSNII,
                    nivel_snii_seii: formData.nivelSNII || null,
                    anio_ingreso_snii_seii: formData.anioIngresoSNII || null,
                };
                if (formData.estudiaDoctorado) {
                    return axios.post(
                        "http://localhost:8000/api/informacion_adicional/",
                        payloadInfoAdicional
                    );
                } else {
                    return Promise.resolve(resEstudios);
                }
            })
            .then(() => {
                setSnackbarMessage("Información registrada correctamente.");
                setOpenSnackbar(true);
                setFormData({
                    departamento: "",
                    programa: "",
                    nombreProfesor: "",
                    correoProfesor: "",
                    tipoProfesor: "",
                    apellidoPaternoProfesor: "",
                    apellidoMaternoProfesor: "",
                    sexo: "",
                    grado: "",
                    institucionTitulo: "",
                    fechaGradoInicio: "",
                    fechaGradoInicioEstudio: "",
                    fechaGradoFinal: "",
                    estudiaDoctorado: false,
                    jefeDepartamento: false,
                    institucionDoctorado: "",
                    perfilPRODEP: false,
                    vigenciaPerfilPRODEP: "",
                    miembroSNII: false,
                    nivelSNII: "",
                    anioIngresoSNII: "",
                });
            })
            .catch((err) => {
                if (err.response) {
                    console.error("Error:", err.response.data);
                } else {
                    console.error("Error:", err);
                }
            });
    };

    return (
        <Container maxWidth="md">
            <Paper sx={{ p: 4 }}>
                <Typography variant="h5" gutterBottom align="center">
                    Información de Recursos Humanos
                </Typography>
                <Typography variant="h5" gutterBottom align="center">
                    <strong>Profesor</strong>
                </Typography>
                <br />
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth required>
                                <InputLabel>Departamento Académico</InputLabel>
                                <Select
                                    name="departamento"
                                    value={formData.departamento}
                                    label="Departamento Académico"
                                    onChange={handleChange}
                                >
                                    {departamentos.map((dep) => (
                                        <MenuItem key={dep.id} value={dep.nombre}>
                                            {dep.nombre}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth required>
                                <InputLabel>Programa Educativo</InputLabel>
                                <Select
                                    name="programa"
                                    value={formData.programa}
                                    label="Programa Educativo"
                                    onChange={handleChange}
                                >
                                    {programa_educativo.map((prog) => (
                                        <MenuItem key={prog.id} value={prog.nombre}>
                                            {prog.nombre}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                name="nombreProfesor"
                                value={formData.nombreProfesor}
                                onChange={handleChange}
                                fullWidth
                                label="Nombre (s) del Profesor"
                                required
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="apellidoPaternoProfesor"
                                value={formData.apellidoPaternoProfesor}
                                onChange={handleChange}
                                fullWidth
                                label="Apellido Paterno"
                                required
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="apellidoMaternoProfesor"
                                value={formData.apellidoMaternoProfesor}
                                onChange={handleChange}
                                fullWidth
                                label="Apellido Materno"
                                required
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="correoProfesor"
                                value={formData.correoProfesor}
                                onChange={handleChange}
                                fullWidth
                                label="Correo del Profesor"
                                required
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth required>
                                <InputLabel>Tipo de Profesor</InputLabel>
                                <Select
                                    name="tipoProfesor"
                                    value={formData.tipoProfesor}
                                    label="Tipo de Profesor"
                                    onChange={handleChange}
                                >
                                    {tipo_profesor.map((tipo) => (
                                        <MenuItem key={tipo.id} value={tipo.nombre}>
                                            {tipo.nombre}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth required>
                                <InputLabel>Sexo</InputLabel>
                                <Select
                                    name="sexo"
                                    value={formData.sexo}
                                    label="Sexo"
                                    onChange={handleChange}
                                >
                                    {sexo.map((sex) => (
                                        <MenuItem key={sex.id} value={sex.nombre}>
                                            {sex.nombre}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth required>
                                <InputLabel>Grado Académico Actual</InputLabel>
                                <Select
                                    name="grado"
                                    value={formData.grado}
                                    label="Grado Académico Actual"
                                    onChange={handleChange}
                                >
                                    {grado_academico.map((grad) => (
                                        <MenuItem key={grad.id} value={grad.nombre}>
                                            {grad.nombre}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                name="institucionTitulo"
                                value={formData.institucionTitulo}
                                onChange={handleChange}
                                fullWidth
                                label="Institución que otorgó el título"
                                required
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth required>
                                <TextField
                                    type="date"
                                    name="fechaGradoInicio"
                                    value={formData.fechaGradoInicio}
                                    onChange={handleChange}
                                    label="Fecha de inicio del grado"
                                    fullWidth
                                    InputLabelProps={{ shrink: true }}
                                    required
                                />
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                type="date"
                                name="fechaGradoFinal"
                                value={formData.fechaGradoFinal}
                                onChange={handleChange}
                                label="Fecha de obtención del grado"
                                fullWidth
                                InputLabelProps={{ shrink: true }}
                                required
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={formData.jefeDepartamento}
                                        onChange={handleCheckboxChange}
                                        name="jefeDepartamento"
                                    />
                                }
                                label="¿Es jefe de departamento?"
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={formData.estudiaDoctorado}
                                        onChange={handleCheckboxChange}
                                        name="estudiaDoctorado"
                                    />
                                }
                                label="¿Está estudiando un doctorado?"
                            />
                        </Grid>

                        {formData.estudiaDoctorado && (
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth required>
                                    <TextField
                                        type="date"
                                        name="fechaGradoInicioEstudio"
                                        value={formData.fechaGradoInicioEstudio}
                                        onChange={handleChange}
                                        label="Fecha de inicio del grado"
                                        fullWidth
                                        InputLabelProps={{ shrink: true }}
                                        required
                                    />
                                </FormControl>
                            </Grid>
                        )}

                        {formData.estudiaDoctorado && (
                            <Grid item xs={12}>
                                <TextField
                                    name="institucionDoctorado"
                                    value={formData.institucionDoctorado}
                                    onChange={handleChange}
                                    fullWidth
                                    label="Institución donde estudia el doctorado"
                                />
                            </Grid>
                        )}

                        {formData.estudiaDoctorado && (
                            <Grid item xs={12}>
                                <Typography variant="subtitle1" fontWeight="bold">
                                    Información adicional
                                </Typography>
                            </Grid>
                        )}

                        {formData.estudiaDoctorado && (
                            <Grid item xs={12} sm={6}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={formData.perfilPRODEP}
                                            onChange={handleCheckboxChange}
                                            name="perfilPRODEP"
                                        />
                                    }
                                    label="¿Cuenta con Perfil PRODEP?"
                                />
                            </Grid>
                        )}

                        {formData.perfilPRODEP && (
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    name="vigenciaPerfilPRODEP"
                                    value={formData.vigenciaPerfilPRODEP}
                                    onChange={handleChange}
                                    fullWidth
                                    label="Vigencia del Perfil PRODEP"
                                />
                            </Grid>
                        )}

                        {formData.estudiaDoctorado && (
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={formData.miembroSNII}
                                            onChange={handleCheckboxChange}
                                            name="miembroSNII"
                                        />
                                    }
                                    label="¿Es miembro del SNII o SEII?"
                                />
                            </Grid>
                        )}

                        {formData.miembroSNII && (
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    name="nivelSNII"
                                    value={formData.nivelSNII}
                                    onChange={handleChange}
                                    fullWidth
                                    label="Nivel SNI / SEII"
                                />
                            </Grid>
                        )}

                        {formData.miembroSNII && (
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    name="anioIngresoSNII"
                                    value={formData.anioIngresoSNII}
                                    onChange={handleChange}
                                    fullWidth
                                    label="Año de ingreso a SNI / SEII"
                                />
                            </Grid>
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

export default FormularioRH;

import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid2";
import { Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from '@mui/icons-material/Send';
import MenuItem from '@mui/material/MenuItem';
import Paper from "@mui/material/Paper";
import axios from 'axios';

// Definición de tipos
type TipoUsuario = {
  value: string;
  label: string;
};

type Departamento = {
  value: string;
  label: string;
};

type FormData = {
  nombre: string;
  apellido_pat: string;
  apellido_mat: string;
  correo: string;
  contrasena: string;
  tipo_usuario: TipoUsuario['value'] | '';
  departamento: string;
};

// Datos estáticos con tipado
const tipo_usuario = [
  { value: 'Administrador', label: 'Administrador' },
  { value: 'Jefe de Departamento', label: 'Jefe de Departamento' },
  { value: 'Profesor', label: 'Profesor' }
];

const departamentos: Departamento[] = [
  { value: "Secretaría de Planeación y Desarrollo Institucional", label: "Secretaría de Planeación y Desarrollo Institucional" },
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

const AñadirUsuario: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    nombre: '',
    apellido_pat: '',
    apellido_mat: '',
    correo: '',
    contrasena: '',
    tipo_usuario: '',
    departamento: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSelectChange = (e: React.ChangeEvent<{ name?: string; value: unknown }>) => {
    const name = e.target.name as keyof FormData;
    const value = e.target.value as string;

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/CrearUsuario/', formData, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      alert(response.data.message); // Mostrar mensaje de éxito
      // Limpiar el formulario
      setFormData({
        nombre: '',
        apellido_pat: '',
        apellido_mat: '',
        correo: '',
        contrasena: '',
        tipo_usuario: '',
        departamento: ''
      });

    } catch (error) {
      alert(error)
      console.error('Error al enviar datos:', error);
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
    <form onSubmit={handleSubmit}>
      <Grid container spacing={1} direction="column"
      >

        <Paper elevation={3}
          sx={{
            mx: Width * 0.01,
            my: 1
          }}>

          <Typography variant="h4" align="center"
            sx={{
              mx: 5,
              my: 5,
              fontWeight: 'bold',
              color: '#1976d2',
            }}>
            Añadir Usuario
          </Typography>

          <Grid align="center"
            sx={{
              mx: Width * 0.01,
              my: 3,
            }}
          >
            <TextField
              id="nombre"
              label="Nombre"
              variant="outlined"
              fullWidth={true}
              required
              value={formData.nombre}
              onChange={handleChange}
              error={!!formData.nombre && !/^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/.test(formData.nombre)}
              helperText={
                !!formData.nombre && !/^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/.test(formData.nombre)
                  ? "Solo se permiten letras y espacios"
                  : ""
              }
              inputProps={{
                pattern: "[A-Za-zÁÉÍÓÚáéíóúñÑ\\s]+",
                title: "Solo se permiten letras y espacios"
              }}
            />

          </Grid>

          <Grid align="center"
            sx={{
              mx: Width * 0.01,
              my: 3,
            }}
          >
            <TextField
              id="apellido_pat"
              label="Apellido Paterno"
              variant="outlined"
              fullWidth={true}
              required
              value={formData.apellido_pat}
              onChange={handleChange}
              error={!!formData.apellido_pat && !/^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/.test(formData.apellido_pat)}
              helperText={
                !!formData.apellido_pat && !/^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/.test(formData.apellido_pat)
                  ? "Solo se permiten letras y espacios"
                  : ""
              }
              inputProps={{
                pattern: "[A-Za-zÁÉÍÓÚáéíóúñÑ\\s]+",
                title: "Solo se permiten letras y espacios"
              }}
            />
          </Grid>

          <Grid align="center"
            sx={{
              mx: Width * 0.01,
              my: 3,
            }}>
            <TextField
              id="apellido_mat"
              label="Apellido Materno"
              variant="outlined"
              fullWidth={true}
              required
              value={formData.apellido_mat}
              onChange={handleChange}
              error={!!formData.apellido_mat && !/^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/.test(formData.apellido_mat)}
              helperText={
                !!formData.apellido_mat && !/^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/.test(formData.apellido_mat)
                  ? "Solo se permiten letras y espacios"
                  : ""
              }
              inputProps={{
                pattern: "[A-Za-zÁÉÍÓÚáéíóúñÑ\\s]+",
                title: "Solo se permiten letras y espacios"
              }}
            />
          </Grid>

          <Grid align="center"
            sx={{
              mx: Width * 0.01,
              my: 3,
            }}>
            <TextField
              id="correo"
              label="Correo"
              variant="outlined"
              type="email"
              fullWidth={true}
              required
              value={formData.correo}
              onChange={handleChange}
              error={!!formData.correo && !/^[^\s@]+@ucaribe\.edu\.mx$/i.test(formData.correo)}
              helperText={
                !!formData.correo && !/^[^\s@]+@ucaribe\.edu\.mx$/i.test(formData.correo)
                  ? "Debe usar un correo @ucaribe.edu.mx"
                  : "Ejemplo: nombreapellido@ucaribe.edu.mx"
              }
              inputProps={{
                pattern: "[^\\s@]+@ucaribe\\.edu\\.mx",
                title: "Debe usar un correo institucional @ucaribe.edu.mx"
              }}
            />
          </Grid>

          <Grid alig="center"
            sx={{
              mx: Width * 0.01,
              my: 3,
            }}>
            <TextField
              id="contrasena"
              label="Contraseña"
              variant="outlined"
              type="password"
              fullWidth={true}
              required
              value={formData.contrasena}
              onChange={handleChange}
              error={!!formData.contrasena && !/^(?=.*[A-Z])(?=.*\d).{8,}$/.test(formData.contrasena)}
              helperText={
                !!formData.contrasena && !/^(?=.*[A-Z])(?=.*\d).{8,}$/.test(formData.contrasena)
                  ? "La contraseña debe tener: 8+ caracteres, 1 mayúscula y 1 número"
                  : "Requisitos: 8+ caracteres, 1 mayúscula y 1 número"
              }
              inputProps={{
                pattern: "^(?=.*[A-Z])(?=.*\\d).{8,}$",
                title: "Debe contener: 8+ caracteres, 1 mayúscula y 1 número"
              }}
            />
          </Grid>

          <Grid align="center"
            sx={{
              mx: Width * 0.01,
              my: 3,
            }}>
            <TextField
              id="tipo_usuario"
              name="tipo_usuario"
              fullWidth={true}
              select
              label="Seleccionar tipo de usuario"
              value={formData.tipo_usuario}
              onChange={handleSelectChange}
              helperText="Selecciona el tipo de usuario"
              required

            >
              {tipo_usuario.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid align="center"
            sx={{
              mx: Width * 0.01,
              my: 3,
            }}>
            <TextField
              id="departamento"
              name="departamento"
              fullWidth={true}
              select
              label="Seleccionar Departamento"
              value={formData.departamento}
              onChange={handleSelectChange}
              helperText="Selecciona el departamento del usuario"
              required

            >
              {departamentos.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid align="center">
            <Button
              sx={{
                mx: Width * 0.01,
                my: 3,
              }}
              type="submit"

              variant="contained"
              startIcon={<SendIcon />}
            >
              Enviar
            </Button>
          </Grid>
        </Paper>
      </Grid>
    </form>
  );
};

export default AñadirUsuario;
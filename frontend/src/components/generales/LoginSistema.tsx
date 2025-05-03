import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Container, CssBaseline, TextField, Typography, Paper, } from '@mui/material';
import logo from '../../assets/logo.svg'; // Asegúrate de que la ruta sea correcta

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validación básica
    if (!email || !password) {
      setError('Por favor ingrese correo y contraseña');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/api/VerificarUsuario/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error en la autenticación');
      }

      // Guardar token y redirigir
      localStorage.setItem('accessToken', data.token);
      localStorage.setItem('tipoUsuario', data.tipoUsuario); // Guardar el tipo de usuario


      if (data.tipoUsuario === "Administrador") {
        navigate("/inicio"); // Ruta para administradores
      } else if (data.tipoUsuario === "Profesor") {
        navigate("/formulario"); // Ruta para profesores
      } else {
        navigate("/login"); // En caso de un tipo no reconocido
      }
    } catch (err) {

      console.error('Error de login:', err);
      setError(err instanceof Error ? err.message : 'Error desconocido');

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

  return (
    <Container component="main" maxWidth="xs" sx={{ mt: windowSize.height * 0.02 }}>
      <CssBaseline />
      <Paper elevation={3} sx={{
        p: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>

        <img src={logo}></img>

        <Typography component="h1" variant="h5" sx={{ pt: 2 }}>
          Iniciar Sesión
        </Typography>

        {error && (
          <Typography color="error" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
          <TextField
            sx={{ mt: 2 }}
            required
            fullWidth
            id="email"
            label="Correo Electrónico"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
          />
          <TextField
            sx={{ mt: 2 }}
            required
            fullWidth
            name="password"
            label="Contraseña"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Iniciar Sesión
          </Button>

        </Box>
      </Paper>
    </Container >
  );
};

export default LoginPage;
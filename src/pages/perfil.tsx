// src/pages/perfil.tsx

import { useEffect, useState } from 'react';

import { Stack, Typography, Button, Paper, CircularProgress } from '@mui/material';

import { useAuth } from 'src/context/AuthContext';

export default function PerfilPage() {
  const { isAuthenticated, logout } = useAuth();
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('No autenticado');
      return;
    }
    fetch('http://localhost:8081/api/customer/usuario/perfil', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => {
        if (data.username) setUser(data);
        else setError('Token inválido o expirado');
      })
      .catch(() => setError('Error al obtener perfil'));
  }, []);

  if (!isAuthenticated)
    return (
      <Stack alignItems="center" mt={8}>
        <Typography color="error" variant="h6">
          No tienes acceso. Inicia sesión.
        </Typography>
      </Stack>
    );

  if (error)
    return (
      <Stack alignItems="center" mt={8}>
        <Typography color="error" variant="h6">
          {error}
        </Typography>
      </Stack>
    );

  if (!user)
    return (
      <Stack alignItems="center" mt={8}>
        <CircularProgress />
        <Typography variant="body2" mt={2}>
          Cargando...
        </Typography>
      </Stack>
    );

  return (
    <Stack alignItems="center" mt={8}>
      <Paper elevation={3} sx={{ p: 4, minWidth: 320 }}>
        <Typography variant="h4" gutterBottom>
          Perfil de Usuario
        </Typography>
        <Typography variant="body1">
          <strong>Username:</strong> {user.username}
        </Typography>
        <Typography variant="body1">
          <strong>Email:</strong> {user.email || 'No registrado'}
        </Typography>
        <Button
          variant="contained"
          color="error"
          sx={{ mt: 3 }}
          onClick={logout}
        >
          Cerrar sesión
        </Button>
      </Paper>
    </Stack>
  );
}
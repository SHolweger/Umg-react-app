// src/pages/sign-in.tsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button, Stack, TextField, Typography } from '@mui/material';

import { useAuth } from 'src/context/AuthContext';

// ... (resto del archivo)
export default function SignInPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [username, setUsername] = useState('');
  //  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  //const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    
    const success = await login(username, password);

    if (success) {
      navigate('/dashboard'); // Redirige al dashboard principal
    } else {
      setError('Credenciales incorrectas. Inténtalo de nuevo.');
    }
  };

  return (
    <Stack spacing={3} sx={{ mx: 'auto', maxWidth: 400, mt: 5 }}>
      <Typography variant="h4">Inicia Sesión</Typography>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField
            //name="email"
            name="username"
            label="Usuario"
            value={username}
            //value={email}
            //onChange={(e) => setEmail(e.target.value)}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <TextField
            name="password"
            label="Contraseña"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <Typography color="error" variant="body2">{error}</Typography>}
          <Button fullWidth size="large" type="submit" variant="contained">
            Ingresar
          </Button>
        </Stack>
      </form>
    </Stack>
  );
}
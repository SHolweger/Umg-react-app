// src/routes/components/ProtectedRoute.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';

import { Stack, CircularProgress, Typography } from '@mui/material';

import { useAuth } from 'src/context/AuthContext';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        // Mientras validamos el token, mostramos un indicador
        return (
            <Stack alignItems="center" mt={8}>
                <CircularProgress />
                <Typography variant="body2" mt={2}>
                    Verificando sesión...
                </Typography>
            </Stack>
        );
    }

    if (!isAuthenticated) {
        // Si ya terminó la validación y no hay sesión, redirige al login
        return <Navigate to="/sign-in" replace />;
    }

    // Usuario autenticado, renderizamos los hijos
    return <>{children}</>;
}

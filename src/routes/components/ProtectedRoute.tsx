// src/routes/components/ProtectedRoute.tsx

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { useAuth } from 'src/context/AuthContext';

// ... (resto del archivo)

// 👇 Cambia esta línea para que acepte la propiedad "children"
export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        // Si no está autenticado, redirige al login
        return <Navigate to="/sign-in" replace />;
    }

    // Si está autenticado, renderiza los componentes hijos que le pasaste
    return <>{children}</>;
}
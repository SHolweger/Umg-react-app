// src/context/AuthContext.tsx

import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

// 1. Define la "forma" o tipo de los datos que tendrá el contexto
interface AuthContextType {
    isAuthenticated: boolean;
    user: any;
    login: (username: string, password: string) => Promise<boolean>;
    logout: () => void;
}

// 2. Define los props del proveedor
interface AuthProviderProps {
    children: ReactNode;
}

// 3. Crea el contexto
const AuthContext = createContext<AuthContextType | null>(null);

// 4. Crea el proveedor del contexto
export function AuthProvider({ children }: AuthProviderProps) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<any>(null);

    // Verifica si hay token al cargar la app
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true);
            // Opcional: puedes obtener el perfil del usuario aquí
        }
    }, []);

    // Login real con backend
    const login = async (username: string, password: string): Promise<boolean> => {
        try {
            const response = await fetch('http://localhost:8081/api/customer/usuario/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });
            const data = await response.json();
            if (response.ok && data.token) {
                localStorage.setItem('token', data.token);
                setIsAuthenticated(true);
                setUser(data.user || { username }); // Si el backend retorna datos del usuario
                return true;
            }
            setIsAuthenticated(false);
            setUser(null);
            return false;
        } catch {
            setIsAuthenticated(false);
            setUser(null);
            return false;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

// 5. Hook personalizado para usar el contexto
export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth debe ser usado dentro de un AuthProvider');
    }
    return context;
}
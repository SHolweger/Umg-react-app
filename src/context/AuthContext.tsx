// src/context/AuthContext.tsx
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

// 1. Define la "forma" o tipo de los datos que tendrá el contexto
interface AuthContextType {
    isAuthenticated: boolean;
    user: any;
    loading: boolean; // <-- nuevo
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
    const [loading, setLoading] = useState(true); // <-- inicializa en true

    // Verifica si hay token al cargar la app
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            // Intenta obtener el perfil desde el backend
            fetch('http://localhost:8081/api/customer/usuario/perfil', {
                headers: { Authorization: `Bearer ${token}` },
            })
                .then(res => {
                    if (!res.ok) throw new Error('Token inválido');
                    return res.json();
                })
                .then(data => {
                    setUser(data); 
                    setIsAuthenticated(true);
                    setLoading(false);
                })
                .catch(() => {
                    localStorage.removeItem('token');
                    setIsAuthenticated(false);
                    setUser(null);
                    setLoading(false);
                });
        } else {
            setLoading(false);
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

                // Obtener perfil completo si el backend no lo envía en login
                const perfilResponse = await fetch('http://localhost:8081/api/customer/usuario/perfil', {
                    headers: { Authorization: `Bearer ${data.token}` },
                });
                const perfilData = await perfilResponse.json();
                setUser(perfilData);

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
        <AuthContext.Provider value={{ isAuthenticated, user, loading, login, logout }}>
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

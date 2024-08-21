import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import axios from '../axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decoded = jwtDecode(token);
            setUser(decoded);
        }
    }, []);

    const login = async (email, password) => {
        try {
            const response = await axios.post('/auth/login', { email, password });
            const { token } = response.data;
            localStorage.setItem('token', token);
            const decoded = jwtDecode(token);
            setUser(decoded);
        } catch (error) {
            console.error(error.response?.data || error.message);
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    const register = async (name, email, password) => {
        try {
            await axios.post('/auth/register', { name, email, password });
        } catch (error) {
            console.error(error.response?.data || error.message);
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider, AuthContext };

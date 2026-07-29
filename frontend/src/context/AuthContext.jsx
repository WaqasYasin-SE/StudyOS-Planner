import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../api/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {

    // ==========================
    // State
    // ==========================

    const [user, setUser] = useState(null);

    const [token, setToken] = useState(
        localStorage.getItem("token")
    );

    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    // ==========================
    // Load Current User
    // ==========================

    useEffect(() => {

        const loadUser = async () => {

            if (!token) {

                setLoading(false);
                return;

            }

            try {

                const response = await api.get(
                    "/auth/me",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                setUser(response.data);

            }

            catch {

                localStorage.removeItem("token");

                setToken(null);

                setUser(null);

            }

            finally {

                setLoading(false);

            }

        };

        loadUser();

    }, [token]);

    // ==========================
    // Login
    // ==========================

    const login = async (jwtToken) => {

        localStorage.setItem(
            "token",
            jwtToken
        );

        setToken(jwtToken);

        const response = await api.get(
            "/auth/me",
            {
                headers: {
                    Authorization: `Bearer ${jwtToken}`
                }
            }
        );

        setUser(response.data);

        navigate("/");

    };

    // ==========================
    // Logout
    // ==========================

    const logout = () => {

        localStorage.removeItem("token");

        setToken(null);

        setUser(null);

        navigate("/login");

    };

    // ==========================
    // Values Shared
    // ==========================

    return (

        <AuthContext.Provider
            value={{

                user,

                token,

                loading,

                login,

                logout,

                isAuthenticated: !!token

            }}
        >

            {children}

        </AuthContext.Provider>

    );

}

// ==========================
// Custom Hook
// ==========================

export function useAuth() {

    return useContext(AuthContext);

}
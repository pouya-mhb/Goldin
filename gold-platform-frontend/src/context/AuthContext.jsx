import { createContext, useContext, useState } from "react";
import { logout } from "../api/auth";

const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [isAuthenticated, setIsAuthenticated] = useState(
        !!localStorage.getItem("access")
    );

    const loginUser = (access, refresh) => {

        localStorage.setItem("access", access);
        localStorage.setItem("refresh", refresh);

        setIsAuthenticated(true);
    };

    const logoutUser = async () => {
        const refresh = localStorage.getItem("refresh");

        try {
            if (refresh) {
                await logout(refresh);
            }
        } catch (err) {
            console.error("Logout failed:", err);
        }

        localStorage.removeItem("access");
        localStorage.removeItem("refresh");

        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                loginUser,
                logoutUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
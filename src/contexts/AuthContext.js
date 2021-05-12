import { useState, useContext, createContext } from "react";
const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [login, setLogin] = useState(false);
    const [loader, setLoader] = useState(false);

    return (
        <AuthContext.Provider value={{ login, setLogin, loader, setLoader }}>
            {children}
        </AuthContext.Provider>
    );
}
export function useAuth() {
    return useContext(AuthContext);
}
import { useState, useContext, createContext } from "react";
const LoginContext = createContext();

export function LoginProvider({ children }) {
    const [login, setLogin] = useState(false);
    const [loader, setLoader] = useState(false);

    return (
        <LoginContext.Provider value={{ login, setLogin, loader, setLoader }}>
            {children}
        </LoginContext.Provider>
    );
}
export function useLogin() {
    return useContext(LoginContext);
}
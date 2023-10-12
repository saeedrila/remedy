import { createContext, useContext, useState } from "react";

const AuthContext = createContext({ auth: {}, setAuth: () => {} });

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        email: "",
        pwd: "",
        roles: {},
        accessToken: "",
        refreshToken: ""
    });

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};

export default AuthContext;
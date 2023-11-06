import { createContext, useContext, useState } from "react";

const AuthContext = createContext({ auth: {}, setAuth: () => {} });

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    email: "",
    username:"",
    roles: {},
    accessToken: "",
    refreshToken: ""
  });

  const setAuthContext = (newAuth) => {
    setAuth({
      ...auth, // Preserve the existing properties
      ...newAuth, // Update with the new properties
    });
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth: setAuthContext }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};


export default AuthContext;
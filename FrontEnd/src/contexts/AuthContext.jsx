import { createContext } from 'react';
import { useAuthLogic } from "../hooks/auth/useAuthLogic";

const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const authData = useAuthLogic();

  return (
    <AuthContext.Provider value={authData}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
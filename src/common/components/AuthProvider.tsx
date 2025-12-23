import { AuthContext } from '../contexts/AuthContext.ts';
import { useLocalStorage } from '../hooks/useLocalStorage.ts';
import type { LoginResponse } from '../types/LoginResponse.ts';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useLocalStorage<LoginResponse | null>('user', null);
  const isAuthenticated = user !== null && !!user.token;

  return (
    <AuthContext.Provider value={{ user, setUser, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
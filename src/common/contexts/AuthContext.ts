import type { LoginResponse } from '../types/LoginResponse.ts';
import { createContext, type Dispatch, type SetStateAction } from 'react';

type AuthContextType = {
  user: LoginResponse | null;
  setUser: Dispatch<SetStateAction<LoginResponse | null>>;
  isAuthenticated: boolean;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext.ts';

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth는 AuthProvider 내부에서 사용해야 합니다.');
  }
  return context;
};
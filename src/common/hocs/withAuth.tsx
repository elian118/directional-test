import { useNavigate } from 'react-router-dom';
import { type ComponentType, useEffect } from 'react';
import Loading from '../components/Loading.tsx';
import { useAuth } from '../hooks/useAuth.ts';

const withAuth = <P extends object>(WrappedComponent: ComponentType<P>) => {
  const AuthComponent = (props: P) => {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    useEffect(() => {
      if (!isAuthenticated) {
        navigate('/', { replace: true });
      }
    }, [isAuthenticated, navigate]);

    if (isAuthenticated) return <WrappedComponent {...props} />;

    return (
      <div className="h-full w-full flex justify-center items-center">
        <Loading />
      </div>
    );
  };

  // 컴포넌트 이름 부여(디버깅 편의)
  AuthComponent.displayName = `WithAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return AuthComponent;
};

export default withAuth;
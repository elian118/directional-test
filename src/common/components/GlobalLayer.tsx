import { type ReactNode, useEffect, useState } from 'react';
import { GlobalContext, type GlobalContextType, initModal, type ModalState } from '../contexts/global-context.ts';
import { useLocalStorage } from '../hooks/useLocalStorage.ts';
import { initLoginResponse, type LoginResponse } from '../types/LoginResponse.ts';

const GlobalLayer = ({ children }: { children: ReactNode }) => {
  // 빠른 개발을 위해 다크모드 고정
  const [isDark, setIsDark] = useState<boolean>(true);
  const [isMobileDevice, setIsMobileDevice] = useState(false);
  const [isOpenMobileMenu, setIsOpenMobileMenu] = useState<boolean>(false);
  const [modal, setModal] = useState<ModalState>(initModal);

  const value: GlobalContextType = {
    isDarkState: [isDark, setIsDark],
    isMobileDeviceState: [isMobileDevice, setIsMobileDevice],
    isOpenMobileMenuState: [isOpenMobileMenu, setIsOpenMobileMenu],
    modalState: [modal, setModal],
  };

  const [user] = useLocalStorage<LoginResponse>('user', initLoginResponse);

  useEffect(() => {
    //
  }, [user]);

  return (
    <GlobalContext.Provider value={value}>
      {/* 다크모드 여부 → 데이지 UI 테마 자동 설정 */}
      <div className="mx-auto" data-theme={isDark ? 'dark' : 'light'}>
        {children}
      </div>
    </GlobalContext.Provider>
  );
};

export default GlobalLayer;

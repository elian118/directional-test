import { useCallback, useEffect, useState } from 'react';

export const useDimension = () => {
  const [dimension, setDimension] = useState({
    winWidth: window.innerWidth,
    winHeight: window.innerHeight,
  });

  const handleResize = useCallback(() => {
    setDimension({
      winWidth: window.innerWidth,
      winHeight: window.innerHeight,
    });
  }, []);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  return dimension;
};

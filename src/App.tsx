import './App.css';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import ChartPage from './pages/chart/ChartPage.tsx';
import NotFoundPage from './pages/404/NotFoundPage.tsx';
import PostsPage from './pages/posts/PostsPage.tsx';
import Home from './pages/home/Home.tsx';
import Modal from './common/components/Modal.tsx';
import GlobalLayer from './common/components/GlobalLayer.tsx';
import { useDimension } from './common/hooks/useDimention.ts';
import { useEffect, useRef, useState } from 'react';
import { getAuthToken } from './common/consts.ts';

function App() {
  const { winHeight } = useDimension();
  const navigate = useNavigate();
  const headerRef = useRef<HTMLDivElement>(null);
  const [headerHeight, setHeaderHeight] = useState<number>(0);
  // const [user, setUser] = useLocalStorage<LoginResponse>('user', initLoginResponse);

  useEffect(() => {
    if (headerRef.current) setHeaderHeight(headerRef.current.offsetHeight);
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    if (!getAuthToken()) navigate('/');
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <GlobalLayer>
      <div className="w-screen h-screen dark:text-gray-100 bg-gray-100 dark:bg-gray-800">
        <div ref={headerRef} className="navbar p-2 bg-base-300 shadow-md">
          <div className="min-w-48">
            <Link to="/" className="btn btn-ghost text-xl">
              FE Hiring Project
            </Link>
          </div>
          <div className="w-full flex justify-between items-center">
            <div style={{ display: getAuthToken() ? 'flex' : 'none' }} className="w-1/2 flex-none">
              <ul className="menu menu-horizontal px-1">
                <li>
                  <Link to="/posts" className="btn btn-ghost">
                    게시판
                  </Link>
                </li>
                <li>
                  <Link to="/charts" className="btn btn-ghost">
                    차트
                  </Link>
                </li>
              </ul>
            </div>
            <button style={{ display: getAuthToken() ? 'flex' : 'none' }} className="btn btn-ghost" onClick={logout}>
              로그아웃
            </button>
          </div>
        </div>

        <main className="p-4" style={{ height: winHeight - headerHeight }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/posts" element={<PostsPage />} />
            <Route path="/charts" element={<ChartPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
          <Modal />
        </main>
      </div>
    </GlobalLayer>
  );
}

export default App;

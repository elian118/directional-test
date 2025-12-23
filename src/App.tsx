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
import withAuth from './common/hocs/withAuth.tsx';
import { useAuth } from './common/hooks/useAuth.ts';

// AuthHoc 랩핑 컴포넌트
const AuthPostsPage = withAuth(PostsPage);
const AuthChartPage = withAuth(ChartPage);

function App() {
  const { winHeight } = useDimension();
  const { isAuthenticated, setUser } = useAuth();

  const navigate = useNavigate();
  const headerRef = useRef<HTMLDivElement>(null);
  const [headerHeight, setHeaderHeight] = useState<number>(0);

  useEffect(() => {
    if (headerRef.current) setHeaderHeight(headerRef.current.offsetHeight);
  }, [navigate]);

  const logout = () => {
    setUser(null);
    navigate('/');
    localStorage.removeItem('user'); // 저장소 내용 완전 비우기
  };

  return (
    <GlobalLayer>
      <div className="w-screen h-screen dark:text-gray-100 bg-gray-100 dark:bg-gray-800 overflow-hidden">
        <div ref={headerRef} className="navbar p-2 bg-base-300 shadow-md">
          <div className="min-w-48">
            <Link to="/" className="btn btn-ghost text-xl">
              FE Hiring Project
            </Link>
          </div>
          <div className="w-full flex justify-between items-center">
            <div
              style={{ display: isAuthenticated ? 'flex' : 'none' }}
              className="w-1/2 flex-none"
            >
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
            <button
              style={{ display: isAuthenticated ? 'flex' : 'none' }}
              className="btn btn-ghost"
              onClick={logout}
            >
              로그아웃
            </button>
          </div>
        </div>

        <main
          className="p-4 overflow-y-auto"
          style={{ height: winHeight - headerHeight }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/posts" element={<AuthPostsPage />} />
            <Route path="/charts" element={<AuthChartPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
          <Modal />
        </main>
      </div>
    </GlobalLayer>
  );
}

export default App;

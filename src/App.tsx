import './App.css';
import { Link, Route, Routes } from 'react-router-dom';
import ChartPage from './pages/chart/ChartPage.tsx';
import NotFoundPage from './pages/404/NotFoundPage.tsx';
import PostsPage from './pages/posts/PostsPage.tsx';
import Home from './pages/home/Home.tsx';
import Modal from './common/components/Modal.tsx';
import GlobalLayer from './common/components/GlobalLayer.tsx';
import { useDimension } from './common/hooks/useDimention.ts';
import { useEffect, useRef, useState } from 'react';

function App() {
  const { winHeight } = useDimension();
  const headerRef = useRef<HTMLDivElement>(null);
  const [headerHeight, setHeaderHeight] = useState<number>(0);

  useEffect(() => {
    if (headerRef.current) setHeaderHeight(headerRef.current.offsetHeight);
  }, []);

  return (
    <GlobalLayer>
      <div className="w-screen h-screen dark:text-gray-100 bg-gray-100 dark:bg-gray-800">
        <div ref={headerRef} className="navbar p-2 bg-base-300 shadow-md">
          <div>
            <Link to="/" className="btn btn-ghost text-xl">
              FE Hiring Project
            </Link>
          </div>
          <div className="flex-none">
            <ul className="menu menu-horizontal px-1">
              <li>
                <Link to="/board" className="btn btn-ghost">
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
        </div>
        <main className="p-4" style={{ height: winHeight - headerHeight }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/board" element={<PostsPage />} />
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

import './App.css';
import { Link, Route, Routes } from 'react-router-dom';
import ChartPage from './pages/chart/ChartPage.tsx';
import NotFoundPage from './pages/404/NotFoundPage.tsx';
import PostsPage from './pages/posts/PostsPage.tsx';
import Home from './pages/home/Home.tsx';

function App() {
  return (
    <div className="w-screen h-screen bg-gray-100">
      {/* DaisyUI의 Navbar 컴포넌트를 사용하여 네비게이션 구현 */}
      <div className="navbar p-2 bg-base-300 shadow-md">
        <div>
          <Link to="/" className="btn btn-ghost text-xl">
            FE Hiring Project
          </Link>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              {/* Link 컴포넌트로 페이지 이동 (페이지 전체 리로드 방지) */}
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

      <main className="p-4">
        {/* 👈 Routes: 라우팅 경로를 정의하는 컨테이너 */}
        <Routes>
          {/* 👈 Route: 특정 경로와 컴포넌트를 매핑 */}
          <Route path="/" element={<Home />} />
          <Route path="/board" element={<PostsPage />} />
          <Route path="/charts" element={<ChartPage />} />
          {/* 404 페이지 처리 (옵션) */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;

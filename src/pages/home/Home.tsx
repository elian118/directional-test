import Login from '../../common/components/Login.tsx';
import { useEffect } from 'react';
import { useAuth } from '../../common/hooks/useAuth.ts';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  // const { openModal } = useModal();
  // const open = () =>
  //   openModal({
  //     title: '알림',
  //     body: (
  //       <div>
  //         <p>모달 내용</p>
  //       </div>
  //     ),
  //   });
  const navigate = useNavigate();
  const {user} = useAuth();


  useEffect(() => {
    !!user?.token && navigate('/posts');
  }, [user])

  return (
    <div className="w-full h-full">
      <div className="w-full h-full flex justify-center items-center">
        <Login />
      </div>
      {/*<button className="btn btn-sm" onClick={() => open()}>*/}
      {/*  전역 다이얼로그 호출*/}
      {/*</button>*/}
    </div>
  );
};

export default Home;

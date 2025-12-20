import { useModal } from '../../common/hooks/useModal.ts';

const Home = () => {
  const { openModal } = useModal();
  const open = () =>
    openModal({
      title: '알림',
      body: (
        <div>
          <p>모달 내용</p>
        </div>
      ),
    });

  return (
    <div>
      <button className="btn btn-sm" onClick={() => open()}>
        전역 다이얼로그 호출
      </button>
    </div>
  );
};

export default Home;

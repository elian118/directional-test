import { useModal } from '../hooks/useModal.ts';

const Modal = () => {
  const { modal, resetModal } = useModal();
  const { title, body, confirm, action } = modal;

  return (
    <dialog id="modal" className="modal sm:modal-middle">
      <div className="modal-box">
        <h3 className="font-bold text-lg">{title ?? ''}</h3>
        <div className="py-4">{body}</div>
        <div className="modal-action">
          {confirm && (
            <button
              className="btn btn-sm btn-outline"
              onClick={() => {
                // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                !!action && action();
                document.getElementById('closeModalBtn')?.click();
              }}
            >
              확인
            </button>
          )}
          <form className="flex gap-2" method="dialog">
            <button id="closeModalBtn" className="btn btn-sm btn-outline" onClick={resetModal}>
              {confirm ? '취소' : '닫기'}
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default Modal;

const Modal = (props: any) => {
  return (
    <dialog className="modal" open>
      <div className="modal-box">
        <div>{props.modalBody}</div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>✕</button>
      </form>
    </dialog>
  );
};
export default Modal;

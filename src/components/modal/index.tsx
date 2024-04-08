const Modal = (props: any) => {
  return (
    <dialog className="modal" open>
      <div className="modal-box">
        <div>{props.modalBody}</div>
      </div>
    </dialog>
  );
};
export default Modal;

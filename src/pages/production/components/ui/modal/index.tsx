const Modal = (props: any) => {
  return (
    <dialog className="modal modal-bottom lg:modal-middle" open>
      <div className="modal-box">
        <div className="modal-action">{props.modalAction}</div>
        <div>{props.modalBody}</div>
      </div>
    </dialog>
  );
};
export default Modal;

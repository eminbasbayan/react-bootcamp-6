import "./Modal.css";

const Modal = () => {
  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Modal Başlığı</h5>
          <span className="close-button">&times;</span>
        </div>
        <div className="modal-body">
          <p>Bu bir modal içerik örneğidir.</p>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary">
            Kapat
          </button>
          <button type="button" className="btn btn-primary">
            Kaydet
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;

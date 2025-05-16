import { createPortal } from "react-dom";

import "./Modal.css";
import { useEffect, useState } from "react";

const Modal = ({ setIsShowModal, title, desc }) => {
  const [count, setCount] = useState(0);

  function handleModelClose() {
    setIsShowModal(false);
  }

  useEffect(() => {
    console.log("component DOM'a ilk yüklendiğinde çalıştı!");
    let i = 0;

    const id = setInterval(() => {
      i += 1;
      setCount(i);
      console.log(i);
    }, 1000);

    // clean-up function
    return () => {
      console.log("component DOM'dan kaldırıldığında çalıştı!");
      clearInterval(id);
    };
  }, []);

  return createPortal(
    <div className="modal">
      <div className="modal-overlay" onClick={handleModelClose}></div>
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">{title}</h5>
          <h5 className="modal-title">{count}</h5>

          <span className="close-button" onClick={handleModelClose}>
            &times;
          </span>
        </div>
        <div className="modal-body">
          <p>{desc}</p>
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleModelClose}
          >
            Kapat
          </button>
          <button type="button" className="btn btn-primary">
            Kaydet
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
};

export default Modal;

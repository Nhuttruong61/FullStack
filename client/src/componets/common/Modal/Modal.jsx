import React, { memo } from "react";
import "./Modal.scss";
import { IoMdClose } from "react-icons/io";

function Modal({ children, isOpen, setisOpen, title }) {
  return isOpen ? (
    <div className="modal" onClick={() => setisOpen(false)}>
      <div className="modal--content" onClick={(e) => e.stopPropagation()}>
        <div className="modal--header">
          <h2 className="modal--title">{title}</h2>
          <button 
            className="modal--close"
            onClick={() => setisOpen(false)}
            aria-label="Close modal"
          >
            <IoMdClose size={28} />
          </button>
        </div>
        <div className="modal--body">{children}</div>
      </div>
    </div>
  ) : null;
}

export default memo(Modal);
import React, { memo } from "react";
import "./Drawer.scss";
import { IoMdClose } from "react-icons/io";

function DrawerCpn({ children, isOpen, setisOpen }) {
  return isOpen ? (
    <div className="drawer" onClick={() => setisOpen(false)}>
      <div className="drawer--content" onClick={(e) => e.stopPropagation()}>
        <div className="drawer--content--header">
          <div></div>
          <button 
            className="drawer--content--close"
            onClick={() => setisOpen(false)}
            aria-label="Close drawer"
          >
            <IoMdClose size={24} />
          </button>
        </div>
        <div className="drawer--content--children">{children}</div>
      </div>
    </div>
  ) : null;
}

export default memo(DrawerCpn);

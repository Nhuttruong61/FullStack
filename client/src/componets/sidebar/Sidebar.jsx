import React from "react";
import "./Sidebar.scss";
import { IoMdClose } from "react-icons/io";

function Sidebar({ children, setListMenuRp }) {
  return (
    <div className="sidebar" onClick={() => setListMenuRp(false)}>
      <div className="sidebar--list" onClick={(e) => e.stopPropagation()}>
        <div className="sidebar--list--close">
          <span onClick={() => setListMenuRp(false)}>
            <IoMdClose size={24} />
          </span>
        </div>
        <div className="sidebar--list--children">{children}</div>
      </div>
    </div>
  );
}

export default Sidebar;

import React from "react";
import "./Sidebar.scss";
import { sidebar } from "../../../static/Admin";

function SideBar({ active, setActive }) {
  return (
    <div className="sidebar">
      {sidebar.map((el, index) => (
        <div
          className={`sidebar--list ${active === index + 1 ? "active" : ""}`}
          key={el?.id || index}
          onClick={() => setActive(index + 1)}
          title={el.name}
        >
          <el.icon className="sidebar--list--icon" />
          <span className="sidebar--list--name">{el.name}</span>
        </div>
      ))}
    </div>
  );
}

export default SideBar;

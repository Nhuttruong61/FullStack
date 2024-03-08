import React, { useState } from "react";
import SideBar from "../sidebar/SideBar";
import AdminItem from "../AdminItem/AminItem";
import "./AdminContent.scss";
function AdminContent() {
  const [active, setActive] = useState(1);
  return (
    <div className="AdminCT">
      <SideBar active={active} setActive={setActive} />
      <AdminItem active={active} />
    </div>
  );
}

export default AdminContent;

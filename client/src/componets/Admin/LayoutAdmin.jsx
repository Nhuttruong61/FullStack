import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Header from "./header/Header";

function LayoutAdmin({ children }) {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user?.role !== "admin") {
      navigate("/");
    }
  }, [user, navigate]);

  if (!user || user?.role !== "admin") {
    return null;
  }

  return (
    <div>
      <Header />
      {children}
    </div>
  );
}

export default LayoutAdmin;

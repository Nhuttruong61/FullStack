import React from "react";
import Footter from "../footer/Footter";
import Header from "../header/Header";

function Layout({ children }) {
  return (
    <div>
      <Header />
      {children}
      <Footter />
    </div>
  );
}

export default Layout;

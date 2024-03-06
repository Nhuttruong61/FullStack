import React from "react";
import Header from "../headerComponet/Header";
import Footter from "../footer/Footter";

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

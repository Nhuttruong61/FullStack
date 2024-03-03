import React from "react";
import "./Input.scss";
function Input(props) {
  return (
    <input
      className={props.className}
      value={props.value}
      type={props.type}
      onChange={props?.onChange}
      placeholder={props.placeholder}
    />
  );
}

export default Input;

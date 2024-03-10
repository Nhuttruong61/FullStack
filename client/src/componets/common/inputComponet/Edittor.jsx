import React, { memo, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Edittor = (props) => {
  return (
    <ReactQuill theme="snow" value={props?.value} onChange={props?.setValue} />
  );
};

export default memo(Edittor);

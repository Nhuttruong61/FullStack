import React, { memo } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import ImageUploader from "react-quill-image-uploader"; // Import plugin image-uploader

const Edittor = (props) => {
  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ size: ["small", false, "large", "huge"] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link", "image", "video"],
        ["clean"],
      ],
      handlers: {
        image: ImageUploader.handler,
      },
    },
  };

  return (
    <ReactQuill
      theme="snow"
      value={props?.value}
      onChange={props?.setValue}
      modules={modules}
    />
  );
};

export default memo(Edittor);

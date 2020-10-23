import { useState } from "react";

const useImageUploader = () => {
  const [fileList, setFileList] = useState([]);
  const [preview, setPreview] = useState({
    previewVisible: false,
    previewImage: "",
    previewTitle: "",
  });

  return {
    fileList,
    setFileList,
    preview,
    setPreview,
  };
};

export default useImageUploader;

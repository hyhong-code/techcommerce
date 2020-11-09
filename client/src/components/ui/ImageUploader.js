import React from "react";
import { Upload, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import getBase64Url from "../../utils/getBase64Url";

const ImageUploader = ({
  fileList,
  setFileList,
  preview,
  setPreview,
  fileListLength = 4,
  disabled = false,
  className,
}) => {
  const { previewVisible, previewImage, previewTitle } = preview;

  const handleFileChange = ({ fileList }) => setFileList(fileList);

  // Open Preview
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64Url(file.originFileObj);
    }

    setPreview({
      previewVisible: true,
      previewImage: file.url || file.preview,
      previewTitle: file.name || file.url.substring(file.url.lastIndexOf("/") + 1),
    });
  };

  // Cancel Preview
  const handleCancelPreview = () => setPreview((prev) => ({ ...prev, previewVisible: false }));

  return (
    <div className={`image-uploader ${className || ""}`}>
      <Upload
        disabled={disabled}
        action={getBase64Url}
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleFileChange}
      >
        {fileList.length >= fileListLength ? null : (
          <div>
            <PlusOutlined />
            <div className="image-uploader__button">Upload Images</div>
          </div>
        )}
      </Upload>
      <Modal
        visible={previewVisible}
        title={previewTitle}
        footer={null}
        onCancel={handleCancelPreview}
      >
        <img alt={previewTitle} src={previewImage} className="image-uploader__preview-image" />
      </Modal>
    </div>
  );
};

export default ImageUploader;

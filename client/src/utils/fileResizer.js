import Resizer from "react-image-file-resizer";

export default (file) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      600, // 600px in width
      600, // 600px in height
      "JPEG", // JPEG format
      100, // percentage of original quality
      0,
      (uri) => {
        resolve(uri);
      },
      "base64"
    );
  });

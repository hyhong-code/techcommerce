const FALLBACK_URL =
  "https://commerce-antd.s3-us-west-2.amazonaws.com/products/default.png";

const handleImageError = (evt) => {
  if (evt.target.src !== FALLBACK_URL) {
    evt.target.onerror = null;
    evt.target.src = FALLBACK_URL;
  }
};

export default handleImageError;

import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Spin } from "antd";
import { Carousel } from "react-responsive-carousel";

import handleImageError from "../utils/handleImageError";
import { getProduct, clearCurrentProduct } from "../redux/actions/product";
import ProductInfo from "../components/products/ProductInfo";

const Product = () => {
  const params = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProduct(params.slug));

    return () => {
      dispatch(clearCurrentProduct());
    };
  }, [dispatch, params.slug]);

  const { currentProduct, currentProductLoading } = useSelector(
    ({ product }) => product
  );

  return currentProductLoading ? (
    <Spin size="large" />
  ) : (
    <div className="product">
      {/* Product images carousel */}
      <div className="product__images">
        <Carousel autoPlay showArrows infiniteLoop stopOnHover>
          {currentProduct?.images.map((image) => (
            <img
              key={image.key}
              src={image.url}
              alt={currentProduct.title}
              onError={handleImageError}
              className="product__images__item"
            />
          ))}
        </Carousel>
      </div>

      {/* Product info */}
      <div className="product__information">
        <ProductInfo product={currentProduct} />
      </div>
    </div>
  );
};

export default Product;

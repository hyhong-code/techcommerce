import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Spin, Tabs, Divider, Rate } from "antd";
import { Carousel } from "react-responsive-carousel";

import handleImageError from "../utils/handleImageError";
import { getProduct, clearCurrentProduct } from "../redux/actions/product";
import ProductInfo from "../components/products/ProductInfo";
import getAverageProductRating from "../utils/getAverageProductRating";

const { TabPane } = Tabs;

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
      <div className="product__left">
        <div className="product__left__images">
          <Carousel autoPlay showArrows infiniteLoop stopOnHover>
            {currentProduct?.images.map((image) => (
              <img
                key={image.key}
                src={image.url}
                alt={currentProduct.title}
                onError={handleImageError}
                className="product__left__images__item"
              />
            ))}
          </Carousel>
        </div>

        {/* Product Tabs */}
        <div className="product__left__tabs">
          <Tabs type="card">
            <TabPane tab="Description" key={1}>
              <p>{currentProduct?.description}</p>
            </TabPane>
            <TabPane tab="Read more" key={2}>
              For more information about this product, please visit{" "}
              {currentProduct?.brand} official website.
            </TabPane>
          </Tabs>
        </div>
      </div>

      {/* Product info */}
      <div className="product__information">
        <div className="product__information__lead">
          <h1>
            {currentProduct?.title} - <span>${currentProduct?.price}</span>
          </h1>
        </div>
        <div className="product__information__ratings">
          <Rate
            value={getAverageProductRating(currentProduct?.ratings)}
            disabled
          />
          <span className="product__information__ratings__count">
            ({currentProduct?.ratings.length})
          </span>
        </div>
        <ProductInfo product={currentProduct} />
      </div>

      <div className="product__similar">
        <Divider />
        <h2 className="product__similar__title">Similar Products</h2>
        <Divider />
      </div>
    </div>
  );
};

export default Product;

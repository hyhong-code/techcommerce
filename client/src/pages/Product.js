import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Spin, Tabs, Divider, Rate } from "antd";
import { Carousel } from "react-responsive-carousel";

import handleImageError from "../utils/handleImageError";
import {
  getProduct,
  clearCurrentProduct,
  listSimilarProducts,
  clearSimilarProducts,
} from "../redux/actions/product";
import ProductInfo from "../components/products/ProductInfo";
import getAverageProductRating from "../utils/getAverageProductRating";
import LoadingCards from "../components/ui/LoadingCards";
import ProductCard from "../components/products/ProductCard";
import SEOHead from "../components/SEOHead";

const { TabPane } = Tabs;

const Product = () => {
  const params = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProduct(params.slug));
    dispatch(listSimilarProducts(params.slug));
    return () => {
      dispatch(clearCurrentProduct());
      dispatch(clearSimilarProducts());
    };
  }, [dispatch, params.slug]);

  const {
    currentProduct,
    currentProductLoading,
    similarProducts,
    similarProductsLoading,
  } = useSelector(({ product }) => product);

  return currentProductLoading ? (
    <Spin size="large" />
  ) : (
    <div className="product">
      <SEOHead
        title={`${currentProduct?.title} | ${process.env.REACT_APP_APP_NAME}`}
        description={currentProduct?.description}
      />

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
              For more information about this product, please visit {currentProduct?.brand} official
              website.
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
          <Rate allowHalf value={getAverageProductRating(currentProduct?.ratings)} disabled />
          <span className="product__information__ratings__count">
            ({currentProduct?.ratings.length})
          </span>
        </div>
        <ProductInfo product={currentProduct} />
      </div>

      {/* Similar Products */}
      <div className="product__similar">
        <Divider />
        <h2 className="product__similar__title">Similar Products</h2>
        <Divider />
        <div className="product__similar__cards">
          {similarProductsLoading ? (
            <LoadingCards />
          ) : similarProducts.length ? (
            similarProducts.map((product) => <ProductCard key={product._id} product={product} />)
          ) : (
            <p className="product__similar__cards__not-found">No products found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Product;

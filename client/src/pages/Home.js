import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Spin } from "antd";

import ProductCard from "../components/products/ProductCard";
import { listProducts } from "../redux/actions/product";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  const { products, listProductsLoading } = useSelector(
    ({ product }) => product
  );

  return (
    <div className="home">
      <div className="home__lead"></div>

      {listProductsLoading ? (
        <Spin size="large" />
      ) : (
        <div className="home__products">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;

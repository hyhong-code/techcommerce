import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../../../redux/actions/product";

import ProductCard from "../products/ProductCard";

const Products = () => {
  const dispatch = useDispatch();
  const { products } = useSelector(({ product }) => product);

  useEffect(() => {
    dispatch(listProducts());
  }, []);

  return (
    <div className="admin-products">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};

export default Products;

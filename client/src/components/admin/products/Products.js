import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { listProducts } from "../../../redux/actions/product";
import ProductCard from "../products/ProductCard";
import LoadingCards from "../../ui/LoadingCards";

const Products = () => {
  const dispatch = useDispatch();
  const { products, listProductsLoading } = useSelector(
    ({ product }) => product
  );

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <div className="admin-products">
      {!listProductsLoading ? (
        products?.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))
      ) : (
        <LoadingCards count={5} />
      )}
    </div>
  );
};

export default Products;

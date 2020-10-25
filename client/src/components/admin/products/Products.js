import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { listProducts } from "../../../redux/actions/product";

const Products = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listProducts());
  }, []);

  return <div></div>;
};

export default Products;

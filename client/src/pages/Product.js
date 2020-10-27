import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Spin } from "antd";

import { getProduct } from "../redux/actions/product";

const Product = () => {
  const params = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProduct(params.slug));
  }, [dispatch, params.slug]);

  const { currentProduct, currentProductLoading } = useSelector(
    ({ product }) => product
  );

  return currentProductLoading ? (
    <Spin size="large" />
  ) : (
    <div>{JSON.stringify(currentProduct)}</div>
  );
};

export default Product;

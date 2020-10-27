import React from "react";
import { useParams } from "react-router-dom";

const Product = () => {
  const params = useParams();
  console.log(params.slug);

  return <div></div>;
};

export default Product;

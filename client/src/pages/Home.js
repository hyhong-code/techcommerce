import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { listProducts } from "../redux/actions/product";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  const { products } = useSelector(({ product }) => product);

  return <div className="">{JSON.stringify(products)}</div>;
};

export default Home;

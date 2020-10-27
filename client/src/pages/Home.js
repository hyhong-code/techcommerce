import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import LoadingCards from "../components/ui/LoadingCards";
import Typewriter from "../components/ui/Typewriter";
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
      <div className="home__lead">
        <Typewriter
          text={["Latest Products", "New Arrivals", "Best Sellers"]}
        />
      </div>

      <div className="home__products">
        {listProductsLoading ? (
          <LoadingCards count={7} />
        ) : (
          products?.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        )}
      </div>
    </div>
  );
};

export default Home;

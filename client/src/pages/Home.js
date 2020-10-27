import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import Typewriter from "../components/ui/Typewriter";
import NewArrivals from "../components/products/NewArrivals";
import BestSellings from "../components/products/BestSellings";
import { listProducts } from "../redux/actions/product";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <div className="home">
      {/* Lead */}
      <div className="home__lead">
        <Typewriter
          text={["Latest Products", "New Arrivals", "Best Sellers"]}
        />
      </div>

      {/* New Arrivals */}
      <NewArrivals />

      {/* Best Sellings */}
      <BestSellings />
    </div>
  );
};

export default Home;

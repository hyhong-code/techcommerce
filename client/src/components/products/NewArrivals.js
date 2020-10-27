import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Pagination } from "antd";

import { listNewArrival } from "../../redux/actions/product";
import ProductCard from "../products/ProductCard";
import LoadingCards from "../ui/LoadingCards";

const NUM_PER_PAGE = 4;

const NewArrivals = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(listNewArrival(4));
  }, [dispatch]);

  const { latestArrivals, latestArrivalsLoading, productCount } = useSelector(
    ({ product }) => product
  );

  return (
    <div className="new-arrivals">
      <div className="new-arrivals__lead">
        <h2>New Arrivals</h2>
      </div>

      <div className="new-arrivals__cards">
        {latestArrivalsLoading ? (
          <LoadingCards count={4} />
        ) : (
          latestArrivals?.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        )}
      </div>

      <Pagination
        current={page}
        total={productCount}
        pageSize={NUM_PER_PAGE}
        className="new-arrivals__pagination"
        onChange={setPage}
      />
    </div>
  );
};

export default NewArrivals;

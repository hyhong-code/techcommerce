import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Pagination } from "antd";

import { listBestSellings } from "../../redux/actions/product";
import ProductCard from "../products/ProductCard";
import LoadingCards from "../ui/LoadingCards";

const NUM_PER_PAGE = 4;

const BestSellings = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(
      listBestSellings({ limit: NUM_PER_PAGE, skip: (page - 1) * NUM_PER_PAGE })
    );
  }, [dispatch, page]);

  const { bestSellings, bestSellingsLoading, productCount } = useSelector(
    ({ product }) => product
  );

  return (
    <div className="best-sellings">
      <div className="best-sellings__lead">
        <h2>Best Sellings</h2>
      </div>

      <div className="best-sellings__cards">
        {bestSellingsLoading ? (
          <LoadingCards count={4} />
        ) : (
          bestSellings?.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        )}
      </div>

      <Pagination
        current={page}
        total={productCount}
        pageSize={NUM_PER_PAGE}
        className="best-sellings__pagination"
        onChange={setPage}
      />
    </div>
  );
};

export default BestSellings;

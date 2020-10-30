import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  clearProductsBySub,
  listProductsBySub,
} from "../redux/actions/product";
import { listSubs } from "../redux/actions/sub";
import ProductCard from "../components/products/ProductCard";
import LoadingCard from "../components/ui/LoadingCards";

const Sub = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listProductsBySub(slug));
    dispatch(listSubs());
    return () => {
      dispatch(clearProductsBySub());
    };
  }, [dispatch, slug]);

  const [
    { productsBySubs, productsBySubsLoading },
    { subs },
  ] = useSelector(({ product, sub }) => [product, sub]);

  return (
    <div className="sub">
      {/* Lead */}
      <div className="sub__lead">
        <h1>
          {productsBySubs?.length} products found with sub category "
          {subs?.find((s) => s.slug === slug).name}"
        </h1>
      </div>

      {/* Product cards */}
      <div className="sub__products">
        {!productsBySubsLoading ? (
          productsBySubs?.map((product) => (
            <ProductCard product={product} key={product._id} />
          ))
        ) : (
          <LoadingCard count={5} />
        )}
      </div>
    </div>
  );
};

export default Sub;

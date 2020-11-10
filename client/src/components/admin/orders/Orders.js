import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { listOrders } from "../../../redux/actions/order";

const Orders = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector(({ order }) => order);

  useEffect(() => {
    dispatch(listOrders());
  }, [dispatch]);

  return <div>{JSON.stringify(orders, null, 4)}</div>;
};

export default Orders;

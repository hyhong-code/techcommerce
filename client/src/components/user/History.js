import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Typography, Collapse, Tag, List } from "antd";
import moment from "moment";
import { Carousel } from "react-responsive-carousel";

import { listUserOrders } from "../../redux/actions/order";

const { Title } = Typography;
const { Panel } = Collapse;

const tagStyles = {
  position: "absolute",
  top: 4,
  left: 4,
  borderRadius: 5,
  backgroundColor: "#7f7f7f",
  color: "#eee",
  padding: "2px 8px",
  fontSize: "0.8rem",
};

const getStatusTagColor = (status) => {
  switch (status) {
    case "Not processed":
      return "blue";
    case "Processing":
      return "cyan";
    case "Dispatched":
      return "purple";
    case "Cancelled":
      return "gold";
    case "Completed":
      return "green";
    default:
      return undefined;
  }
};

const History = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector(({ order }) => order);

  useEffect(() => {
    dispatch(listUserOrders());
  }, [dispatch]);

  return (
    <div className="user-history">
      {/* Title */}
      <Title level={2} className="user-history__title">
        Your Orders
      </Title>
      {/* Orders */}
      <Collapse className="user-history__orders">
        {orders.map((order, idx) => (
          <Panel
            key={idx}
            header={
              <div className="user-history__orders__item-header">
                {/* Order Id */}
                <span className="user-history__orders__item-header__id">
                  Order Id: <span>{order.paymentIntent.id}</span>
                </span>

                {/* Order Date */}
                <span className="user-history__orders__item-header__date">
                  {moment(order.createdAt).calendar()}
                </span>

                {/* Number of Items */}
                <span className="user-history__orders__item-header__quantity">
                  Items:{" "}
                  <span>{order.products.reduce((acc, cur) => acc + Number(cur.count), 0)}</span>
                </span>

                {/* Total Price */}
                <span className="user-history__orders__item-header__price">
                  Total:{" "}
                  <span>
                    {(Number(order.paymentIntent.amount) / 100).toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </span>
                </span>

                {/* Order Status */}
                <Tag
                  className="user-history__orders__item-header__status"
                  color={getStatusTagColor(order.orderStatus)}
                >
                  {order.orderStatus}
                </Tag>
              </div>
            }
          >
            {/* Content */}
            <div className="user-history__orders__item-content">
              {/* Products images */}
              <Carousel autoPlay>
                {order.products.map((product, idx) => (
                  <div style={{ position: "relative" }} key={idx}>
                    <img
                      className="user-history__orders__item-content__img"
                      src={product.product.images[0].url}
                      alt={product.product.title}
                    />
                    <p style={tagStyles}>
                      {product.product.brand} {product.product.title} ({product.color})
                    </p>
                  </div>
                ))}
              </Carousel>

              {/* Products info list */}
              <List
                className="user-history__orders__item-content__list"
                header={<span style={{ fontWeight: 500 }}>Products Ordered</span>}
                bordered
                dataSource={order.products}
                renderItem={(product) => (
                  <List.Item>
                    • {product.product.brand} {product.product.title} ({product.color}) $
                    {product.product.price}{" "}
                    <span style={{ fontWeight: 500 }}>X {product.count}</span>
                  </List.Item>
                )}
              />
            </div>
          </Panel>
        ))}
      </Collapse>
    </div>
  );
};

export default History;

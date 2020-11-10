import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Typography, Collapse, Tag, List, Select, message } from "antd";
import moment from "moment";
import { Carousel } from "react-responsive-carousel";

import { listOrders, updateOrderStatus } from "../../../redux/actions/order";
import getStatusTagColor from "../../../utils/getStatusTagColor";
import formatError from "../../../utils/formatErrorMsg";

const { Title } = Typography;
const { Panel } = Collapse;
const { Option } = Select;

const STATUS_OPTIONS = ["Not processed", "Processing", "Dispatched", "Cancelled", "Completed"];

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

const Orders = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector(({ order }) => order);

  useEffect(() => {
    dispatch(listOrders());
  }, [dispatch]);

  const handleStatusChange = async (id, orderStatus) => {
    try {
      await dispatch(updateOrderStatus(id, orderStatus));
      message.success("Order status successfully updated.");
    } catch (error) {
      message.error(formatError(error));
    }
  };

  return (
    <div className="admin-orders">
      {/* Title */}
      <Title level={2} className="admin-orders__title">
        Orders
      </Title>

      {/* Orders */}
      <Collapse className="admin-orders__orders">
        {orders.map((order, idx) => (
          <Panel
            key={idx}
            header={
              <div className="admin-orders__orders__item-header">
                {/* Order Id */}
                <span className="admin-orders__orders__item-header__id">
                  Order Id: <span>{order.paymentIntent.id}</span>
                </span>

                {/* Order Date */}
                <span className="admin-orders__orders__item-header__date">
                  {moment(order.createdAt).calendar()}
                </span>

                {/* Number of Items */}
                <span className="admin-orders__orders__item-header__quantity">
                  Items:{" "}
                  <span>{order.products.reduce((acc, cur) => acc + Number(cur.count), 0)}</span>
                </span>

                {/* Total Price */}
                <span className="admin-orders__orders__item-header__price">
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
                  className="admin-orders__orders__item-header__status"
                  color={getStatusTagColor(order.orderStatus)}
                >
                  {order.orderStatus}
                </Tag>
              </div>
            }
          >
            {/* Content */}
            <div className="admin-orders__orders__item-content">
              {/* Products images */}
              <Carousel autoPlay>
                {order.products.map((product, idx) => (
                  <div style={{ position: "relative" }} key={idx}>
                    <img
                      className="admin-orders__orders__item-content__img"
                      src={product.product.images[0].url}
                      alt={product.product.title}
                    />
                    <p style={tagStyles}>
                      {product.product.brand} {product.product.title} ({product.color})
                    </p>
                  </div>
                ))}
              </Carousel>

              <div className="admin-orders__orders__item-right">
                {/* Products info list */}
                <List
                  className="admin-orders__orders__item-content__list"
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

                {/* Update order status dropdown */}

                <div className="admin-orders__orders__item-content__status">
                  <p>Change Order Status:</p>
                  <Select
                    defaultValue={order.orderStatus}
                    onChange={(orderStatus) => handleStatusChange(order._id, orderStatus)}
                  >
                    {STATUS_OPTIONS.map((option) => (
                      <Option key={option} value={option}>
                        {option}
                      </Option>
                    ))}
                  </Select>
                </div>
              </div>
            </div>
          </Panel>
        ))}
      </Collapse>
    </div>
  );
};

export default Orders;

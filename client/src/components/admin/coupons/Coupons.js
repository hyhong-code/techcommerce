import React, { useState, useEffect } from "react";
import { Input, DatePicker, Typography, Button, message, Popconfirm } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { CloseOutlined } from "@ant-design/icons";
import moment from "moment";
import clsx from "clsx";

import { createCoupon, deleteCoupon, listCoupons } from "../../../redux/actions/coupon";
import formatErrorMsg from "../../../utils/formatErrorMsg";

const { Title } = Typography;

const INITIAL_FORMDATA = {
  expiry: null,
  code: "",
  discount: null,
};

const Coupons = () => {
  const dispatch = useDispatch();
  const { coupons } = useSelector(({ coupon }) => coupon);
  const [{ expiry, code, discount }, setFormData] = useState(INITIAL_FORMDATA);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(listCoupons());
  }, [dispatch]);

  const handleCodeChange = (evt) => {
    setFormData((prev) => ({ ...prev, code: evt.target.value }));
  };

  const handleDiscountChange = (evt) => {
    setFormData((prev) => ({ ...prev, discount: evt.target.value }));
  };

  const handleDateChange = (newDate) => {
    setFormData((prev) => ({
      ...prev,
      expiry: newDate,
    }));
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    try {
      // Handle missing field.
      if (!code && discount && expiry) {
        return message.error("All fields are required.", 6);
      }

      // Handle invalid date.
      if (expiry.unix() < Math.round(Date.now() / 1000)) {
        return message.error("Expiry datetime must be later than current datetime.", 6);
      }

      setLoading(true);
      await dispatch(createCoupon({ code, discount, expiry: expiry.format() }));
      setFormData(INITIAL_FORMDATA);
      message.success(`Coupon ${code} has been created.`);
    } catch (error) {
      message.error(formatErrorMsg(error), 6);
    }
    setLoading(false);
  };

  const handleDelete = async (code) => {
    try {
      await dispatch(deleteCoupon(code));
      message.success(`Coupon ${code} has been deleted.`, 6);
    } catch (error) {
      message.error(formatErrorMsg(error), 6);
    }
  };

  return (
    <div className="coupons">
      <form onSubmit={handleSubmit} className="coupons__form">
        {/* Title */}
        <Title level={2} className="coupons__form__title">
          Create Coupons
        </Title>

        {/* Code input */}
        <Input
          placeholder="Discount code"
          autoFocus
          allowClear
          disabled={loading}
          value={code}
          onChange={handleCodeChange}
          className="coupons__form__code"
        />

        {/* Discount input */}
        <Input
          type="number"
          placeholder="Discount amount"
          prefix={<span>$</span>}
          allowClear
          disabled={loading}
          value={discount}
          onChange={handleDiscountChange}
          className="coupons__form__discount"
        />

        {/* Date input */}
        <DatePicker
          className="coupons__form__date"
          showTime
          value={expiry}
          disabled={loading}
          onChange={handleDateChange}
        />

        {/* Submit button */}
        <Button
          loading={loading}
          type="primary"
          htmlType="submit"
          className="coupons__form__create-btn"
        >
          Create
        </Button>
      </form>

      {/* Coupons */}
      <div className="coupons__lower">
        {/* Coupons */}
        <Title level={2} className="coupons__lower__title">
          Coupons
        </Title>

        {/* Coupon list */}
        <div className="coupons__list">
          {coupons.map((coupon) => (
            <div key={coupon._id} className="coupons__list__item">
              <div className="coupons__list__item__code">{coupon.code}</div>
              <div className="coupons__list__item__discount">${coupon.discount}</div>
              <div
                className={clsx("coupons__list__item__expiry", {
                  "coupons__list__item__expiry--expired": Date.parse(coupon.expiry) < Date.now(),
                })}
              >
                {moment(coupon.expiry).format("LLL")}
              </div>

              {/* Delete button */}
              <Popconfirm
                title={`Delete ${coupon.code}?`}
                okText="Delete"
                onConfirm={() => handleDelete(coupon.code)}
              >
                <Button
                  icon={<CloseOutlined />}
                  type="ghost"
                  size="small"
                  className="coupons__list__item__close-btn"
                />
              </Popconfirm>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Coupons;

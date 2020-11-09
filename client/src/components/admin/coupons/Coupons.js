import React, { useState } from "react";
import { Input, DatePicker, Typography, Button } from "antd";

const { Title } = Typography;

const Coupons = () => {
  const [{ expiry, code, discount }, setFormData] = useState({
    expiry: "",
    code: "",
    discount: null,
  });

  return (
    <form className="coupons">
      {/* Title */}
      <Title level={2} className="coupons__title">
        Create Coupons
      </Title>

      {/* Code input */}
      <Input placeholder="code" autoFocus allowClear value={code} className="coupons__code" />

      {/* Discount input */}
      <Input
        type="number"
        min={0.01}
        placeholder={0.01}
        prefix={<span>$</span>}
        allowClear
        value={discount}
        className="coupons__discount"
      />

      {/* Date input */}
      <DatePicker
        className="coupons__date"
        value={expiry}
        showTime
        onChange={(_, s) => console.log(Date.parse(s))}
      />

      <Button type="primary" className="coupons__create-btn">
        Create
      </Button>
    </form>
  );
};

export default Coupons;

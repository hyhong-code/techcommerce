import React from "react";
import { Skeleton, Card } from "antd";

const LoadingCards = ({ count = 1 }) => {
  return Array.from({ length: count }).map((_, idx) => (
    <Card className="loading-cards" key={idx}>
      <Skeleton active />
    </Card>
  ));
};

export default LoadingCards;

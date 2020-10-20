import React from "react";
import { Link } from "react-router-dom";

const History = () => {
  return (
    <div className="user-history">
      History
      <Link to="/admin">admin</Link>
    </div>
  );
};

export default History;

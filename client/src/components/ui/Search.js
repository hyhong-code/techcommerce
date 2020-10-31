import React, { useEffect, useState } from "react";
import { Input } from "antd";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { filterProducts } from "../../redux/actions/product";

const { Search } = Input;

const _Search = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (search) {
      dispatch(filterProducts(search));
    }
  }, [search, dispatch]);

  const handleSubmit = async (evt) => {
    history.push("/shop");
  };

  return (
    <div className="header-search-box">
      <Search
        placeholder="Search products..."
        value={search}
        onChange={(evt) => setSearch(evt.target.value)}
        onSearch={handleSubmit}
        className="header-search-box__input"
      />
    </div>
  );
};

export default _Search;

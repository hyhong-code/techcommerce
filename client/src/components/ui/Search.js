import React from "react";
import { Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { handleSearchTextChange } from "../../redux/actions/product";

const { Search } = Input;

const _Search = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { searchText } = useSelector(({ product }) => product);

  const handleSubmit = async (evt) => {
    history.push("/shop");
  };

  return (
    <div className="header-search-box">
      <Search
        allowClear
        placeholder="Search products..."
        value={searchText}
        onChange={(evt) => dispatch(handleSearchTextChange(evt.target.value))}
        onSearch={handleSubmit}
        className="header-search-box__input"
      />
    </div>
  );
};

export default _Search;

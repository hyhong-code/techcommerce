import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SearchOutlined } from "@ant-design/icons";
import { Space, Typography, Input } from "antd";

import { listSubs } from "../../../redux/actions/sub";
import { listCategories } from "../../../redux/actions/category";
import CreateSub from "./CreateSub";
import SubTag from "./SubTag";
import useFilter from "../../../hooks/useFilter";
const { Title } = Typography;

const Subs = () => {
  const dispatch = useDispatch();
  const { subs } = useSelector(({ sub }) => sub);
  const { filter, setFilterKeyword, filterKeyword } = useFilter();

  // Push categories and subs into state
  useEffect(() => {
    dispatch(listCategories());
    dispatch(listSubs());
  }, [dispatch]);

  return (
    <Space className="subs" direction="vertical" size="middle">
      {/* Create Sub form */}
      <CreateSub />

      {/* Category Tags */}
      <Space direction="vertical">
        <Title level={2} className="subs-title">
          Sub Categories
        </Title>

        {/* Search Input */}
        <Input
          prefix={<SearchOutlined />}
          placeholder="Filter sub categories..."
          allowClear
          value={filterKeyword}
          onChange={(evt) => setFilterKeyword(evt.target.value)}
        />

        {/* Sub tags */}
        {filter(subs, "name").map((sub) => (
          <SubTag sub={sub} key={sub._id} />
        ))}
      </Space>
    </Space>
  );
};

export default Subs;

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Tag, message, Popover } from "antd";

import { deleteCategory } from "../../redux/actions/cateogry";
import UpdateForm from "./UpdateForm";

const TAG_COLORS = ["magenta", "volcano", "cyan", "geekblue", "purple"];

const CategoryTag = ({ category }) => {
  const dispatch = useDispatch();
  const [popUpdateVisible, setPopUpdateVisible] = useState(false);

  const handleDelete = async (evt, category) => {
    evt.preventDefault();
    try {
      await dispatch(deleteCategory(category.slug));
      message.info(`${category.name} is successfully deleted.`, 6);
    } catch (error) {
      message.error(error.message, 6);
    }
  };

  return (
    <Popover
      content={
        <UpdateForm
          category={category}
          onClosePopover={() => setPopUpdateVisible(false)}
        />
      }
      title="Update Name"
      key={category.slug}
      trigger="click"
      visible={popUpdateVisible}
      onVisibleChange={() => setPopUpdateVisible((prev) => !prev)}
    >
      <Tag
        closable
        onClose={(evt) => handleDelete(evt, category)}
        color={TAG_COLORS[Math.floor(Math.random() * TAG_COLORS.length)]}
        className="category-tag"
      >
        {category.name}
      </Tag>
    </Popover>
  );
};

export default CategoryTag;

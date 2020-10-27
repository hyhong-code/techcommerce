import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Tag, message, Popover } from "antd";
import { Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

import { deleteCategory } from "../../../redux/actions/category";
import UpdateForm from "../CollectionUpdateForm";
import randomTagColor from "../../../utils/randomTagColor";

const { confirm } = Modal;

const CategoryTag = ({ category }) => {
  const dispatch = useDispatch();
  const [popUpdateVisible, setPopUpdateVisible] = useState(false);

  const showDeletePopup = (evt, category) => {
    evt.preventDefault();
    confirm({
      icon: <ExclamationCircleOutlined />,
      content: `Are you sure you want to delete ${category.name}?`,
      okText: "Delete",
      okType: "danger",
      cancelText: "Cancel",
      maskClosable: true,
      onOk() {
        handleDelete(category);
      },
    });
  };

  const handleDelete = async (category) => {
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
          collectionItem={category}
          onClosePopover={() => setPopUpdateVisible(false)}
          collectionType="category"
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
        onClose={(evt) => showDeletePopup(evt, category)}
        color={randomTagColor()}
        className="category-tag"
      >
        {category.name}
      </Tag>
    </Popover>
  );
};

export default CategoryTag;

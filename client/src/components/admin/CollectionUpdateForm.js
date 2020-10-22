import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { message, Input, Button, Select } from "antd";

import formatErrorMsg from "../../utils/formatErrorMsg";
import { updateSub } from "../../redux/actions/sub";
import { updateCategory } from "../../redux/actions/category";

const { Option } = Select;

const UpdateForm = ({ collectionItem, onClosePopover, collectionType }) => {
  const dispatch = useDispatch();
  const { categories } = useSelector(({ category }) => category);
  const [name, setName] = useState(collectionItem.name);
  const [loading, setLoading] = useState("");
  const [selectedCategorySlug, setSelectedCategorySlug] = useState(
    categories.find((category) => category._id === collectionItem.parent)?.slug
  );

  const handleUpdate = async (evt) => {
    evt.preventDefault();
    setLoading(true);
    try {
      await dispatch(
        collectionType === "category"
          ? updateCategory(collectionItem, name)
          : collectionType === "sub" &&
              updateSub(collectionItem, name, selectedCategorySlug)
      );
      message.success(
        `${collectionItem.name}'s name is successfully changed to ${name}.`,
        6
      );
      setLoading(false);
      onClosePopover();
    } catch (error) {
      setLoading(false);
      message.error(formatErrorMsg(error), 6);
    }
  };

  return (
    <form className="update-category" onSubmit={handleUpdate}>
      <Input
        value={name}
        onChange={(evt) => setName(evt.target.value)}
        size="small"
        placeholder="Give it a new name"
        className="update-category__input"
        autoFocus
      />

      {/* Select */}
      {collectionType === "sub" && (
        <Select
          className="update-category__select"
          placeholder="Select a category"
          onChange={setSelectedCategorySlug}
          value={selectedCategorySlug}
          disabled={loading}
        >
          {categories?.map((category) => (
            <Option key={category._id} value={category.slug}>
              {category.name}
            </Option>
          ))}
        </Select>
      )}

      <Button
        htmlType="submit"
        loading={loading}
        size="small"
        type="primary"
        className="update-category__button"
      >
        Update
      </Button>
    </form>
  );
};

export default UpdateForm;

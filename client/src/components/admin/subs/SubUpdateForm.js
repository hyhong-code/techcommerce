import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { message, Input, Button } from "antd";

import formatErrorMsg from "../../../utils/formatErrorMsg";
import { updateSub } from "../../../redux/actions/sub";

const UpdateForm = ({ sub, onClosePopover }) => {
  const [name, setName] = useState(sub.name);
  const [loading, setLoading] = useState("");
  const dispatch = useDispatch();

  const handleUpdate = async (evt) => {
    evt.preventDefault();
    setLoading(true);
    try {
      await dispatch(updateSub(sub, name));
      message.success(
        `${sub.name}'s name is successfully changed to ${name}.`,
        6
      );
      setName("");
      onClosePopover();
    } catch (error) {
      message.error(formatErrorMsg(error), 6);
    }
    setLoading(false);
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

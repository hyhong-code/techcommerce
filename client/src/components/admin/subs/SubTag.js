import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Tag, message, Popover } from "antd";
import { Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

import { deleteSub } from "../../../redux/actions/sub";
import UpdateForm from "../CollectionUpdateForm";
import randomTagColor from "../../../utils/randomTagColor";

const { confirm } = Modal;

const SubTag = ({ sub }) => {
  const dispatch = useDispatch();
  const [popUpdateVisible, setPopUpdateVisible] = useState(false);

  const showDeletePopup = (evt, sub) => {
    evt.preventDefault();
    confirm({
      icon: <ExclamationCircleOutlined />,
      content: `Are you sure you want to delete ${sub.name}?`,
      okText: "Delete",
      okType: "danger",
      cancelText: "Cancel",
      maskClosable: true,
      onOk() {
        handleDelete(sub);
      },
    });
  };

  const handleDelete = async (sub) => {
    try {
      await dispatch(deleteSub(sub.slug));
      message.info(`${sub.name} is successfully deleted.`, 6);
    } catch (error) {
      message.error(error.message, 6);
    }
  };

  return (
    <Popover
      content={
        <UpdateForm
          collectionItem={sub}
          onClosePopover={() => setPopUpdateVisible(false)}
          collectionType="sub"
        />
      }
      title="Update Name"
      key={sub.slug}
      trigger="click"
      visible={popUpdateVisible}
      onVisibleChange={() => setPopUpdateVisible((prev) => !prev)}
    >
      <Tag
        closable
        onClose={(evt) => showDeletePopup(evt, sub)}
        color={randomTagColor()}
        className="sub-tag"
      >
        {sub.name}
      </Tag>
    </Popover>
  );
};

export default SubTag;

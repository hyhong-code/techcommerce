import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import { listSubs } from "../../../redux/actions/sub";
import { listCategories } from "../../../redux/actions/category";
import CreateSub from "./CreateSub";

const Subs = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listCategories());
    dispatch(listSubs());
  }, []);

  return (
    <div className="subs">
      <CreateSub />
    </div>
  );
};

export default Subs;

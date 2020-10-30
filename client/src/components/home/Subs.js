import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Spin, Tag } from "antd";

import { listSubs } from "../../redux/actions/sub";
import randomTagColor from "../../utils/randomTagColor";

const Subs = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      await dispatch(listSubs());
      setLoading(false);
    })();
  }, [dispatch]);

  const { subs } = useSelector(({ sub }) => sub);
  return (
    <div className="home-subs">
      {/* Lead */}
      <div className="home-subs__lead">
        <h2>Sub Categories</h2>
      </div>

      {/* Tags */}
      <div className="home-subs__tags">
        {!loading ? (
          subs?.map((sub) => (
            <Link to={`/subs/${sub.slug}`} key={sub._id}>
              <Tag color={randomTagColor()} className="home-subs__tags__item">
                {sub.name}
              </Tag>
            </Link>
          ))
        ) : (
          <Spin size="large" />
        )}
      </div>
    </div>
  );
};

export default Subs;

import { useState } from "react";

const useFilter = () => {
  const [filterKeyword, setFilterKeyword] = useState("");

  const filter = (filterKeyword) => (collection, filterField) =>
    collection?.filter((item) =>
      item[filterField]
        .trim()
        .toLowerCase()
        .includes(filterKeyword.trim().toLowerCase())
    ) || [];

  return {
    filterKeyword,
    setFilterKeyword,
    filter: filter(filterKeyword),
  };
};

export default useFilter;

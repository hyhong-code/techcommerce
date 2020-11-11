const getStatusTagColor = (status) => {
  switch (status) {
    case "Not processed":
      return "blue";
    case "Processing":
      return "cyan";
    case "Dispatched":
      return "purple";
    case "Cancelled":
      return "gold";
    case "Completed":
      return "green";
    case "Cash on delivery":
      return "volcano";
    default:
      return undefined;
  }
};

export default getStatusTagColor;

const getAverageProductRating = (ratings) => {
  return ratings && ratings.length
    ? ratings.reduce((acc, cur) => acc + cur.star, 0) / ratings.length
    : 0;
};

export default getAverageProductRating;

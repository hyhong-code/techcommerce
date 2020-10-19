const admin = require("../services/firebase");

module.exports = (req, res, next) => {
  console.log(req.headers);
  next();
};

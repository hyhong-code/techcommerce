const User = require("../models/User");

exports.loadUser = async (req, res, next) => {
  res.status(200).json({ user: req.user });
};

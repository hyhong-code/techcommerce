const User = require("../models/User");

exports.loadUser = async (req, res, next) => {
  res.status(200).json({ user: req.user });
};

exports.isAdmin = async (req, res, next) => {
  if (req.user.role === "admin") {
    return res.status(200).json({ access: true });
  }

  res.status(403).json({
    errors: [{ msg: "Access denied" }],
  });
};

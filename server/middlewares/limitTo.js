module.exports = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    res.status(403).json({
      errors: [{ msg: "Access denied" }],
    });
  }
  next();
};

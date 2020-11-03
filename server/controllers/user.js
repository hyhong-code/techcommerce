exports.loadUser = async (req, res, next) => {
  res.status(200).json({ user: req.user });
};

exports.isAdmin = async (req, res, next) => {
  res.status(200).json({ access: true });
};

const User = require("../models/User");

exports.loadUser = async (req, res, next) => {
  res.status(200).json({ user: req.user });
};

exports.isAdmin = async (req, res, next) => {
  res.status(200).json({ access: true });
};

exports.updateUser = async (req, res, next) => {
  try {
    // Prevent client from updating role and email
    const cleanBody = Object.entries(req.body).reduce((acc, [k, v]) => {
      if (!["role", "email"].includes(k)) {
        acc[k] = v;
      }
      return acc;
    }, {});

    // Update user
    const user = await User.findByIdAndUpdate(req.user._id, cleanBody, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({ user });
  } catch (error) {
    console.error("[❌ updateUser ERROR]", error);
    res
      .status(500)
      .json({ errors: [{ msg: "Something went wrong, try again later." }] });
  }
};

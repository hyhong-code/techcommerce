const admin = require("../services/firebase");
const User = require("../models/User");

module.exports = async (req, res, next) => {
  try {
    // Handle missing token
    if (
      !(
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
      )
    ) {
      return res.status(401).json({
        errors: [{ msg: "Invalid Credentials" }],
      });
    }

    // Extract token from headers
    const token = req.headers.authorization.split(" ")[1];

    // Get firebase user from token
    const firebaseUser = await admin.auth().verifyIdToken(token);

    console.log("[ℹ️ FIREBASE USER]", firebaseUser);

    // Find user in DB, create if not exists
    const { email } = firebaseUser;
    const user = await User.findOneAndUpdate(
      { email },
      {},
      { new: true, runValidators: true, upsert: true }
    );

    console.log("[ℹ️ DATABASE USER]", user);

    // Attach user to req
    req.user = user;

    // Continue to next middleware
    next();
  } catch (error) {
    console.error("[❌ AUTH MIDDLEWARE ERROR]", error);
    return res.status(401).json({
      errors: [{ msg: "Invalid Credentials" }],
    });
  }
};

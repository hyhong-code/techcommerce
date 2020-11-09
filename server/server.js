require("dotenv").config({ path: `${__dirname}/config/config.env` });
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const connectDB = require("./config/db");

// Routers
const userRouter = require("./routes/user");
const categoryRouter = require("./routes/categories");
const subRouter = require("./routes/subs");
const productRouter = require("./routes/product");
const cartRouter = require("./routes/cart");
const couponRouter = require("./routes/coupon");

const app = express();
connectDB();

// Middlewares
app.use(morgan("dev"));
app.use(cors());
app.use(express.json({ limit: "10mb" }));

// Mount routers
app.use("/api/v1/users", userRouter);
app.use("/api/v1/categories", categoryRouter);
app.use("/api/v1/subs", subRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/carts", cartRouter);
app.use("/api/v1/coupons", couponRouter);

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server up on port ${port}...`));

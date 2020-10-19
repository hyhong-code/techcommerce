require("dotenv").config({ path: `${__dirname}/config/config.env` });
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const connectDB = require("./config/db");

// Routers
const userRouter = require("./routes/user");

const app = express();
connectDB();

// Middlewares
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

// Mount routers
app.use("/api/v1/users", userRouter);

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server up on port ${port}...`));

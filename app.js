require("dotenv").config();
require("express-async-errors");

const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");

const express = require("express");
const app = express();

const connectDB = require("./db/connect.js");

const authRouter = require("./routes/auth");
const postsRouter = require("./routes/posts");
const employeesRouter = require("./routes/employees");

const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

app.use(express.json());
app.use("/images", express.static("./images")); // serve static images
app.use(helmet());
app.use(cors());
app.use(xss());

// simple route to check if app is deployed
app.get("/", (req, res) => {
  res.send("App is working...");
});

// routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/posts", postsRouter);
app.use("/api/v1/employees", employeesRouter);

// if route doesn't exist
app.use(notFoundMiddleware);
// if error is thrown
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    // add connect to db here later
    await connectDB(process.env.MONGO_URI);

    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();

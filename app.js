require("dotenv").config();

const express = require("express");
const app = express();

const connectDB = require("./db/connect.js");

const authRouter = require("./routes/auth");
const postsRouter = require("./routes/posts");
const teachersRouter = require("./routes/teachers");

// simple route to check if app is deployed
app.get("/", (req, res) => {
  res.send("App is working...");
});

// routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/posts", postsRouter);
app.use("/api/v1/teachers", teachersRouter);

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

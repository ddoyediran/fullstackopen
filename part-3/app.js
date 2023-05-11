const express = require("express");
const cors = require("cors");
const config = require("./utils/config");
const logger = require("./utils/logger");
const middleware = require("./utils/middleware");
require("dotenv").config();
const mongoose = require("mongoose");
require("express-async-errors");
const notesRouter = require("./controllers/notes");
const usersRouter = require("./controllers/user");

const app = express();

mongoose.set("strictQuery", false);

mongoose
  .connect(config.MONGODB_URI)
  .then((result) => {
    logger.info("connected to MongoDB");
  })
  .catch((error) => {
    logger.error("error connecting to MongoDB:", error.message);
  });

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(middleware.requestLogger);
app.use(express.static("build"));

app.use("/api/notes", notesRouter);
app.use("/api/users", usersRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;

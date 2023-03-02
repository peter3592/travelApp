// List of APIs:
//   * https://www.geocod.io/
//   * https://flagcdn.com/ (this is cdn, not API)
//   * https://openweathermap.org/api
//   * https://leafletjs.com/

const express = require("express");
const path = require("path");
////////

const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

const app = require("./app");

const port = process.env.PORT || 3000;

// Connect to database
const DB = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);

// DeprecationWarning
mongoose.set("strictQuery", false);

mongoose
  .connect(DB, {
    // just some options to deal with deprecation warnings.
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  })
  .then((conn) => {
    console.log("Database connection successful.");
  })
  .catch((err) => {
    console.log("Could not connect to Mongo database ->", err);
  });

mongoose.syncIndexes();

// Serving the frontend
if (process.env.NODE_ENV === "production") {
  delete process.env.REACT_APP_URL;

  app.use(express.static(path.join(__dirname, "./client/build")));

  app.get("*", function (_, res) {
    res.sendFile(
      path.join(__dirname, "./client/build/index.html"),
      function (err) {
        res.status(500).send(err);
      }
    );
  });
}

// Server Start
const server = app.listen(port, () => {
  console.log(`App running on port ${port} ...`);
});

// Global handling of unhandled rejections
process.on("unhandledRejection", (err) => {
  console.log("❗❗❗ Unhandled Error:", err.message, `(${err.name})`);
  console.log("Shutting down server ...");
  // Proper way of closing server (after finishing all pending requests)
  server.close(() => {
    // Shutdown server
    process.exit(1);
  });
});

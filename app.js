const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const csp = require("express-csp");
const rateLimit = require("express-rate-limit");
const cookieParser = require("cookie-parser");
const compression = require("compression");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");

const userRouter = require("./routes/userRoutes");
const placeRouter = require("./routes/placeRoutes");
const commentRouter = require("./routes/commentRoutes");
const wallPostRouter = require("./routes/wallPostRoutes");

const globalErrorHandler = require("./controllers/errorController");

const app = express();

if (process.env.NODE_ENV === "development") {
  console.log("Started in DEVELOPMENT mode");
  // Logging incoming request info to the console
  app.use(morgan("dev"));
}

if (process.env.NODE_ENV === "production")
  console.log("Started in PRODUCTION mode");

// Parsing cookies
app.use(cookieParser());

// Implementing CORS
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);
app.options("*", cors());

const exceptionUrls = [
  "https://unpkg.com/",
  "https://*.google.com",
  "https://flagcdn.com/",
  "https://api.openweathermap.org/",
  "http://openweathermap.org/",
  "https://res.cloudinary.com/",
  "https://ozgrozer.github.io/",
];

// Set security HTTP headers
app.use(helmet());

csp.extend(app, {
  policy: {
    directives: {
      "default-src": ["self"],
      "style-src": ["self", "unsafe-inline", "https:"],
      "font-src": ["self", "https://fonts.gstatic.com"],
      "script-src": ["self", "unsafe-inline", "data", "blob", ...exceptionUrls],
      "worker-src": [
        "self",
        "unsafe-inline",
        "data:",
        "blob:",
        ...exceptionUrls,
      ],
      "frame-src": [
        "self",
        "unsafe-inline",
        "data:",
        "blob:",
        ...exceptionUrls,
      ],
      "img-src": ["self", "unsafe-inline", "data:", "blob:", ...exceptionUrls],
      "connect-src": [
        "self",
        "unsafe-inline",
        "data:",
        "blob:",
        ...exceptionUrls,
      ],
    },
  },
});

// Limit request from same IP
const limiter = rateLimit({
  max: 600, // maximum number of request
  windowMs: 1 * 60 * 1000, // ... in 1 minutes
  message: "Too many requests from this IP, please try again later!",
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

app.use("/api", limiter); // affect only API

// Body parsers, reading data from body into req.body
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" })); // extended: true allows send more complex data, not neccessary in our case
app.use(express.text());

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Compress all the text responses to the client (do nothing with images etc ...)
app.use(compression());

// ROUTES
app.use("/api/v1/users", userRouter);

app.use("/api/v1/places", placeRouter);

app.use("/api/v1/comments", commentRouter);

app.use("/api/v1/wallposts", wallPostRouter);

// Error Handling Middleware
app.use(globalErrorHandler);

module.exports = app;

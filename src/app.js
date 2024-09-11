import express from "express";
import morgan from "morgan";
import cors from "cors";
import passport from "passport";
import dotenv from "dotenv";
import session from "express-session";
import routes from "./routes/index.js";
import errorHandler from "./middlewares/errorHandler.js";
import { initializePassport } from "./config/passport.js";
const app = express();

dotenv.config();
initializePassport(passport);

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(cors()); // Handle CORS
app.use(morgan("dev")); // Log HTTP requests

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/v1", routes); // All API routes under /api

app.get("/", (req, res) => {
  res.send(`<h1>Home</h1><a href="/v1/auth/google">Login with Google</a>`);
});

app.use(errorHandler);

export default app;

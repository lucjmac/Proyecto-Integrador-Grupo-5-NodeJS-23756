import express from "express";
import path from "path";
import dotenv from "dotenv";
import session from "express-session";
import cookieParser from "cookie-parser";
import flash from "express-flash";
import mainRoutes from "./src/routes/mainRoutes.js";
import shopRoutes from "./src/routes/shopRoutes.js";
import adminRoutes from "./src/routes/adminRoutes.js";
import authRoutes from "./src/routes/authRoutes.js";

dotenv.config();
const app = express();
const root = path.resolve();
const PORT = process.env.PORT || 8080;

//template engine
app.set("view engine", "ejs").set("views", path.join(root, "src", "views"));

//Parsers
app.use(express.json()).use(express.urlencoded({ extended: true }));

//Static files
app.use(express.static("public"));

// Session middleware
app.use(cookieParser());
app.use(
  session({
    secret: "a-super-strong-key",
    resave: true,
    saveUninitialized: true,
  })
);

// Flash messages middleware
app.use(flash());

//Routes
app
  .use("/", mainRoutes)
  .use("/shop", shopRoutes)
  .use("/admin", adminRoutes)
  .use("/auth", authRoutes);

//Start server
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});

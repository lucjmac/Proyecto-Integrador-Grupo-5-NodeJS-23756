import express from "express";
import path from "path";
import dotenv from "dotenv";
import mainRoutes from "./src/routes/mainRoutes.js";
import shopRoutes from "./src/routes/shopRoutes.js";
import adminRoutes from "./src/routes/adminRoutes.js";
import authRoutes from "./src/routes/authRoutes.js";

dotenv.config();
const app = express();
const root = path.resolve();
const PORT = process.env.PORT;

//template engine
app.set("view engine", "ejs").set("views", path.join(root, "src", "views"));

//Parsers
app.use(express.json()).use(express.urlencoded({ extended: true }));

//Static files
app.use(express.static("public"));

//Routes
app.use("/", mainRoutes)
    .use("/shop", shopRoutes)
    .use("/admin", adminRoutes)
    .use("/auth", authRoutes);

//Start server
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});

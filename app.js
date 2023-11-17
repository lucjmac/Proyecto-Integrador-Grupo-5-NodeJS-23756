import express from "express";
import path, { resolve } from "path";
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
app.set ('view engine', 'pug');
app.set('views', path.join(resolve(), 'src', 'views'));

//Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Static files
app.use(express.static("public"));

//Routes
app.use("/", mainRoutes);
app.use("/", shopRoutes);
app.use("/", adminRoutes);
app.use("/", authRoutes);

//Start server
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});

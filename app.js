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

app.use(express.static("public"));

app.use("/", mainRoutes);
app.use("/", shopRoutes);
app.use("/", adminRoutes);
app.use("/", authRoutes);

// app.get("/home", (req, res) => {
//     res.sendFile(path.join(root, "public", "index.html"));
// });

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});

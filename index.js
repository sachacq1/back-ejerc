import express, { json } from "express";
import dotenv from "dotenv";
import { connectDB } from "./src/config/config.js";
import { productRouter } from "./src/routes/productRoutes.js";
import { authRoutes } from "./src/routes/authRoutes.js";
import { auth } from "./src/middleware/authMiddleware.js";

dotenv.config();

const PORT = process.env.PORT;

const app = express();
app.use(express.json());

app.use("/api/products", auth, productRouter);
app.use("/api/auth", authRoutes);

app.use("*", (req, res) => {
  return res.status(400).json({ error: "Not found" });
});
app.listen(PORT, () => {
  connectDB();
  console.log("conexion puerto exitosa en http://locashost:" + PORT);
});

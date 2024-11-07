import AuthModel from "../models/authModel.js";
import jwt from "jsonwebtoken";

process.loadEnvFile();
const JWT_SECRET = process.env.JWT_SECRET;

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password)
      return res.status(400).json({ eror: "Faltan datos" });

    const newUser = await AuthModel.register({ username, password, email });
    if (!newUser) return res.status(500).json({ error: "error data" });
    res.status(201).json({ newUser });
  } catch (error) {
    res.status(500).json({ error: "error" });
    console.log(error);
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required" });
    }

    const user = await AuthModel.login({ username, password });

    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const token = jwt.sign(
      { id: user._id, username: user.username },
      JWT_SECRET,
      { expiresIn: "1h" }
    ); // Expira en 1 hora

    return res.status(200).json({
      message: "Login successful",
      user: { id: user._id, username: user.username },
      token,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

export { register, login };

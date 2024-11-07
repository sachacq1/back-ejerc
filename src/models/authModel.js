import { Schema, model } from "mongoose";
import mongoose from "mongoose";
import { randomUUID } from "node:crypto";
import bcryptjs from "bcryptjs";

const userSchema = new mongoose.Schema({
  username: { type: String },
  password: { type: String },
  email: { type: String },
});

const User = mongoose.model("users", userSchema);

const register = async (dataUser) => {
  const { username, password, email } = dataUser;

  const existingUser = User.findOne({ username });
  if (!existingUser) return null;

  const alg = await bcryptjs.genSalt(10);
  const hashedPass = await bcryptjs.hash(password, alg);

  const user = new User({ username, password: hashedPass, email });
  const savedUser = user.save();
  return savedUser;
};

const login = async (dataUser) => {
  const { username, password } = dataUser;
  const existingUser = await User.findOne({ username });
  if (!existingUser) return null;

  const isMatch = await bcryptjs.compare(password, existingUser.password);
  if (!isMatch) return null;
  return isMatch;
};

export default { register, login };

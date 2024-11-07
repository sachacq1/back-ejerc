import { mongoose } from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String },
  price: { type: Number },
  description: { type: String },
  stock: { type: Number },
});

const Product = mongoose.model("products", productSchema);

const getAllProducts = () => {
  return Product.find();
};

const getProductById = (id) => {
  //   const product = products.find((p) => p.id === id);
  return Product.findById(id);
};

const createProduct = (newProduct) => {
  const product = new Product(newProduct);
  const savedProduct = product.save();
  return savedProduct;
};

const updateProduct = (id, updateProduct) => {
  return Product.findByIdAndUpdate(id, updateProduct);
};

const deleteProduct = (id) => {
  const response = Product.findOneAndDelete(id);
  return response;
};

export default {
  getAllProducts,
  getProductById,
  updateProduct,
  createProduct,
  deleteProduct,
};

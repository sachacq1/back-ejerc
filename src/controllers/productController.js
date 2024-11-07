import productModel from "../models/productModel.js";
import ProductModel from "../models/productModel.js";

const getAllProducts = async (req, res) => {
  try {
    const product = await ProductModel.getAllProducts();
    if (!product) return res.status(404).json({ error: "No hay productos" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "internal error server" });
    console.log(error);
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await ProductModel.getProductById(id);
    if (!product) {
      return res.status(400).json({ error: "Usuario no existente" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "Internal error server" });
    console.log(error);
  }
};

const createProduct = async (req, res) => {
  try {
    const { name, price, description, stock } = req.body;
    if (!name || !price || !description || !stock) {
      return res.status(404).json({ error: "datos invalidos" });
    }
    const newProduct = await ProductModel.createProduct({
      name,
      price,
      description,
      stock,
    });
    res.json(newProduct);
  } catch (error) {
    res.status(500).json({ error: "internal error server" });
    console.log(error);
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const product = await ProductModel.updateProduct(id, body);
    if (!product)
      return res.status(404).json({ message: "Producto no encontrado" });

    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "internal server error" });
    console.log(error);
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await ProductModel.deleteProduct(id);
    if (!product)
      return res.status(404).json({ error: "Producto no encontrado" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "Interal server erro" });
    console.log(error);
  }
};
export {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};

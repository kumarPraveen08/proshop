import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";

// @desc    Get all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  //   const total = products.length;
  res.status(200).json(products);
});

// @desc    Get single products
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) return res.status(200).json(product);

  res.status(404);
  throw new Error(`Bad Request: Resource not found`);
});

export { getProducts, getProductById };

import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";

const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  //   const total = products.length;
  res.status(200).json(products);
});

const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) return res.status(200).json(product);

  res.status(404);
  throw new Error(`Bad Request: Resource not found`);
});

export { getProducts, getProductById };

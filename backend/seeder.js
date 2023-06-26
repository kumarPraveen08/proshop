import colors from "colors";
import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import connectDB from "./config/db.js";
connectDB();

import Product from "./models/productModel.js";
import Order from "./models/orderModel.js";
import User from "./models/userModel.js";

import products from "./data/products.js";
import users from "./data/users.js";

const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id;
    const sampleProducts = products.map((item) => {
      return { ...item, user: adminUser };
    });
    await Product.insertMany(sampleProducts);
    console.log(`Data Imported!`.yellow.inverse);
    process.exit();
  } catch (err) {
    console.log(`Err: ${err.message}`.red.underline.bold);
    process.exit(1);
  }
};

const destoryData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
    console.log(`Data Destroyed!`.red.inverse);
    process.exit();
  } catch (err) {
    console.log(`Err: ${err.message}`.red.underline.bold);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  // destory data
  destoryData();
} else if (process.argv[2] === "-i") {
  // import data
  importData();
}

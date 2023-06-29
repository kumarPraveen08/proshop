import asyncHandler from "../middleware/asyncHandler.js";
import generateToken from "../utils/generateToken.js";
import User from "../models/userModel.js";

// @desc    Auth user and get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);
    try {
      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      });
    } catch (err) {
      res.status(401);
      throw new Error(`Bad Request, Email or Password wrong`);
    }
  } else {
    res.status(401);
    throw new Error(`Bad Request, Email or Password wrong`);
  }
  res.status(200).json({ user });
});

// @desc    Register new user & add token
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExist = await User.findOne({ email });

  if (userExist) {
    res.status(401);
    throw new Error(`User already exits`);
  }

  const newUser = await User.create({ name, email, password });
  if (newUser) {
    generateToken(res, newUser._id);
    // let token = req.cookies.token;
    res.status(200).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
    });
  } else {
    res.status(400);
    throw new Error(`Bad Request, Invalid user data`);
  }
});

// @desc    Logout user and remove cookie token
// @route   POST /api/users
// @access  Public
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: `User logout successfully` });
});

// @desc    Get user details
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(400);
    throw new Error(`Bad Request, User not found`);
  }
});

// @desc    Update user details
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  let user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }
    const updatedUser = await user.save();
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(400);
    throw new Error(`Bad Request, User not found`);
  }
});

// @desc    Get all users
// @route   GET /api/users
// @access  Private / Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res
    .status(200)
    .json({ success: true, total_results: users.length, data: users });
});

// @desc    Get single user
// @route   GET /api/users/:id
// @access  Private / Admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    res.status(200).json({ success: true, data: user });
  }

  res.status(404);
  throw new Error(`Bad Request, user not found`);
});

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private / Admin
const deleteUserById = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (user) {
    res
      .status(200)
      .json({ success: true, message: `User deleted successfully` });
  }

  res.status(404);
  throw new Error(`Bad Request, user not found`);
});

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private / Admin
const updateUserById = asyncHandler(async (req, res) => {
  res.json({ message: `update user by id route` });
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  getUserById,
  updateUserById,
  deleteUserById,
};

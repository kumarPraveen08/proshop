import bcrypt from "bcryptjs";

const users = [
  {
    name: "Admin User",
    email: "admin@gmail.com",
    password: await bcrypt.hash("123456", 10),
    isAdmin: true,
  },
  {
    name: "John Smith",
    email: "john@gmail.com",
    password: await bcrypt.hash("123456", 10),
    isAdmin: false,
  },
  {
    name: "Mary Smith",
    email: "mary@gmail.com",
    password: await bcrypt.hash("123456", 10),
    isAdmin: false,
  },
];

export default users;

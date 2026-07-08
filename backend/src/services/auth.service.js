const bcrypt = require("bcrypt");
const prisma = require("../config/prisma");

const registerUser = async (userData) => {

  const existingUser = await prisma.user.findUnique({
    where: {
      email: userData.email,
    },
  });

  if (existingUser) {
    throw new Error("Email already registered");
  }

  const hashedPassword = await bcrypt.hash(userData.password, 10);

  const user = await prisma.user.create({
    data: {
      name: userData.name,
      email: userData.email,
      password: hashedPassword,
      phone: userData.phone,
      address: userData.address,
      role: userData.role || "DONOR",
    },
  });

  const { password, ...userWithoutPassword } = user;

  return userWithoutPassword;
};

const loginUser = async (email, password) => {

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isPasswordCorrect = await bcrypt.compare(
    password,
    user.password
  );

  if (!isPasswordCorrect) {
    throw new Error("Invalid email or password");
  }

  const { password: _, ...userWithoutPassword } = user;

  return userWithoutPassword;
};

module.exports = {
  registerUser,
  loginUser,
};
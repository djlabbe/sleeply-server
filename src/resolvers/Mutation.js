const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const { authenticate } = require('../services/auth');

async function signup(parent, args, { prisma }, info) {
  const password = await bcrypt.hash(args.password, 10);
  const user = await prisma.createUser({ ...args, password });
  const token = jwt.sign({ userId: user.id }, keys.jwtSecret);

  return {
    token,
    user
  };
}

async function login(parent, { email, password }, { prisma }, info) {
  const user = await prisma.user({ email });
  if (!user) {
    throw new Error("Oops, that's not a match");
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    throw new Error("Oops, that's not a match");
  }

  const token = jwt.sign({ userId: user.id }, keys.jwtSecret);

  return {
    token,
    user
  };
}

function addEntry(root, args, { prisma, request }, info) {
  const userId = authenticate(request);
  return prisma.createLogEntry({
    note: args.note,
    createdBy: { connect: { id: userId } }
  });
}

module.exports = {
  signup,
  login,
  addEntry
};

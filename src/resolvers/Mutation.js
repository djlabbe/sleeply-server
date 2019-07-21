const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const { authenticate } = require('../services/auth');

// Register a new user
async function signup(root, args, { prisma }, info) {
  const password = await bcrypt.hash(args.password, 10);
  const user = await prisma.createUser({ ...args, password });
  const token = jwt.sign({ userId: user.id }, keys.jwtSecret);

  return {
    token,
    user
  };
}

// Authenticate a user
async function login(root, { email, password }, { prisma }, info) {
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

// Record a new log entry
async function addEntry(root, { note, childId }, { prisma, request }, info) {
  const userId = authenticate(request);

  // Only the child's parent(s) are authorized to create a LogEntry
  const parent = await prisma.child({ id: childId }).parent();
  if (userId !== parent.id) {
    throw new Error('Not authorized');
  }

  return prisma.createLogEntry({
    note: note,
    child: { connect: { id: childId } },
    createdBy: { connect: { id: userId } }
  });
}

function addChild(root, { name }, { prisma, request }, info) {
  const userId = authenticate(request);
  return prisma.createChild({
    name,
    parent: { connect: { id: userId } }
  });
}

module.exports = {
  signup,
  login,
  addEntry,
  addChild
};

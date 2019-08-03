const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const { requireAuth } = require('../services/authentication');

async function signup(root, args, { prisma }, info) {
  const password = await bcrypt.hash(args.password, 10);
  const user = await prisma.createUser({ ...args, password });
  const token = jwt.sign({ userId: user.id }, keys.jwtSecret);

  return {
    token,
    user
  };
}

async function login(root, { email, password }, { prisma }, info) {
  const user = await prisma.user({ email });
  if (!user) {
    throw new Error("Oops, that's not a match");
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    throw new Error("Oops, that's not a match");
  }

  const token = jwt.sign({ userId: user.id, role: user.role }, keys.jwtSecret);

  return {
    token,
    user
  };
}

async function addMorningEntry(
  root,
  { note, date, childId, wakeUpTime, outOfBedTime },
  { prisma, user },
  info
) {
  requireAuth(user);

  // Only the child's parent(s) are authorized to create entries
  const parent = await prisma.child({ id: childId }).parent();
  if (user.id !== parent.id) {
    throw new Error('Not authorized');
  }

  return prisma.createLogEntry({
    child: { connect: { id: childId } },
    date,
    type: 'MORNING',
    note,
    wakeUpTime,
    outOfBedTime,
    createdBy: { connect: { id: user.id } }
  });
}

async function addNapEntry(
  root,
  { note, date, childId, startTime, asleepTime, wakeUpTime },
  { prisma, user },
  info
) {
  requireAuth(user);

  // Only the child's parent(s) are authorized to create entries
  const parent = await prisma.child({ id: childId }).parent();
  if (user.id !== parent.id) {
    throw new Error('Not authorized');
  }

  return prisma.createLogEntry({
    child: { connect: { id: childId } },
    date,
    type: 'NAP',
    note,
    startTime,
    asleepTime,
    wakeUpTime,
    createdBy: { connect: { id: user.id } }
  });
}

async function addBedTimeEntry(
  root,
  { note, date, childId, startTime, inBedTime, asleepTime },
  { prisma, user },
  info
) {
  requireAuth(user);

  // Only the child's parent(s) are authorized to create entries
  const parent = await prisma.child({ id: childId }).parent();
  if (user.id !== parent.id) {
    throw new Error('Not authorized');
  }

  return prisma.createLogEntry({
    child: { connect: { id: childId } },
    date,
    type: 'BEDTIME',
    note,
    startTime,
    inBedTime,
    asleepTime,
    createdBy: { connect: { id: user.id } }
  });
}

async function addNightEntry(
  root,
  { note, date, childId, wakeUpTime, asleepTime },
  { prisma, user },
  info
) {
  requireAuth(user);

  // Only the child's parent(s) are authorized to create entries
  const parent = await prisma.child({ id: childId }).parent();
  if (user.id !== parent.id) {
    throw new Error('Not authorized');
  }

  return prisma.createLogEntry({
    child: { connect: { id: childId } },
    date,
    type: 'NIGHT',
    note,
    wakeUpTime,
    asleepTime,
    createdBy: { connect: { id: user.id } }
  });
}

function addChild(root, { name }, { prisma, user }, info) {
  requireAuth(user);
  return prisma.createChild({
    name,
    parent: { connect: { id: user.id } }
  });
}

module.exports = {
  signup,
  login,
  addMorningEntry,
  addNapEntry,
  addBedTimeEntry,
  addNightEntry,
  addChild
};

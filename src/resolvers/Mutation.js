const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const { authenticate } = require('../services/auth');

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

  const token = jwt.sign({ userId: user.id }, keys.jwtSecret);

  return {
    token,
    user
  };
}

async function addMorningEntry(
  root,
  { note, childId, wakeUpTime, outOfBedTime },
  { prisma, request },
  info
) {
  const userId = authenticate(request);

  // Only the child's parent(s) are authorized to create entries
  const parent = await prisma.child({ id: childId }).parent();
  if (userId !== parent.id) {
    throw new Error('Not authorized');
  }

  return prisma.createMorningEntry({
    child: { connect: { id: childId } },
    note,
    wakeUpTime,
    outOfBedTime,
    createdBy: { connect: { id: userId } }
  });
}

async function addNapEntry(
  root,
  { note, childId, downTime, asleepTime, wakeUpTime },
  { prisma, request },
  info
) {
  const userId = authenticate(request);

  // Only the child's parent(s) are authorized to create entries
  const parent = await prisma.child({ id: childId }).parent();
  if (userId !== parent.id) {
    throw new Error('Not authorized');
  }

  return prisma.createNapEntry({
    child: { connect: { id: childId } },
    note,
    downTime,
    asleepTime,
    wakeUpTime,
    createdBy: { connect: { id: userId } }
  });
}

async function addBedTimeEntry(
  root,
  { note, childId, startTime, inBedTime, asleepTime },
  { prisma, request },
  info
) {
  const userId = authenticate(request);

  // Only the child's parent(s) are authorized to create entries
  const parent = await prisma.child({ id: childId }).parent();
  if (userId !== parent.id) {
    throw new Error('Not authorized');
  }

  return prisma.createBedTimeEntry({
    child: { connect: { id: childId } },
    note,
    startTime,
    inBedTime,
    asleepTime,
    createdBy: { connect: { id: userId } }
  });
}

async function addNightWakingEntry(
  root,
  { note, childId, wakeUpTime, asleepTime },
  { prisma, request },
  info
) {
  const userId = authenticate(request);

  // Only the child's parent(s) are authorized to create entries
  const parent = await prisma.child({ id: childId }).parent();
  if (userId !== parent.id) {
    throw new Error('Not authorized');
  }

  return prisma.createNightWakingEntry({
    child: { connect: { id: childId } },
    note,
    wakeUpTime,
    asleepTime,
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
  addMorningEntry,
  addNapEntry,
  addBedTimeEntry,
  addNightWakingEntry,
  addChild
};

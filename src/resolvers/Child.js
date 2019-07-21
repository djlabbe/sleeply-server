const { authenticate } = require('../services/authentication');

function parent({ id }, args, { prisma }, info) {
  return prisma.child({ id }).parent();
}

function morningEntries({ id }, args, { prisma, request }, info) {
  authenticate(request);
  return prisma.child({ id }).morningEntries();
}

function napEntries({ id }, args, { prisma, request }, info) {
  authenticate(request);
  return prisma.child({ id }).napEntries();
}

function bedTimeEntries({ id }, args, { prisma, request }, info) {
  authenticate(request);
  return prisma.child({ id }).bedTimeEntries();
}

function nightWakingEntries({ id }, args, { prisma, request }, info) {
  authenticate(request);
  return prisma.child({ id }).nightWakingEntries();
}

module.exports = {
  parent,
  morningEntries,
  napEntries,
  bedTimeEntries,
  nightWakingEntries
};

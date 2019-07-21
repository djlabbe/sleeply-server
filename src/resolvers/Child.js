const { authenticate } = require('../services/authentication');

function parent({ id }, args, { prisma }, info) {
  return prisma.child({ id }).parent();
}

function logEntries({ id }, args, { prisma, request }, info) {
  authenticate(request);
  return prisma.child({ id }).logEntries();
}

module.exports = {
  parent,
  logEntries
};

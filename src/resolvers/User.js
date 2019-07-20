const { authenticate } = require('../services/auth');

function logEntries({ id }, args, { prisma, request }, info) {
  authenticate(request);
  return prisma.user({ id }).logEntries();
}

function children({ id }, args, { prisma, request }, info) {
  authenticate(request);
  return prisma.user({ id }).children();
}

module.exports = {
  logEntries,
  children
};

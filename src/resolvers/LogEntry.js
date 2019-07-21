const { requireAuth } = require('../services/authentication');

function createdBy({ id }, args, { prisma, user }, info) {
  requireAuth(user);
  return prisma.logEntry({ id }).createdBy();
}

function child({ id }, args, { prisma, user }, info) {
  requireAuth(user);
  return prisma.logEntry({ id }).child();
}

module.exports = {
  createdBy,
  child
};

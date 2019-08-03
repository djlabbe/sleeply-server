const { requireAuth } = require('../services/authentication');

function children({ id }, args, { prisma, user }, info) {
  requireAuth(user);
  return prisma.user({ id }).children();
}

module.exports = {
  children
};

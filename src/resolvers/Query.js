const { requireAuth, requireAdmin } = require('../services/authentication');

function me(root, args, { prisma, user }, info) {
  requireAuth(user);
  return prisma.user({ id: user.id });
}

module.exports = {
  me
};

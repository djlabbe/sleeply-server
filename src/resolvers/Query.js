const { requireAuth, requireAdmin } = require('../services/authentication');

function me(root, args, { prisma, user }, info) {
  requireAuth(user);
  return prisma.user({ id: user.id });
}

function child(root, { id }, { prisma, user }, info) {
  requireAuth(user);
  return prisma.child({ id });
}
module.exports = {
  me,
  child
};

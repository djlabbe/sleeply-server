const { authenticate, admin } = require('../services/authentication');

// TODO: Fragment off the whole set of log entries?
function me(root, args, { prisma, request }, info) {
  const userId = authenticate(request);
  return prisma.user({ id: userId });
}

async function logsForChild(root, { childId }, { prisma, request }, info) {
  admin(request);
  return prisma.child({ id: childId }).logEntries();
}

module.exports = {
  me,
  logsForChild
};

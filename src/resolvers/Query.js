const { authenticate } = require('../services/auth');

function me(root, args, { prisma, request }, info) {
  const userId = authenticate(request);
  return prisma.user({ id: userId });
}

// Get all log entries for all users
// TODO: Require Admin
function globalFeed(root, args, { prisma }, info) {
  return prisma.logEntries();
}

module.exports = {
  // userFeed,
  globalFeed,
  me
};
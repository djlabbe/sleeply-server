const { authenticate } = require('../services/auth');

// Get all log entries made by current user
function userFeed(root, args, { prisma, request }, info) {
  const userId = authenticate(request);
  return prisma.user({ id: userId }).logEntries();
}

// Get all log entries for all users
// TODO: Require Admin
function globalFeed(root, args, { prisma, request }, info) {
  return prisma.logEntries();
}

module.exports = {
  userFeed,
  globalFeed
};

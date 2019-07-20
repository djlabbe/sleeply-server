const { authenticate } = require('../services/auth');

function logEntries(parent, args, { prisma, request }) {
  authenticate(request);
  return prisma.user({ id: parent.id }).logEntries();
}

module.exports = {
  logEntries
};

const { authenticate } = require('../services/auth');

function logEntries({ id }, args, { prisma, request }) {
  authenticate(request);
  return prisma.user({ id }).logEntries();
}

module.exports = {
  logEntries
};

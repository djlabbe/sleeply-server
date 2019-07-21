const { authenticate } = require('../services/auth');

function children({ id }, args, { prisma, request }, info) {
  authenticate(request);
  return prisma.user({ id }).children();
}

module.exports = {
  children
};

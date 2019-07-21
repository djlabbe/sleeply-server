const { authenticate } = require('../services/authentication');

function children({ id }, args, { prisma, request }, info) {
  authenticate(request);
  return prisma.user({ id }).children();
}

module.exports = {
  children
};

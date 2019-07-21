const { authenticate, admin } = require('../services/authentication');

function me(root, args, { prisma, request }, info) {
  const userId = authenticate(request);
  return prisma.user({ id: userId });
}

async function logsForChild(root, { childId }, { prisma, request }, info) {
  admin(request);
  return {
    morningEntries: prisma.child({ id: childId }).morningEntries(),
    napEntries: prisma.child({ id: childId }).napEntries(),
    bedTimeEntries: prisma.child({ id: childId }).bedTimeEntries(),
    nightWakingEntries: prisma.child({ id: childId }).nightWakingEntries()
  };
}

module.exports = {
  me,
  logsForChild
};

const { requireAuth } = require('../services/authentication');
const { paginateResults } = require('../services/pagination');

function parent({ id }, args, { prisma, user }, info) {
  requireAuth(user);
  return prisma.child({ id }).parent();
}

async function logs({ id }, { pageSize = 50, after }, { prisma, user }, info) {
  requireAuth(user);

  const allEntries = await prisma.child({ id }).logEntries();
  const logEntries = paginateResults({
    after,
    pageSize,
    results: allEntries,
    getCursor: entry => entry.createdAt
  });
  return {
    logEntries,
    cursor: logEntries.length
      ? logEntries[logEntries.length - 1].createdAt
      : null,
    hasMore: logEntries.length
      ? logEntries[logEntries.length - 1].createdAt !==
        allEntries[allEntries.length - 1].createdAt
      : false
  };
}

module.exports = {
  parent,
  logs
};

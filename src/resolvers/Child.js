const { requireAuth } = require('../services/authentication');
const { paginateResults } = require('../services/pagination');

function parent({ id }, args, { prisma, user }, info) {
  requireAuth(user);
  return prisma.child({ id }).parent();
}

async function logs({ id }, { pageSize = 20, after }, { prisma, user }, info) {
  requireAuth(user);

  const allEntries = await prisma.child({ id }).logEntries();
  const logEntries = paginateResults({
    after,
    pageSize,
    results: allEntries
  });
  return {
    logEntries,
    cursor: logEntries.length ? logEntries[logEntries.length - 1].cursor : null,
    hasMore: logEntries.length
      ? logEntries[logEntries.length - 1].cursor !==
        allEntries[allEntries.length - 1].cursor
      : false
  };
}

module.exports = {
  parent,
  logs
};

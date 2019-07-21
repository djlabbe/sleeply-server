const { authenticate, admin } = require('../services/authentication');
const { paginateResults } = require('../services/pagination');

// TODO: This fragment doesnt work??
function me(root, args, { prisma, request }, info) {
  const userId = authenticate(request);
  return prisma
    .user({ id: userId })
    .$fragment(`{id role name email children { id } }`);
}

async function childLogs(
  root,
  { childId, pageSize = 20, after },
  { prisma, request },
  info
) {
  // admin(request);  TODO
  const allEntries = await prisma.child({ id: childId }).logEntries();
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
  me,
  childLogs
};

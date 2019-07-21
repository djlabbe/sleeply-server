function createdBy({ id }, args, { prisma }) {
  return prisma.logEntry({ id }).createdBy();
}

function createdAt({ id }, args, { prisma }) {
  return prisma.logEntry({ id }).createdAt();
}

module.exports = {
  createdBy,
  createdAt
};

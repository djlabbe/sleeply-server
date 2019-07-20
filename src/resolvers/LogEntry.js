function createdBy({ id }, args, { prisma }) {
  return prisma.logEntry({ id }).createdBy();
}

module.exports = {
  createdBy
};

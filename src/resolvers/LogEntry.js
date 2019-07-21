function createdBy({ id }, args, { prisma }, info) {
  return prisma.logEntry({ id }).createdBy();
}

function child({ id }, args, { prisma }, info) {
  return prisma.logEntry({ id }).child();
}

module.exports = {
  createdBy,
  child
};
